import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import {
    Penilaian, NilaiPenilaian, KriteriaPenilaian, Mahasiswa, User,
    AssessorType, PenilaianComponent, NilaiAkhir, UserRole, MahasiswaStatus,
} from '../../entities';
import { NotificationGateway } from '../notification/notification.gateway';

// Roles yang boleh menilai sebagai staff
const STAFF_ASSESSOR_ROLES: UserRole[] = [
    UserRole.ADMIN,
    UserRole.SEKRETARIATAN,
    UserRole.KOORDINATOR_RISET,
    UserRole.KOORDINATOR_INOVASI,
    UserRole.KEPALA_BRIDA,
];

// Sub-bobot per assessor bucket untuk penilaian perilaku 360°
// 4 bucket: Koordinator 30%, Self 15%, Peer 20%, Admin 35%
const PERILAKU_WEIGHT = {
    koordinator: 0.30,  // Kepala BRIDA + Koordinator Riset + Koordinator Inovasi + Sekretaris
    self: 0.15,
    peer: 0.20,
    admin: 0.35,
};

// Konversi skor Likert (1-5) ke skala 100
function likertToScale100(likertScore: number): number {
    return likertScore * 20;
}

function getGrade(score: number): string {
    if (score >= 86) return 'A';
    if (score >= 71) return 'B';
    if (score >= 51) return 'C';
    return 'D';
}

function mapRoleToAssessorType(role: UserRole): AssessorType {
    if (role === UserRole.ADMIN) return AssessorType.ADMIN;
    if (role === UserRole.SEKRETARIATAN) return AssessorType.SEKRETARIS;
    if (role === UserRole.KOORDINATOR_RISET || role === UserRole.KOORDINATOR_INOVASI) return AssessorType.KOORDINATOR;
    if (role === UserRole.KEPALA_BRIDA) return AssessorType.KEPALA_BRIDA;
    throw new ForbiddenException('Role tidak memiliki akses menilai');
}

@Injectable()
export class PenilaianService {
    constructor(
        private readonly em: EntityManager,
        private readonly notificationGateway: NotificationGateway,
    ) { }

    // ────────────────────────────────────────────────
    // Self Assessment (Mahasiswa menilai diri sendiri)
    // ────────────────────────────────────────────────
    async submitSelfAssessment(userId: string, data: { scores: { kriteriaId: string; score: number; keterangan?: string }[]; feedback?: string }) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(Mahasiswa, { user: { id: userId } });
        if (!mahasiswa) throw new NotFoundException('Data mahasiswa tidak ditemukan');
        const user = await fork.findOneOrFail(User, { id: userId });

        // Cek sudah pernah menilai diri sendiri
        const existing = await fork.findOne(Penilaian, {
            mahasiswa: { id: mahasiswa.id },
            assessedBy: { id: userId },
            assessorType: AssessorType.SELF,
            component: PenilaianComponent.PERILAKU,
        });
        if (existing) throw new BadRequestException('Anda sudah pernah menilai diri sendiri');

        const result = await this.savePenilaian(fork, mahasiswa, user, AssessorType.SELF, PenilaianComponent.PERILAKU, data);

        // Emit real-time event
        this.notificationGateway.emitPenilaianSubmitted({
            mahasiswaId: mahasiswa.id,
            mahasiswaName: mahasiswa.fullName,
            assessorType: 'SELF',
            assessorName: mahasiswa.fullName,
            component: 'PERILAKU',
        });

        return result;
    }

    // ────────────────────────────────────────────────
    // Peer Assessment (Menilai teman sesama tusi)
    // ────────────────────────────────────────────────
    async submitPeerAssessment(userId: string, data: { mahasiswaId: string; scores: { kriteriaId: string; score: number; keterangan?: string }[]; feedback?: string }) {
        const fork = this.em.fork();
        const assessorMahasiswa = await fork.findOne(Mahasiswa, { user: { id: userId } }, { populate: ['tusiBrida'] });
        if (!assessorMahasiswa) throw new NotFoundException('Data mahasiswa penilai tidak ditemukan');

        const targetMahasiswa = await fork.findOne(Mahasiswa, { id: data.mahasiswaId }, { populate: ['tusiBrida'] });
        if (!targetMahasiswa) throw new NotFoundException('Mahasiswa yang akan dinilai tidak ditemukan');

        // Tidak boleh menilai diri sendiri
        if (assessorMahasiswa.id === targetMahasiswa.id) throw new BadRequestException('Tidak bisa menilai diri sendiri sebagai peer');

        // Harus sesama tusi
        if (!assessorMahasiswa.tusiBrida || !targetMahasiswa.tusiBrida || assessorMahasiswa.tusiBrida.id !== targetMahasiswa.tusiBrida.id) {
            throw new BadRequestException('Hanya bisa menilai teman dalam tusi yang sama');
        }

        const user = await fork.findOneOrFail(User, { id: userId });

        // Cek sudah pernah menilai peer ini
        const existing = await fork.findOne(Penilaian, {
            mahasiswa: { id: targetMahasiswa.id },
            assessedBy: { id: userId },
            assessorType: AssessorType.PEER,
            component: PenilaianComponent.PERILAKU,
        });
        if (existing) throw new BadRequestException('Anda sudah pernah menilai teman ini');

        const result = await this.savePenilaian(fork, targetMahasiswa, user, AssessorType.PEER, PenilaianComponent.PERILAKU, data, assessorMahasiswa);

        // Emit real-time event
        this.notificationGateway.emitPenilaianSubmitted({
            mahasiswaId: targetMahasiswa.id,
            mahasiswaName: targetMahasiswa.fullName,
            assessorType: 'PEER',
            assessorName: assessorMahasiswa.fullName,
            component: 'PERILAKU',
        });

        return result;
    }

    // ────────────────────────────────────────────────
    // Staff Assessment (Admin/Koordinator/Sekretaris)
    // ────────────────────────────────────────────────
    async submitStaffAssessment(userId: string, userRole: UserRole, data: {
        mahasiswaId: string;
        perilaku: { scores: { kriteriaId: string; score: number; keterangan?: string }[]; feedback?: string };
        kinerja: { scores: { kriteriaId: string; score: number; keterangan?: string }[]; feedback?: string };
    }) {
        if (!STAFF_ASSESSOR_ROLES.includes(userRole)) {
            throw new ForbiddenException('Role tidak memiliki akses menilai');
        }

        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(Mahasiswa, { id: data.mahasiswaId });
        const user = await fork.findOneOrFail(User, { id: userId });
        const assessorType = mapRoleToAssessorType(userRole);

        // Cek sudah pernah menilai mahasiswa ini
        const existingPerilaku = await fork.findOne(Penilaian, {
            mahasiswa: { id: mahasiswa.id },
            assessedBy: { id: userId },
            assessorType,
            component: PenilaianComponent.PERILAKU,
        });
        if (existingPerilaku) throw new BadRequestException('Anda sudah pernah menilai perilaku mahasiswa ini');

        const existingKinerja = await fork.findOne(Penilaian, {
            mahasiswa: { id: mahasiswa.id },
            assessedBy: { id: userId },
            assessorType,
            component: PenilaianComponent.KINERJA,
        });
        if (existingKinerja) throw new BadRequestException('Anda sudah pernah menilai kinerja mahasiswa ini');

        // Simpan kedua komponen
        const perilaku = await this.savePenilaian(fork, mahasiswa, user, assessorType, PenilaianComponent.PERILAKU, data.perilaku);
        const kinerja = await this.savePenilaian(fork, mahasiswa, user, assessorType, PenilaianComponent.KINERJA, data.kinerja);

        // Emit real-time event
        this.notificationGateway.emitPenilaianSubmitted({
            mahasiswaId: mahasiswa.id,
            mahasiswaName: mahasiswa.fullName,
            assessorType: assessorType,
            assessorName: user.name,
            component: 'PERILAKU + KINERJA',
        });

        return { perilaku, kinerja };
    }

    // ────────────────────────────────────────────────
    // Hitung Nilai Akhir
    // ────────────────────────────────────────────────
    async calculateFinalScore(mahasiswaId: string) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(Mahasiswa, { id: mahasiswaId });

        // ═══════════════════════════════════════════
        // 1. PERILAKU — Weighted 360° Assessment
        // ═══════════════════════════════════════════
        const perilakuList = await fork.find(Penilaian, {
            mahasiswa: { id: mahasiswaId },
            component: PenilaianComponent.PERILAKU,
        }, { populate: ['nilaiList'] });

        // Group by assessorType → rata-rata skor (sudah dalam skala 100)
        const perilakuScoresByType: Partial<Record<AssessorType, number[]>> = {};
        for (const p of perilakuList) {
            const scores = p.nilaiList.getItems().map(n => likertToScale100(Number(n.score)));
            if (scores.length > 0) {
                const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
                if (!perilakuScoresByType[p.assessorType]) perilakuScoresByType[p.assessorType] = [];
                perilakuScoresByType[p.assessorType]!.push(avg);
            }
        }

        // Rata-rata per type
        const getTypeAvg = (type: AssessorType): number | null => {
            const vals = perilakuScoresByType[type];
            if (!vals || vals.length === 0) return null;
            return vals.reduce((sum, v) => sum + v, 0) / vals.length;
        };

        // Gabungkan Kepala BRIDA + Koordinator + Sekretaris → 1 bucket "koordinator"
        const koordinatorScores = [
            ...(perilakuScoresByType[AssessorType.KOORDINATOR] || []),
            ...(perilakuScoresByType[AssessorType.SEKRETARIS] || []),
            ...(perilakuScoresByType[AssessorType.KEPALA_BRIDA] || []),
        ];
        const koordinatorAvg = koordinatorScores.length > 0
            ? koordinatorScores.reduce((s, v) => s + v, 0) / koordinatorScores.length
            : null;

        // Hitung weighted average — hanya dari assessor yang sudah menilai
        // Sub-bobot: Koordinator 30%, Self 15%, Peer 20%, Admin 35%
        const assessorBuckets: { type: string; avg: number | null; weight: number }[] = [
            { type: 'self', avg: getTypeAvg(AssessorType.SELF), weight: PERILAKU_WEIGHT.self },
            { type: 'peer', avg: getTypeAvg(AssessorType.PEER), weight: PERILAKU_WEIGHT.peer },
            { type: 'koordinator', avg: koordinatorAvg, weight: PERILAKU_WEIGHT.koordinator },
            { type: 'admin', avg: getTypeAvg(AssessorType.ADMIN), weight: PERILAKU_WEIGHT.admin },
        ];

        // Cek apakah semua bucket perilaku sudah terisi
        const missingBuckets = assessorBuckets.filter(b => b.avg === null);
        if (missingBuckets.length > 0) {
            const bucketLabels: Record<string, string> = {
                self: 'Diri Sendiri',
                peer: 'Teman Magang',
                koordinator: 'Koordinator',
                admin: 'Admin',
            };
            const missing = missingBuckets.map(b => bucketLabels[b.type] || b.type).join(', ');
            throw new BadRequestException(
                `Tidak dapat menghitung nilai akhir. Penilaian perilaku belum lengkap. ` +
                `Belum ada penilaian dari: ${missing}.`
            );
        }

        // Semua bucket sudah terisi, hitung weighted average
        const totalActiveWeight = assessorBuckets.reduce((sum, b) => sum + b.weight, 0);

        let rataPerilaku = 0;
        if (totalActiveWeight > 0) {
            rataPerilaku = assessorBuckets.reduce((sum, b) => {
                const normalizedWeight = b.weight / totalActiveWeight;
                return sum + (b.avg! * normalizedWeight);
            }, 0);
        }
        const nilaiPerilakuFinal = rataPerilaku * 0.4;

        // ═══════════════════════════════════════════
        // 2. KINERJA — rata-rata semua (skala 1-100)
        // ═══════════════════════════════════════════
        const kinerjaList = await fork.find(Penilaian, {
            mahasiswa: { id: mahasiswaId },
            component: PenilaianComponent.KINERJA,
        }, { populate: ['nilaiList'] });

        let kinerjaScores: number[] = [];
        for (const k of kinerjaList) {
            const scores = k.nilaiList.getItems().map(n => Number(n.score));
            kinerjaScores.push(...scores);
        }
        const rataKinerja = kinerjaScores.length > 0 ? kinerjaScores.reduce((s, v) => s + v, 0) / kinerjaScores.length : 0;
        const nilaiKinerjaFinal = rataKinerja * 0.6;

        // ═══════════════════════════════════════════
        // 3. NILAI AKHIR = NP + NK
        // ═══════════════════════════════════════════
        const nilaiAkhirValue = nilaiPerilakuFinal + nilaiKinerjaFinal;
        const grade = getGrade(nilaiAkhirValue);

        // Simpan ke NilaiAkhir (upsert)
        let nilaiAkhir = await fork.findOne(NilaiAkhir, { mahasiswa: { id: mahasiswaId } });
        if (!nilaiAkhir) {
            nilaiAkhir = new NilaiAkhir();
            nilaiAkhir.mahasiswa = mahasiswa;
            fork.persist(nilaiAkhir);
        }
        nilaiAkhir.nilaiPerilaku = Number(rataPerilaku.toFixed(2));
        nilaiAkhir.nilaiPerilakuFinal = Number(nilaiPerilakuFinal.toFixed(2));
        nilaiAkhir.nilaiKinerja = Number(rataKinerja.toFixed(2));
        nilaiAkhir.nilaiKinerjaFinal = Number(nilaiKinerjaFinal.toFixed(2));
        nilaiAkhir.nilaiAkhir = Number(nilaiAkhirValue.toFixed(2));
        nilaiAkhir.grade = grade;

        await fork.flush();

        // Emit real-time event
        const predikatMap: Record<string, string> = { A: 'Sangat Baik', B: 'Baik', C: 'Cukup', D: 'Perlu Perbaikan' };
        this.notificationGateway.emitPenilaianComplete({
            mahasiswaId: mahasiswa.id,
            mahasiswaName: mahasiswa.fullName,
            nilaiAkhir: nilaiAkhir.nilaiAkhir,
            grade,
            predikat: predikatMap[grade] || grade,
        });

        return nilaiAkhir;
    }

    // ────────────────────────────────────────────────
    // Ringkasan Nilai
    // ────────────────────────────────────────────────
    async getScoreSummary(mahasiswaId: string) {
        const fork = this.em.fork();

        const penilaianList = await fork.find(Penilaian, {
            mahasiswa: { id: mahasiswaId },
        }, { populate: ['assessedBy', 'nilaiList', 'nilaiList.kriteria'], orderBy: { createdAt: 'ASC' } });

        const nilaiAkhir = await fork.findOne(NilaiAkhir, { mahasiswa: { id: mahasiswaId } });

        // Status penilaian per assessor type dan component
        const status: Record<string, boolean> = {};
        for (const p of penilaianList) {
            status[`${p.assessorType}_${p.component}`] = true;
        }

        return {
            penilaianList,
            nilaiAkhir,
            status,
        };
    }

    // ────────────────────────────────────────────────
    // Daftar teman sesama tusi
    // ────────────────────────────────────────────────
    async getPeersForAssessment(userId: string) {
        const fork = this.em.fork();
        const myMahasiswa = await fork.findOne(Mahasiswa, { user: { id: userId } }, { populate: ['tusiBrida'] });
        if (!myMahasiswa || !myMahasiswa.tusiBrida) return [];

        const peers = await fork.find(Mahasiswa, {
            tusiBrida: { id: myMahasiswa.tusiBrida.id },
            id: { $ne: myMahasiswa.id },
            status: MahasiswaStatus.ACTIVE,
        }, { populate: ['user'] });

        // Cek mana yang sudah dinilai
        const assessed = await fork.find(Penilaian, {
            assessedBy: { id: userId },
            assessorType: AssessorType.PEER,
        });
        const assessedIds = new Set(assessed.map(a => a.mahasiswa.id));

        return peers.map(p => ({
            id: p.id,
            fullName: p.fullName,
            university: p.university,
            major: p.major,
            alreadyAssessed: assessedIds.has(p.id),
        }));
    }

    // ────────────────────────────────────────────────
    // Nilai saya (untuk mahasiswa)
    // ────────────────────────────────────────────────
    async getMyResults(userId: string) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(Mahasiswa, { user: { id: userId } });
        if (!mahasiswa) throw new NotFoundException('Data mahasiswa tidak ditemukan');

        const nilaiAkhir = await fork.findOne(NilaiAkhir, { mahasiswa: { id: mahasiswa.id } });

        const penilaianList = await fork.find(Penilaian, {
            mahasiswa: { id: mahasiswa.id },
        }, { populate: ['nilaiList', 'nilaiList.kriteria'] });

        // Construct behavior & performance tables from latest assessments
        const behaviorData = this.buildCriteriaView(penilaianList, PenilaianComponent.PERILAKU);
        const performanceData = this.buildCriteriaView(penilaianList, PenilaianComponent.KINERJA);

        // Cek status self-assessment
        const selfAssessment = penilaianList.find(
            p => p.assessorType === AssessorType.SELF && p.component === PenilaianComponent.PERILAKU
        );

        return {
            nilaiAkhir,
            behaviorData,
            performanceData,
            hasSelfAssessment: !!selfAssessment,
            selfAssessmentScores: selfAssessment
                ? selfAssessment.nilaiList.getItems().map(n => ({
                    kriteriaId: n.kriteria.id,
                    kriteriaName: n.kriteria.name,
                    score: n.score,
                    keterangan: n.keterangan,
                }))
                : null,
        };
    }

    // ────────────────────────────────────────────────
    // Admin: semua penilaian
    // ────────────────────────────────────────────────
    async findAll() {
        const fork = this.em.fork();
        const mahasiswaList = await fork.find(Mahasiswa, { status: MahasiswaStatus.ACTIVE }, {
            populate: ['user', 'tusiBrida'],
            orderBy: { fullName: 'ASC' },
        });

        const result = [];
        for (const m of mahasiswaList) {
            const nilaiAkhir = await fork.findOne(NilaiAkhir, { mahasiswa: { id: m.id } });
            const penilaianCount = await fork.count(Penilaian, { mahasiswa: { id: m.id } });

            // Check which assessor types have submitted
            const penilaianList = await fork.find(Penilaian, { mahasiswa: { id: m.id } });
            const assessmentStatus: Record<string, boolean> = {};
            for (const p of penilaianList) {
                assessmentStatus[`${p.assessorType}_${p.component}`] = true;
            }

            result.push({
                mahasiswa: m,
                nilaiAkhir,
                penilaianCount,
                assessmentStatus,
            });
        }

        return result;
    }

    // ────────────────────────────────────────────────
    // Private helpers
    // ────────────────────────────────────────────────
    private async savePenilaian(
        fork: EntityManager,
        mahasiswa: Mahasiswa,
        assessedBy: User,
        assessorType: AssessorType,
        component: PenilaianComponent,
        data: { scores: { kriteriaId: string; score: number; keterangan?: string }[]; feedback?: string },
        peerMahasiswa?: Mahasiswa,
    ): Promise<Penilaian> {
        const penilaian = new Penilaian();
        penilaian.mahasiswa = mahasiswa;
        penilaian.assessedBy = assessedBy;
        penilaian.assessorType = assessorType;
        penilaian.component = component;
        penilaian.feedback = data.feedback;
        if (peerMahasiswa) penilaian.peerMahasiswa = peerMahasiswa;
        fork.persist(penilaian);

        let totalScore = 0;
        let count = 0;
        const isPerilaku = component === PenilaianComponent.PERILAKU;

        for (const s of data.scores) {
            const kriteria = await fork.findOneOrFail(KriteriaPenilaian, { id: s.kriteriaId });

            if (isPerilaku) {
                if (s.score < 1 || s.score > 5) {
                    throw new BadRequestException(`Skor perilaku harus antara 1-5 (Likert), diterima: ${s.score}`);
                }
            } else {
                if (s.score < 1 || s.score > 100) {
                    throw new BadRequestException(`Skor kinerja harus antara 1-100, diterima: ${s.score}`);
                }
            }

            const nilai = new NilaiPenilaian();
            nilai.penilaian = penilaian;
            nilai.kriteria = kriteria;
            nilai.score = s.score;
            nilai.keterangan = s.keterangan;
            fork.persist(nilai);

            totalScore += isPerilaku ? likertToScale100(s.score) : s.score;
            count++;
        }

        penilaian.finalScore = count > 0 ? Number((totalScore / count).toFixed(2)) : 0;
        await fork.flush();

        return penilaian;
    }

    private buildCriteriaView(penilaianList: Penilaian[], component: PenilaianComponent) {
        // Aggregate scores per kriteria from all assessors (excluding self/peer for kinerja)
        const criteriaMap = new Map<string, { name: string; scores: number[]; keterangan: string[] }>();

        const relevantList = penilaianList.filter(p => p.component === component);
        for (const p of relevantList) {
            for (const n of p.nilaiList.getItems()) {
                const key = n.kriteria.id;
                if (!criteriaMap.has(key)) {
                    criteriaMap.set(key, { name: n.kriteria.name, scores: [], keterangan: [] });
                }
                const entry = criteriaMap.get(key)!;
                entry.scores.push(Number(n.score));
                if (n.keterangan) entry.keterangan.push(n.keterangan);
            }
        }

        return Array.from(criteriaMap.entries()).map(([id, data]) => ({
            id,
            name: data.name,
            nilai: data.scores.length > 0
                ? (data.scores.reduce((s, v) => s + v, 0) / data.scores.length).toFixed(0)
                : '-',
            keterangan: data.keterangan.length > 0 ? data.keterangan[data.keterangan.length - 1] : '-',
        }));
    }
}

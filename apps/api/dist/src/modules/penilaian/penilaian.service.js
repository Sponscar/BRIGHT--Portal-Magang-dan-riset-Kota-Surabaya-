"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenilaianService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
const STAFF_ASSESSOR_ROLES = [
    entities_1.UserRole.ADMIN,
    entities_1.UserRole.SEKRETARIATAN,
    entities_1.UserRole.KOORDINATOR_RISET,
    entities_1.UserRole.KOORDINATOR_INOVASI,
];
function getGrade(score) {
    if (score >= 86)
        return 'A';
    if (score >= 71)
        return 'B';
    if (score >= 51)
        return 'C';
    return 'D';
}
function mapRoleToAssessorType(role) {
    if (role === entities_1.UserRole.ADMIN)
        return entities_1.AssessorType.ADMIN;
    if (role === entities_1.UserRole.SEKRETARIATAN)
        return entities_1.AssessorType.SEKRETARIS;
    if (role === entities_1.UserRole.KOORDINATOR_RISET || role === entities_1.UserRole.KOORDINATOR_INOVASI)
        return entities_1.AssessorType.KOORDINATOR;
    throw new common_1.ForbiddenException('Role tidak memiliki akses menilai');
}
let PenilaianService = class PenilaianService {
    em;
    constructor(em) {
        this.em = em;
    }
    async submitSelfAssessment(userId, data) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(entities_1.Mahasiswa, { user: { id: userId } });
        if (!mahasiswa)
            throw new common_1.NotFoundException('Data mahasiswa tidak ditemukan');
        const user = await fork.findOneOrFail(entities_1.User, { id: userId });
        const existing = await fork.findOne(entities_1.Penilaian, {
            mahasiswa: { id: mahasiswa.id },
            assessedBy: { id: userId },
            assessorType: entities_1.AssessorType.SELF,
            component: entities_1.PenilaianComponent.PERILAKU,
        });
        if (existing)
            throw new common_1.BadRequestException('Anda sudah pernah menilai diri sendiri');
        return this.savePenilaian(fork, mahasiswa, user, entities_1.AssessorType.SELF, entities_1.PenilaianComponent.PERILAKU, data);
    }
    async submitPeerAssessment(userId, data) {
        const fork = this.em.fork();
        const assessorMahasiswa = await fork.findOne(entities_1.Mahasiswa, { user: { id: userId } }, { populate: ['tusiBrida'] });
        if (!assessorMahasiswa)
            throw new common_1.NotFoundException('Data mahasiswa penilai tidak ditemukan');
        const targetMahasiswa = await fork.findOne(entities_1.Mahasiswa, { id: data.mahasiswaId }, { populate: ['tusiBrida'] });
        if (!targetMahasiswa)
            throw new common_1.NotFoundException('Mahasiswa yang akan dinilai tidak ditemukan');
        if (assessorMahasiswa.id === targetMahasiswa.id)
            throw new common_1.BadRequestException('Tidak bisa menilai diri sendiri sebagai peer');
        if (!assessorMahasiswa.tusiBrida || !targetMahasiswa.tusiBrida || assessorMahasiswa.tusiBrida.id !== targetMahasiswa.tusiBrida.id) {
            throw new common_1.BadRequestException('Hanya bisa menilai teman dalam tusi yang sama');
        }
        const user = await fork.findOneOrFail(entities_1.User, { id: userId });
        const existing = await fork.findOne(entities_1.Penilaian, {
            mahasiswa: { id: targetMahasiswa.id },
            assessedBy: { id: userId },
            assessorType: entities_1.AssessorType.PEER,
            component: entities_1.PenilaianComponent.PERILAKU,
        });
        if (existing)
            throw new common_1.BadRequestException('Anda sudah pernah menilai teman ini');
        return this.savePenilaian(fork, targetMahasiswa, user, entities_1.AssessorType.PEER, entities_1.PenilaianComponent.PERILAKU, data, assessorMahasiswa);
    }
    async submitStaffAssessment(userId, userRole, data) {
        if (!STAFF_ASSESSOR_ROLES.includes(userRole)) {
            throw new common_1.ForbiddenException('Role tidak memiliki akses menilai');
        }
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(entities_1.Mahasiswa, { id: data.mahasiswaId });
        const user = await fork.findOneOrFail(entities_1.User, { id: userId });
        const assessorType = mapRoleToAssessorType(userRole);
        const existingPerilaku = await fork.findOne(entities_1.Penilaian, {
            mahasiswa: { id: mahasiswa.id },
            assessedBy: { id: userId },
            assessorType,
            component: entities_1.PenilaianComponent.PERILAKU,
        });
        if (existingPerilaku)
            throw new common_1.BadRequestException('Anda sudah pernah menilai perilaku mahasiswa ini');
        const existingKinerja = await fork.findOne(entities_1.Penilaian, {
            mahasiswa: { id: mahasiswa.id },
            assessedBy: { id: userId },
            assessorType,
            component: entities_1.PenilaianComponent.KINERJA,
        });
        if (existingKinerja)
            throw new common_1.BadRequestException('Anda sudah pernah menilai kinerja mahasiswa ini');
        const perilaku = await this.savePenilaian(fork, mahasiswa, user, assessorType, entities_1.PenilaianComponent.PERILAKU, data.perilaku);
        const kinerja = await this.savePenilaian(fork, mahasiswa, user, assessorType, entities_1.PenilaianComponent.KINERJA, data.kinerja);
        return { perilaku, kinerja };
    }
    async calculateFinalScore(mahasiswaId) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(entities_1.Mahasiswa, { id: mahasiswaId });
        const perilakuList = await fork.find(entities_1.Penilaian, {
            mahasiswa: { id: mahasiswaId },
            component: entities_1.PenilaianComponent.PERILAKU,
        }, { populate: ['nilaiList'] });
        const perilakuScoresByType = {};
        for (const p of perilakuList) {
            const scores = p.nilaiList.getItems().map(n => Number(n.score));
            if (scores.length > 0) {
                const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
                if (!perilakuScoresByType[p.assessorType])
                    perilakuScoresByType[p.assessorType] = [];
                perilakuScoresByType[p.assessorType].push(avg);
            }
        }
        const getTypeAvg = (type) => {
            const vals = perilakuScoresByType[type];
            if (!vals || vals.length === 0)
                return 0;
            return vals.reduce((sum, v) => sum + v, 0) / vals.length;
        };
        const selfAvg = getTypeAvg(entities_1.AssessorType.SELF);
        const peerAvg = getTypeAvg(entities_1.AssessorType.PEER);
        const koordinatorAvg = getTypeAvg(entities_1.AssessorType.KOORDINATOR);
        const adminScores = [
            ...(perilakuScoresByType[entities_1.AssessorType.ADMIN] || []),
            ...(perilakuScoresByType[entities_1.AssessorType.SEKRETARIS] || []),
        ];
        const adminAvg = adminScores.length > 0 ? adminScores.reduce((s, v) => s + v, 0) / adminScores.length : 0;
        const rataPerilaku = (selfAvg + peerAvg + koordinatorAvg + adminAvg) / 4;
        const nilaiPerilakuFinal = rataPerilaku * 0.4;
        const kinerjaList = await fork.find(entities_1.Penilaian, {
            mahasiswa: { id: mahasiswaId },
            component: entities_1.PenilaianComponent.KINERJA,
        }, { populate: ['nilaiList'] });
        let kinerjaScores = [];
        for (const k of kinerjaList) {
            const scores = k.nilaiList.getItems().map(n => Number(n.score));
            kinerjaScores.push(...scores);
        }
        const rataKinerja = kinerjaScores.length > 0 ? kinerjaScores.reduce((s, v) => s + v, 0) / kinerjaScores.length : 0;
        const nilaiKinerjaFinal = rataKinerja * 0.6;
        const nilaiAkhirValue = nilaiPerilakuFinal + nilaiKinerjaFinal;
        const grade = getGrade(nilaiAkhirValue);
        let nilaiAkhir = await fork.findOne(entities_1.NilaiAkhir, { mahasiswa: { id: mahasiswaId } });
        if (!nilaiAkhir) {
            nilaiAkhir = new entities_1.NilaiAkhir();
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
        return nilaiAkhir;
    }
    async getScoreSummary(mahasiswaId) {
        const fork = this.em.fork();
        const penilaianList = await fork.find(entities_1.Penilaian, {
            mahasiswa: { id: mahasiswaId },
        }, { populate: ['assessedBy', 'nilaiList', 'nilaiList.kriteria'], orderBy: { createdAt: 'ASC' } });
        const nilaiAkhir = await fork.findOne(entities_1.NilaiAkhir, { mahasiswa: { id: mahasiswaId } });
        const status = {};
        for (const p of penilaianList) {
            status[`${p.assessorType}_${p.component}`] = true;
        }
        return {
            penilaianList,
            nilaiAkhir,
            status,
        };
    }
    async getPeersForAssessment(userId) {
        const fork = this.em.fork();
        const myMahasiswa = await fork.findOne(entities_1.Mahasiswa, { user: { id: userId } }, { populate: ['tusiBrida'] });
        if (!myMahasiswa || !myMahasiswa.tusiBrida)
            return [];
        const peers = await fork.find(entities_1.Mahasiswa, {
            tusiBrida: { id: myMahasiswa.tusiBrida.id },
            id: { $ne: myMahasiswa.id },
            status: entities_1.MahasiswaStatus.ACTIVE,
        }, { populate: ['user'] });
        const assessed = await fork.find(entities_1.Penilaian, {
            assessedBy: { id: userId },
            assessorType: entities_1.AssessorType.PEER,
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
    async getMyResults(userId) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(entities_1.Mahasiswa, { user: { id: userId } });
        if (!mahasiswa)
            throw new common_1.NotFoundException('Data mahasiswa tidak ditemukan');
        const nilaiAkhir = await fork.findOne(entities_1.NilaiAkhir, { mahasiswa: { id: mahasiswa.id } });
        const penilaianList = await fork.find(entities_1.Penilaian, {
            mahasiswa: { id: mahasiswa.id },
        }, { populate: ['nilaiList', 'nilaiList.kriteria'] });
        const behaviorData = this.buildCriteriaView(penilaianList, entities_1.PenilaianComponent.PERILAKU);
        const performanceData = this.buildCriteriaView(penilaianList, entities_1.PenilaianComponent.KINERJA);
        const selfAssessment = penilaianList.find(p => p.assessorType === entities_1.AssessorType.SELF && p.component === entities_1.PenilaianComponent.PERILAKU);
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
    async findAll() {
        const fork = this.em.fork();
        const mahasiswaList = await fork.find(entities_1.Mahasiswa, { status: entities_1.MahasiswaStatus.ACTIVE }, {
            populate: ['user', 'tusiBrida'],
            orderBy: { fullName: 'ASC' },
        });
        const result = [];
        for (const m of mahasiswaList) {
            const nilaiAkhir = await fork.findOne(entities_1.NilaiAkhir, { mahasiswa: { id: m.id } });
            const penilaianCount = await fork.count(entities_1.Penilaian, { mahasiswa: { id: m.id } });
            const penilaianList = await fork.find(entities_1.Penilaian, { mahasiswa: { id: m.id } });
            const assessmentStatus = {};
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
    async savePenilaian(fork, mahasiswa, assessedBy, assessorType, component, data, peerMahasiswa) {
        const penilaian = new entities_1.Penilaian();
        penilaian.mahasiswa = mahasiswa;
        penilaian.assessedBy = assessedBy;
        penilaian.assessorType = assessorType;
        penilaian.component = component;
        penilaian.feedback = data.feedback;
        if (peerMahasiswa)
            penilaian.peerMahasiswa = peerMahasiswa;
        fork.persist(penilaian);
        let totalScore = 0;
        let count = 0;
        for (const s of data.scores) {
            const kriteria = await fork.findOneOrFail(entities_1.KriteriaPenilaian, { id: s.kriteriaId });
            const nilai = new entities_1.NilaiPenilaian();
            nilai.penilaian = penilaian;
            nilai.kriteria = kriteria;
            nilai.score = s.score;
            nilai.keterangan = s.keterangan;
            fork.persist(nilai);
            totalScore += s.score;
            count++;
        }
        penilaian.finalScore = count > 0 ? Number((totalScore / count).toFixed(2)) : 0;
        await fork.flush();
        return penilaian;
    }
    buildCriteriaView(penilaianList, component) {
        const criteriaMap = new Map();
        const relevantList = penilaianList.filter(p => p.component === component);
        for (const p of relevantList) {
            for (const n of p.nilaiList.getItems()) {
                const key = n.kriteria.id;
                if (!criteriaMap.has(key)) {
                    criteriaMap.set(key, { name: n.kriteria.name, scores: [], keterangan: [] });
                }
                const entry = criteriaMap.get(key);
                entry.scores.push(Number(n.score));
                if (n.keterangan)
                    entry.keterangan.push(n.keterangan);
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
};
exports.PenilaianService = PenilaianService;
exports.PenilaianService = PenilaianService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], PenilaianService);
//# sourceMappingURL=penilaian.service.js.map
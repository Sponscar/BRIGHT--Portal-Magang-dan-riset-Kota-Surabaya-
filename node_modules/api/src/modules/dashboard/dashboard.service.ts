import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import {
    Mahasiswa, MahasiswaStatus, Logbook, Presensi, Sertifikat,
    Dokumen, DocumentStatus, LaporanAkhir, LaporanStatus,
    Penilaian, NilaiAkhir, KurikulumMagang,
} from '../../entities';

@Injectable()
export class DashboardService {
    constructor(private readonly em: EntityManager) { }

    async getAdminDashboard() {
        const fork = this.em.fork();
        const [totalMahasiswa, pendingMahasiswa, activeMahasiswa, completedMahasiswa] = await Promise.all([
            fork.count(Mahasiswa, {}),
            fork.count(Mahasiswa, { status: MahasiswaStatus.PENDING }),
            fork.count(Mahasiswa, { status: MahasiswaStatus.ACTIVE }),
            fork.count(Mahasiswa, { status: MahasiswaStatus.COMPLETED }),
        ]);
        const [totalLogbook, pendingDokumen, totalSertifikat, pendingLaporan, totalPenilaian] = await Promise.all([
            fork.count(Logbook, { deletedAt: null }),
            fork.count(Dokumen, { status: DocumentStatus.PENDING }),
            fork.count(Sertifikat, {}),
            fork.count(LaporanAkhir, { status: LaporanStatus.PENDING }),
            fork.count(Penilaian, {}),
        ]);

        // Mahasiswa yang sudah punya nilai akhir
        const dinilai = await fork.count(NilaiAkhir, {});

        const recentMahasiswa = await fork.find(Mahasiswa, {}, {
            populate: ['user', 'tusiBrida'],
            orderBy: { createdAt: 'DESC' },
            limit: 10,
        });

        return {
            totalMahasiswa, pendingMahasiswa, activeMahasiswa, completedMahasiswa,
            totalLogbook, pendingDokumen, totalSertifikat, pendingLaporan,
            totalPenilaian, totalDinilai: dinilai,
            recentMahasiswa,
        };
    }

    async getStudentDashboard(userId: string) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(Mahasiswa, { user: { id: userId } }, { populate: ['tusiBrida'] });
        const [totalLogbook, totalPresensi, penilaian, sertifikat, kurikulum, nilaiAkhir] = await Promise.all([
            fork.count(Logbook, { mahasiswa, deletedAt: null }),
            fork.count(Presensi, { mahasiswa }),
            fork.find(Penilaian, { mahasiswa }, { populate: ['nilaiList', 'nilaiList.kriteria'] }),
            fork.find(Sertifikat, { mahasiswa }),
            fork.find(KurikulumMagang, { mahasiswa }),
            fork.findOne(NilaiAkhir, { mahasiswa }),
        ]);
        return { mahasiswa, totalLogbook, totalPresensi, penilaian, sertifikat, kurikulum, nilaiAkhir };
    }
}

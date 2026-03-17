import { EntityManager } from '@mikro-orm/postgresql';
import { Mahasiswa, Sertifikat, Penilaian, NilaiAkhir, KurikulumMagang } from '../../entities';
export declare class DashboardService {
    private readonly em;
    constructor(em: EntityManager);
    getAdminDashboard(): Promise<{
        totalMahasiswa: number;
        pendingMahasiswa: number;
        activeMahasiswa: number;
        completedMahasiswa: number;
        totalLogbook: number;
        pendingDokumen: number;
        totalSertifikat: number;
        pendingLaporan: number;
        totalPenilaian: number;
        totalDinilai: number;
        recentMahasiswa: import("@mikro-orm/postgresql").Loaded<Mahasiswa, "user" | "tusiBrida", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[];
    }>;
    getStudentDashboard(userId: string): Promise<{
        mahasiswa: import("@mikro-orm/postgresql").Loaded<Mahasiswa, "tusiBrida", "*", never>;
        totalLogbook: number;
        totalPresensi: number;
        penilaian: import("@mikro-orm/postgresql").Loaded<Penilaian, "nilaiList" | "nilaiList.kriteria", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[];
        sertifikat: import("@mikro-orm/postgresql").Loaded<Sertifikat, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[];
        kurikulum: import("@mikro-orm/postgresql").Loaded<KurikulumMagang, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[];
        nilaiAkhir: import("@mikro-orm/postgresql").Loaded<NilaiAkhir, never, "*", never> | null;
    }>;
}

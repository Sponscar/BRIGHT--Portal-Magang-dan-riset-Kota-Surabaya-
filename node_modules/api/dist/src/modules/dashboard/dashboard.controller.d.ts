import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly svc;
    constructor(svc: DashboardService);
    getAdmin(): Promise<{
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
        recentMahasiswa: import("@mikro-orm/core").Loaded<import("../../entities").Mahasiswa, "user" | "tusiBrida", import("@mikro-orm/core").PopulatePath.ALL, never>[];
    }>;
    getStudent(uid: string): Promise<{
        mahasiswa: import("@mikro-orm/core").Loaded<import("../../entities").Mahasiswa, "tusiBrida", "*", never>;
        totalLogbook: number;
        totalPresensi: number;
        penilaian: import("@mikro-orm/core").Loaded<import("../../entities").Penilaian, "nilaiList" | "nilaiList.kriteria", import("@mikro-orm/core").PopulatePath.ALL, never>[];
        sertifikat: import("@mikro-orm/core").Loaded<import("../../entities").Sertifikat, never, import("@mikro-orm/core").PopulatePath.ALL, never>[];
        kurikulum: import("@mikro-orm/core").Loaded<import("../../entities").KurikulumMagang, never, import("@mikro-orm/core").PopulatePath.ALL, never>[];
        nilaiAkhir: import("@mikro-orm/core").Loaded<import("../../entities").NilaiAkhir, never, "*", never> | null;
    }>;
}

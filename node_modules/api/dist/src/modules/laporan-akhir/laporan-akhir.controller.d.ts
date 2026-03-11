import { LaporanAkhirService } from './laporan-akhir.service';
import { LaporanStatus } from '../../entities';
export declare class LaporanAkhirController {
    private readonly svc;
    constructor(svc: LaporanAkhirService);
    submit(uid: string, file: Express.Multer.File, title?: string): Promise<import("../../entities").LaporanAkhir>;
    findMine(uid: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").LaporanAkhir, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../entities").LaporanAkhir, "mahasiswa" | "mahasiswa.user" | "reviewedBy", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    review(id: string, status: LaporanStatus, uid: string, reason?: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").LaporanAkhir, never, "*", never>>;
    download(id: string): Promise<{
        url: string;
    }>;
}

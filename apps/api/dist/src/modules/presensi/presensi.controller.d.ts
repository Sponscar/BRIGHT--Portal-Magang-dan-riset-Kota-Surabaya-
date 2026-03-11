import { PresensiService } from './presensi.service';
import { ValidasiStatus } from '../../entities';
export declare class PresensiController {
    private readonly svc;
    constructor(svc: PresensiService);
    checkIn(uid: string): Promise<import("../../entities").Presensi | {
        message: string;
        presensi: import("@mikro-orm/core").Loaded<import("../../entities").Presensi, never, "*", never>;
    }>;
    submitPermission(uid: string, d: any, file?: Express.Multer.File): Promise<import("../../entities").Presensi>;
    findMine(uid: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Presensi, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    findAll(date?: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Presensi, "mahasiswa" | "mahasiswa.user", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    validate(id: string, status: ValidasiStatus, uid: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Presensi, never, "*", never>>;
}

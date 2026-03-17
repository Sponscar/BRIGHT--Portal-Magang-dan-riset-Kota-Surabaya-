import { LogbookService } from './logbook.service';
import { LogbookStatus } from '../../entities';
export declare class LogbookController {
    private readonly svc;
    constructor(svc: LogbookService);
    create(uid: string, d: any, file?: Express.Multer.File): Promise<import("../../entities").Logbook>;
    findMine(uid: string, status?: LogbookStatus): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Logbook, "jenisAktivitas" | "mataKuliah", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    update(id: string, uid: string, d: any, file?: Express.Multer.File): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Logbook, never, "*", never>>;
    softDelete(id: string, uid: string): Promise<{
        message: string;
    }>;
    findAll(status?: LogbookStatus): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Logbook, "mahasiswa" | "mahasiswa.user" | "jenisAktivitas", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    findById(id: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Logbook, "mahasiswa" | "mahasiswa.user" | "jenisAktivitas" | "mataKuliah", "*", never>>;
    review(id: string, status: LogbookStatus, uid: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Logbook, never, "*", never>>;
}

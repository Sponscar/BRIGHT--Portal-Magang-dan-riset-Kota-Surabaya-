import { JurnalService } from './jurnal.service';
import { JurnalStatus } from '../../entities';
export declare class JurnalController {
    private readonly svc;
    constructor(svc: JurnalService);
    create(uid: string, d: any, file?: Express.Multer.File): Promise<import("../../entities").Jurnal>;
    findMine(uid: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Jurnal, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    update(id: string, uid: string, d: any, file?: Express.Multer.File): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Jurnal, never, "*", never>>;
    delete(id: string, uid: string): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Jurnal, "mahasiswa" | "mahasiswa.user", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    review(id: string, status: JurnalStatus, uid: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Jurnal, never, "*", never>>;
}

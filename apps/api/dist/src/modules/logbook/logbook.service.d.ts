import { EntityManager } from '@mikro-orm/postgresql';
import { Logbook, LogbookStatus } from '../../entities';
import { StorageService } from '../storage/storage.service';
export declare class LogbookService {
    private readonly em;
    private readonly storageService;
    constructor(em: EntityManager, storageService: StorageService);
    create(userId: string, data: any, file?: Express.Multer.File): Promise<Logbook>;
    findByUser(userId: string, filters?: {
        status?: LogbookStatus;
    }): Promise<import("@mikro-orm/postgresql").Loaded<Logbook, "jenisAktivitas" | "mataKuliah", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    update(id: string, userId: string, data: any, file?: Express.Multer.File): Promise<import("@mikro-orm/postgresql").Loaded<Logbook, never, "*", never>>;
    softDelete(id: string, userId: string): Promise<{
        message: string;
    }>;
    findAll(filters?: {
        status?: LogbookStatus;
    }): Promise<import("@mikro-orm/postgresql").Loaded<Logbook, "mahasiswa" | "mahasiswa.user" | "jenisAktivitas", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    findById(id: string): Promise<import("@mikro-orm/postgresql").Loaded<Logbook, "mahasiswa" | "mahasiswa.user" | "jenisAktivitas" | "mataKuliah", "*", never>>;
    review(id: string, status: LogbookStatus, reviewedByUserId: string): Promise<import("@mikro-orm/postgresql").Loaded<Logbook, never, "*", never>>;
}

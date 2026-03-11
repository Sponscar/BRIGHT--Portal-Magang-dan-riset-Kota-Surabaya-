import { EntityManager } from '@mikro-orm/postgresql';
import { Presensi, ValidasiStatus } from '../../entities';
import { StorageService } from '../storage/storage.service';
export declare class PresensiService {
    private readonly em;
    private readonly storageService;
    constructor(em: EntityManager, storageService: StorageService);
    checkIn(userId: string): Promise<Presensi | {
        message: string;
        presensi: import("@mikro-orm/postgresql").Loaded<Presensi, never, "*", never>;
    }>;
    submitPermission(userId: string, data: any, file?: Express.Multer.File): Promise<Presensi>;
    findByUser(userId: string): Promise<import("@mikro-orm/postgresql").Loaded<Presensi, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    findAll(filters?: {
        date?: string;
    }): Promise<import("@mikro-orm/postgresql").Loaded<Presensi, "mahasiswa" | "mahasiswa.user", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    validate(id: string, statusValidasi: ValidasiStatus, validatedByUserId: string): Promise<import("@mikro-orm/postgresql").Loaded<Presensi, never, "*", never>>;
}

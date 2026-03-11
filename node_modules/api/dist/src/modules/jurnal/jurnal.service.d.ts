import { EntityManager } from '@mikro-orm/postgresql';
import { Jurnal, JurnalStatus } from '../../entities';
import { StorageService } from '../storage/storage.service';
export declare class JurnalService {
    private readonly em;
    private readonly storageService;
    constructor(em: EntityManager, storageService: StorageService);
    create(userId: string, data: any, file?: Express.Multer.File): Promise<Jurnal>;
    findByUser(userId: string): Promise<import("@mikro-orm/postgresql").Loaded<Jurnal, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    update(id: string, userId: string, data: any, file?: Express.Multer.File): Promise<import("@mikro-orm/postgresql").Loaded<Jurnal, never, "*", never>>;
    delete(id: string, userId: string): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("@mikro-orm/postgresql").Loaded<Jurnal, "mahasiswa" | "mahasiswa.user", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    review(id: string, status: JurnalStatus, reviewedByUserId: string): Promise<import("@mikro-orm/postgresql").Loaded<Jurnal, never, "*", never>>;
}

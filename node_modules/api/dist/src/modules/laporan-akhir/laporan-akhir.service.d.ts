import { EntityManager } from '@mikro-orm/postgresql';
import { LaporanAkhir, LaporanStatus } from '../../entities';
import { StorageService } from '../storage/storage.service';
export declare class LaporanAkhirService {
    private readonly em;
    private readonly storageService;
    constructor(em: EntityManager, storageService: StorageService);
    submit(userId: string, file: Express.Multer.File, title?: string): Promise<LaporanAkhir>;
    findByUser(userId: string): Promise<import("@mikro-orm/postgresql").Loaded<LaporanAkhir, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    findAll(): Promise<import("@mikro-orm/postgresql").Loaded<LaporanAkhir, "mahasiswa" | "mahasiswa.user" | "reviewedBy", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    review(id: string, status: LaporanStatus, reviewedByUserId: string, rejectionReason?: string): Promise<import("@mikro-orm/postgresql").Loaded<LaporanAkhir, never, "*", never>>;
    getPresignedUrl(id: string): Promise<{
        url: string;
    }>;
}

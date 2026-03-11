import { EntityManager } from '@mikro-orm/postgresql';
import { Mahasiswa, MahasiswaStatus } from '../../entities';
import { StorageService } from '../storage/storage.service';
export declare class MahasiswaService {
    private readonly em;
    private readonly storageService;
    constructor(em: EntityManager, storageService: StorageService);
    getProfile(userId: string): Promise<import("@mikro-orm/postgresql").Loaded<Mahasiswa, "user" | "tusiBrida", "*", never>>;
    updateProfile(userId: string, data: Partial<Mahasiswa>): Promise<import("@mikro-orm/postgresql").Loaded<Mahasiswa, never, "*", never>>;
    uploadProfileImage(userId: string, file: Express.Multer.File): Promise<{
        profileImageUrl: string;
    }>;
    findAll(filters?: {
        status?: MahasiswaStatus;
    }): Promise<import("@mikro-orm/postgresql").Loaded<Mahasiswa, "user" | "tusiBrida", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    findById(id: string): Promise<import("@mikro-orm/postgresql").Loaded<Mahasiswa, "user" | "tusiBrida", "*", never>>;
    updateStatus(id: string, status: MahasiswaStatus): Promise<import("@mikro-orm/postgresql").Loaded<Mahasiswa, never, "*", never>>;
    assignTusi(id: string, tusiId: string, assignedByUserId: string): Promise<import("@mikro-orm/postgresql").Loaded<Mahasiswa, never, "*", never>>;
}

import { EntityManager } from '@mikro-orm/postgresql';
import { Dokumen, DocumentType, DocumentStatus } from '../../entities';
import { StorageService } from '../storage/storage.service';
export declare class DokumenService {
    private readonly em;
    private readonly storageService;
    constructor(em: EntityManager, storageService: StorageService);
    upload(userId: string, file: Express.Multer.File, documentType: DocumentType): Promise<Dokumen>;
    findByUser(userId: string): Promise<import("@mikro-orm/postgresql").Loaded<Dokumen, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    reUpload(id: string, userId: string, file: Express.Multer.File): Promise<import("@mikro-orm/postgresql").Loaded<Dokumen, never, "*", never>>;
    findAll(): Promise<import("@mikro-orm/postgresql").Loaded<Dokumen, "mahasiswa" | "mahasiswa.user", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    verify(id: string, status: DocumentStatus, verifiedByUserId: string, rejectionReason?: string): Promise<import("@mikro-orm/postgresql").Loaded<Dokumen, never, "*", never>>;
    getPresignedUrl(id: string): Promise<{
        url: string;
    }>;
}

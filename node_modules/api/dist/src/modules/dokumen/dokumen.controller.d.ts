import { DokumenService } from './dokumen.service';
import { DocumentType, DocumentStatus } from '../../entities';
export declare class DokumenController {
    private readonly dokumenService;
    constructor(dokumenService: DokumenService);
    upload(userId: string, file: Express.Multer.File, documentType: DocumentType): Promise<import("../../entities").Dokumen>;
    findByUser(userId: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Dokumen, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    reUpload(id: string, userId: string, file: Express.Multer.File): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Dokumen, never, "*", never>>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Dokumen, "mahasiswa" | "mahasiswa.user", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    verify(id: string, status: DocumentStatus, userId: string, rejectionReason?: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Dokumen, never, "*", never>>;
    getPresignedUrl(id: string): Promise<{
        url: string;
    }>;
}

import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';
export declare enum DocumentType {
    SURAT_PENGANTAR = "surat_pengantar",
    PROPOSAL = "proposal",
    KTP = "ktp",
    KTM = "ktm",
    CV = "cv",
    SURAT_PERNYATAAN = "surat_pernyataan"
}
export declare enum DocumentStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class Dokumen {
    id: string;
    mahasiswa: Mahasiswa;
    documentType: DocumentType;
    fileName: string;
    fileUrl: string;
    fileSize?: number;
    status: DocumentStatus;
    rejectionReason?: string;
    verifiedBy?: User;
    verifiedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

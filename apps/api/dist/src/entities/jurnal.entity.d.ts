import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';
export declare enum JurnalStatus {
    DRAFT = "draft",
    SUBMITTED = "submitted",
    REVIEWED = "reviewed",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class Jurnal {
    id: string;
    mahasiswa: Mahasiswa;
    title: string;
    content?: string;
    fileName?: string;
    fileUrl?: string;
    fileSize?: number;
    status: JurnalStatus;
    reviewedBy?: User;
    reviewedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

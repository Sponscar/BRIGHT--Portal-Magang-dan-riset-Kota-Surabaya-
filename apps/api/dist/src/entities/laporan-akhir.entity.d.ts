import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';
export declare enum LaporanStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class LaporanAkhir {
    id: string;
    mahasiswa: Mahasiswa;
    title?: string;
    fileName: string;
    fileUrl: string;
    fileSize?: number;
    status: LaporanStatus;
    rejectionReason?: string;
    submittedAt: Date;
    reviewedBy?: User;
    reviewedAt?: Date;
    createdAt: Date;
}

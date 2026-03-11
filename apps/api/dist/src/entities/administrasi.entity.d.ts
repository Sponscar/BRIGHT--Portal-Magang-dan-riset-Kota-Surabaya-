import { Mahasiswa } from './mahasiswa.entity';
export declare enum AdministrasiStatus {
    DRAFT = "draft",
    SUBMITTED = "submitted",
    VERIFIED = "verified"
}
export declare class Administrasi {
    id: string;
    mahasiswa: Mahasiswa;
    needsReplyLetter: boolean;
    proposalDescription: string;
    topic?: string;
    expectedResults?: string;
    hasCourseConversion: boolean;
    declaration: boolean;
    status: AdministrasiStatus;
    createdAt: Date;
    updatedAt: Date;
}

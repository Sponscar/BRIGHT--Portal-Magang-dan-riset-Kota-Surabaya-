import { Mahasiswa } from './mahasiswa.entity';
import type { JenisAktivitas } from './jenis-aktivitas.entity';
import type { MataKuliahKonversi } from './mata-kuliah-konversi.entity';
import { User } from './user.entity';
export declare enum LogbookStatus {
    DRAFT = "draft",
    SUBMITTED = "submitted",
    REVIEWED = "reviewed",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare enum LogbookType {
    LAPORAN_HARIAN = "Laporan Harian",
    JURNAL = "Jurnal",
    DRAFT_JURNAL = "Draft Jurnal"
}
export declare class Logbook {
    id: string;
    mahasiswa: Mahasiswa;
    jenisAktivitas?: JenisAktivitas;
    mataKuliah?: MataKuliahKonversi;
    type?: LogbookType;
    logDate: Date;
    startTime?: string;
    endTime?: string;
    totalJamKerja?: string;
    description: string;
    pembelajaran?: string;
    lokasiNama?: string;
    lokasiLat?: number;
    lokasiLng?: number;
    attachmentUrl?: string;
    university?: string;
    major?: string;
    status: LogbookStatus;
    reviewedBy?: User;
    reviewedAt?: Date;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

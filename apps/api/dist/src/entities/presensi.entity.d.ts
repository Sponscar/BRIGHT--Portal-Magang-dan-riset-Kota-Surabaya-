import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';
export declare enum PresensiStatus {
    HADIR = "hadir",
    IZIN = "izin",
    SAKIT = "sakit"
}
export declare enum ValidasiStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class Presensi {
    id: string;
    mahasiswa: Mahasiswa;
    tanggal: Date;
    jamMasuk?: string;
    status: PresensiStatus;
    keterangan?: string;
    buktiUrl?: string;
    statusValidasi: ValidasiStatus;
    validatedBy?: User;
    validatedAt?: Date;
    createdAt: Date;
}

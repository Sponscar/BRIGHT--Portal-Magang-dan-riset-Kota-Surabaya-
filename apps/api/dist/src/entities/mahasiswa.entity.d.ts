import { User } from './user.entity';
import { TusiBrida } from './tusi-brida.entity';
export declare enum MahasiswaStatus {
    PENDING = "pending",
    DOCUMENTS_UPLOADED = "documents_uploaded",
    VERIFIED = "verified",
    ACTIVE = "active",
    COMPLETED = "completed"
}
export declare enum InternshipType {
    MAGANG_KP = "magang_kp",
    MAGANG_MBKM = "magang_mbkm",
    MAGANG_MANDIRI = "magang_mandiri"
}
export declare class Mahasiswa {
    id: string;
    user: User;
    fullName: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
    provinsi?: string;
    kotaKabupaten?: string;
    kecamatan?: string;
    kelurahan?: string;
    alamatLengkap?: string;
    university?: string;
    major?: string;
    universityAddress?: string;
    uniKelurahan?: string;
    uniKecamatan?: string;
    nik?: string;
    nim?: string;
    semester?: number;
    internshipType?: InternshipType;
    internshipDuration?: string;
    conversionType?: string;
    profileImageUrl?: string;
    status: MahasiswaStatus;
    tusiBrida?: TusiBrida;
    assignedBy?: User;
    tusiAssignedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

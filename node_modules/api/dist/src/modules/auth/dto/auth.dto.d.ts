import { InternshipType } from '../../../entities';
export declare class RegisterDto {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
    nik?: string;
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
    nim?: string;
    internshipType?: InternshipType;
    perangkatDaerah?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class VerifyEmailDto {
    email: string;
    otp: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    email: string;
    otp: string;
    newPassword: string;
}

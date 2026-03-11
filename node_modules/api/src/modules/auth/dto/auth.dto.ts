import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { InternshipType } from '../../../entities';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    fullName!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    whatsapp?: string;

    @IsOptional()
    @IsString()
    address?: string;

    // Alamat Domisili
    @IsOptional()
    @IsString()
    nik?: string;

    @IsOptional()
    @IsString()
    provinsi?: string;

    @IsOptional()
    @IsString()
    kotaKabupaten?: string;

    @IsOptional()
    @IsString()
    kecamatan?: string;

    @IsOptional()
    @IsString()
    kelurahan?: string;

    @IsOptional()
    @IsString()
    alamatLengkap?: string;

    // Perguruan Tinggi
    @IsOptional()
    @IsString()
    university?: string;

    @IsOptional()
    @IsString()
    major?: string;

    @IsOptional()
    @IsString()
    universityAddress?: string;

    @IsOptional()
    @IsString()
    uniKelurahan?: string;

    @IsOptional()
    @IsString()
    uniKecamatan?: string;

    @IsOptional()
    @IsString()
    nim?: string;

    @IsOptional()
    @IsEnum(InternshipType)
    internshipType?: InternshipType;

    @IsOptional()
    @IsString()
    perangkatDaerah?: string;
}

export class LoginDto {
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}

export class VerifyEmailDto {
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    otp!: string;
}

export class ForgotPasswordDto {
    @IsEmail()
    email!: string;
}

export class ResetPasswordDto {
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    otp!: string;

    @IsString()
    @MinLength(6)
    newPassword!: string;
}

import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EntityManager } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';
import { User, UserRole, OtpToken, OtpType, Mahasiswa, MahasiswaStatus } from '../../entities';
import { MailService } from '../mail/mail.service';
import { RegisterDto, LoginDto, VerifyEmailDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly em: EntityManager,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) { }

    async register(dto: RegisterDto) {
        const fork = this.em.fork();

        const existingUser = await fork.findOne(User, { email: dto.email });
        if (existingUser) {
            throw new ConflictException('Email sudah terdaftar');
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);

        const user = new User();
        user.name = dto.fullName;
        user.email = dto.email;
        user.passwordHash = passwordHash;
        user.role = UserRole.STUDENT;
        user.emailVerified = false;

        const mahasiswa = new Mahasiswa();
        mahasiswa.user = user;
        mahasiswa.fullName = dto.fullName;
        mahasiswa.phone = dto.phone;
        mahasiswa.whatsapp = dto.whatsapp;
        mahasiswa.address = dto.address;
        mahasiswa.provinsi = dto.provinsi;
        mahasiswa.kotaKabupaten = dto.kotaKabupaten;
        mahasiswa.kecamatan = dto.kecamatan;
        mahasiswa.kelurahan = dto.kelurahan;
        mahasiswa.alamatLengkap = dto.alamatLengkap;
        mahasiswa.nik = dto.nik;
        mahasiswa.university = dto.university;
        mahasiswa.major = dto.major;
        mahasiswa.universityAddress = dto.universityAddress;
        mahasiswa.uniKelurahan = dto.uniKelurahan;
        mahasiswa.uniKecamatan = dto.uniKecamatan;
        mahasiswa.nim = dto.nim;
        mahasiswa.internshipType = dto.internshipType;
        mahasiswa.perangkatDaerah = dto.perangkatDaerah;
        mahasiswa.status = MahasiswaStatus.PENDING;

        const otpCode = this.generateOtp();
        const otp = new OtpToken();
        otp.email = dto.email;
        otp.code = otpCode;
        otp.type = OtpType.REGISTER;
        otp.expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        fork.persist([user, mahasiswa, otp]);
        await fork.flush();

        await this.mailService.sendOtp(dto.email, otpCode, 'register');

        return { message: 'Registrasi berhasil. Silakan cek email untuk kode OTP verifikasi.' };
    }

    async verifyEmail(dto: VerifyEmailDto) {
        const fork = this.em.fork();

        const otp = await fork.findOne(OtpToken, {
            email: dto.email,
            code: dto.otp,
            type: OtpType.REGISTER,
            used: false,
        });

        if (!otp) {
            throw new BadRequestException('Kode OTP tidak valid');
        }

        if (otp.expiresAt < new Date()) {
            throw new BadRequestException('Kode OTP sudah kedaluwarsa');
        }

        otp.used = true;

        const user = await fork.findOne(User, { email: dto.email });
        if (!user) {
            throw new BadRequestException('User tidak ditemukan');
        }
        user.emailVerified = true;

        await fork.flush();

        return { message: 'Email berhasil diverifikasi. Silakan login.' };
    }

    async login(dto: LoginDto) {
        const fork = this.em.fork();

        const user = await fork.findOne(User, { email: dto.email });
        if (!user) {
            throw new UnauthorizedException('Email atau password salah');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Email atau password salah');
        }

        if (!user.emailVerified) {
            throw new UnauthorizedException('Email belum diverifikasi. Silakan cek inbox Anda.');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }

    async forgotPassword(dto: ForgotPasswordDto) {
        const fork = this.em.fork();

        const user = await fork.findOne(User, { email: dto.email });
        if (!user) {
            return { message: 'Jika email terdaftar, kode OTP akan dikirim.' };
        }

        const otpCode = this.generateOtp();
        const otp = new OtpToken();
        otp.email = dto.email;
        otp.code = otpCode;
        otp.type = OtpType.RESET_PASSWORD;
        otp.expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        fork.persist(otp);
        await fork.flush();

        await this.mailService.sendOtp(dto.email, otpCode, 'reset_password');

        return { message: 'Jika email terdaftar, kode OTP akan dikirim.' };
    }

    async resetPassword(dto: ResetPasswordDto) {
        const fork = this.em.fork();

        const otp = await fork.findOne(OtpToken, {
            email: dto.email,
            code: dto.otp,
            type: OtpType.RESET_PASSWORD,
            used: false,
        });

        if (!otp) {
            throw new BadRequestException('Kode OTP tidak valid');
        }

        if (otp.expiresAt < new Date()) {
            throw new BadRequestException('Kode OTP sudah kedaluwarsa');
        }

        otp.used = true;

        const user = await fork.findOne(User, { email: dto.email });
        if (!user) {
            throw new BadRequestException('User tidak ditemukan');
        }

        user.passwordHash = await bcrypt.hash(dto.newPassword, 10);
        await fork.flush();

        return { message: 'Password berhasil direset. Silakan login dengan password baru.' };
    }

    async getProfile(userId: string) {
        const fork = this.em.fork();
        const user = await fork.findOne(User, { id: userId });
        if (!user) {
            throw new UnauthorizedException('User tidak ditemukan');
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }

    private generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}

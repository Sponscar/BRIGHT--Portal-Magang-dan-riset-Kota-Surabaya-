"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const postgresql_1 = require("@mikro-orm/postgresql");
const bcrypt = __importStar(require("bcrypt"));
const entities_1 = require("../../entities");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    em;
    jwtService;
    mailService;
    constructor(em, jwtService, mailService) {
        this.em = em;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async register(dto) {
        const fork = this.em.fork();
        const existingUser = await fork.findOne(entities_1.User, { email: dto.email });
        if (existingUser) {
            throw new common_1.ConflictException('Email sudah terdaftar');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = new entities_1.User();
        user.name = dto.fullName;
        user.email = dto.email;
        user.passwordHash = passwordHash;
        user.role = entities_1.UserRole.STUDENT;
        user.emailVerified = false;
        const mahasiswa = new entities_1.Mahasiswa();
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
        mahasiswa.status = entities_1.MahasiswaStatus.PENDING;
        const otpCode = this.generateOtp();
        const otp = new entities_1.OtpToken();
        otp.email = dto.email;
        otp.code = otpCode;
        otp.type = entities_1.OtpType.REGISTER;
        otp.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        fork.persist([user, mahasiswa, otp]);
        await fork.flush();
        await this.mailService.sendOtp(dto.email, otpCode, 'register');
        return { message: 'Registrasi berhasil. Silakan cek email untuk kode OTP verifikasi.' };
    }
    async verifyEmail(dto) {
        const fork = this.em.fork();
        const otp = await fork.findOne(entities_1.OtpToken, {
            email: dto.email,
            code: dto.otp,
            type: entities_1.OtpType.REGISTER,
            used: false,
        });
        if (!otp) {
            throw new common_1.BadRequestException('Kode OTP tidak valid');
        }
        if (otp.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Kode OTP sudah kedaluwarsa');
        }
        otp.used = true;
        const user = await fork.findOne(entities_1.User, { email: dto.email });
        if (!user) {
            throw new common_1.BadRequestException('User tidak ditemukan');
        }
        user.emailVerified = true;
        await fork.flush();
        return { message: 'Email berhasil diverifikasi. Silakan login.' };
    }
    async login(dto) {
        const fork = this.em.fork();
        const user = await fork.findOne(entities_1.User, { email: dto.email });
        if (!user) {
            throw new common_1.UnauthorizedException('Email atau password salah');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Email atau password salah');
        }
        if (!user.emailVerified) {
            throw new common_1.UnauthorizedException('Email belum diverifikasi. Silakan cek inbox Anda.');
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
    async forgotPassword(dto) {
        const fork = this.em.fork();
        const user = await fork.findOne(entities_1.User, { email: dto.email });
        if (!user) {
            return { message: 'Jika email terdaftar, kode OTP akan dikirim.' };
        }
        const otpCode = this.generateOtp();
        const otp = new entities_1.OtpToken();
        otp.email = dto.email;
        otp.code = otpCode;
        otp.type = entities_1.OtpType.RESET_PASSWORD;
        otp.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        fork.persist(otp);
        await fork.flush();
        await this.mailService.sendOtp(dto.email, otpCode, 'reset_password');
        return { message: 'Jika email terdaftar, kode OTP akan dikirim.' };
    }
    async resetPassword(dto) {
        const fork = this.em.fork();
        const otp = await fork.findOne(entities_1.OtpToken, {
            email: dto.email,
            code: dto.otp,
            type: entities_1.OtpType.RESET_PASSWORD,
            used: false,
        });
        if (!otp) {
            throw new common_1.BadRequestException('Kode OTP tidak valid');
        }
        if (otp.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Kode OTP sudah kedaluwarsa');
        }
        otp.used = true;
        const user = await fork.findOne(entities_1.User, { email: dto.email });
        if (!user) {
            throw new common_1.BadRequestException('User tidak ditemukan');
        }
        user.passwordHash = await bcrypt.hash(dto.newPassword, 10);
        await fork.flush();
        return { message: 'Password berhasil direset. Silakan login dengan password baru.' };
    }
    async getProfile(userId) {
        const fork = this.em.fork();
        const user = await fork.findOne(entities_1.User, { id: userId });
        if (!user) {
            throw new common_1.UnauthorizedException('User tidak ditemukan');
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
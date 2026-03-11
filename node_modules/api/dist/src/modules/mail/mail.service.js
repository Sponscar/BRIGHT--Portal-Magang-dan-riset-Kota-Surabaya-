"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const resend_1 = require("resend");
const mail_module_1 = require("./mail.module");
let MailService = class MailService {
    resend;
    configService;
    constructor(resend, configService) {
        this.resend = resend;
        this.configService = configService;
    }
    async sendOtp(email, code, type) {
        const subject = type === 'register'
            ? 'Verifikasi Email - Portal Magang BRIDA'
            : 'Reset Password - Portal Magang BRIDA';
        const html = type === 'register'
            ? `<div style="font-family: sans-serif; padding: 20px;">
            <h2>Verifikasi Email Anda</h2>
            <p>Kode OTP Anda untuk verifikasi email:</p>
            <h1 style="color: #e53e3e; letter-spacing: 8px; font-size: 36px;">${code}</h1>
            <p>Kode ini berlaku selama <strong>5 menit</strong>.</p>
            <p style="color: #888;">Jika Anda tidak mendaftar di Portal Magang BRIDA, abaikan email ini.</p>
          </div>`
            : `<div style="font-family: sans-serif; padding: 20px;">
            <h2>Reset Password</h2>
            <p>Kode OTP Anda untuk reset password:</p>
            <h1 style="color: #e53e3e; letter-spacing: 8px; font-size: 36px;">${code}</h1>
            <p>Kode ini berlaku selama <strong>5 menit</strong>.</p>
            <p style="color: #888;">Jika Anda tidak meminta reset password, abaikan email ini.</p>
          </div>`;
        await this.resend.emails.send({
            from: this.configService.get('RESEND_FROM_EMAIL') || 'noreply@brida.com',
            to: email,
            subject,
            html,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(mail_module_1.RESEND_CLIENT)),
    __metadata("design:paramtypes", [resend_1.Resend,
        config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map
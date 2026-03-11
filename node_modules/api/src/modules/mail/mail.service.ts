import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { RESEND_CLIENT } from './mail.module';

@Injectable()
export class MailService {
    constructor(
        @Inject(RESEND_CLIENT) private readonly resend: Resend,
        private readonly configService: ConfigService,
    ) { }

    async sendOtp(email: string, code: string, type: 'register' | 'reset_password'): Promise<void> {
        const subject =
            type === 'register'
                ? 'Verifikasi Email - Portal Magang BRIDA'
                : 'Reset Password - Portal Magang BRIDA';

        const html =
            type === 'register'
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
            from: this.configService.get<string>('RESEND_FROM_EMAIL') || 'noreply@brida.com',
            to: email,
            subject,
            html,
        });
    }
}

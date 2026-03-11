import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
export declare class MailService {
    private readonly resend;
    private readonly configService;
    constructor(resend: Resend, configService: ConfigService);
    sendOtp(email: string, code: string, type: 'register' | 'reset_password'): Promise<void>;
}

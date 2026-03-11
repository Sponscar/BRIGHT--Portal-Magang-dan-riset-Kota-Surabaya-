import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { MailService } from './mail.service';

export const RESEND_CLIENT = 'RESEND_CLIENT';

@Module({
    providers: [
        {
            provide: RESEND_CLIENT,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return new Resend(configService.get<string>('RESEND_API_KEY'));
            },
        },
        MailService,
    ],
    exports: [MailService],
})
export class MailModule { }

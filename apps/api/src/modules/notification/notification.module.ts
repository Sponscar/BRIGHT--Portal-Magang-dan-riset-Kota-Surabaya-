import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationGateway } from './notification.gateway';

@Global()  // Global supaya bisa di-inject di module manapun tanpa import
@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET', 'brida-jwt-secret'),
                signOptions: { expiresIn: '7d' },
            }),
        }),
    ],
    providers: [NotificationGateway],
    exports: [NotificationGateway],
})
export class NotificationModule {}

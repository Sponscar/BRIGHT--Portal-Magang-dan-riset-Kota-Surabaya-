import { JwtService } from '@nestjs/jwt';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserRole } from '../../entities';
import { MailService } from '../mail/mail.service';
import { RegisterDto, LoginDto, VerifyEmailDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly em;
    private readonly jwtService;
    private readonly mailService;
    constructor(em: EntityManager, jwtService: JwtService, mailService: MailService);
    register(dto: RegisterDto): Promise<{
        message: string;
    }>;
    verifyEmail(dto: VerifyEmailDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: UserRole;
        };
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        role: UserRole;
    }>;
    private generateOtp;
}

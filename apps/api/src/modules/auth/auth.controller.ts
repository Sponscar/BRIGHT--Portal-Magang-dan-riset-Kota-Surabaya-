import { Controller, Post, Get, Body, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, VerifyEmailDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body(new ValidationPipe()) dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('verify-email')
    async verifyEmail(@Body(new ValidationPipe()) dto: VerifyEmailDto) {
        return this.authService.verifyEmail(dto);
    }

    @Post('login')
    async login(@Body(new ValidationPipe()) dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('forgot-password')
    async forgotPassword(@Body(new ValidationPipe()) dto: ForgotPasswordDto) {
        return this.authService.forgotPassword(dto);
    }

    @Post('reset-password')
    async resetPassword(@Body(new ValidationPipe()) dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser('id') userId: string) {
        return this.authService.getProfile(userId);
    }
}

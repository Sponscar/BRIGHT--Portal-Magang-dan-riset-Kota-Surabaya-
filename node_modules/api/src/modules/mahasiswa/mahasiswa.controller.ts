import { Controller, Get, Put, Body, Param, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MahasiswaService } from './mahasiswa.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel, MahasiswaStatus } from '../../entities';

@Controller('api/mahasiswa')
@UseGuards(JwtAuthGuard)
export class MahasiswaController {
    constructor(private readonly mahasiswaService: MahasiswaService) { }

    @Get('profile')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.STUDENT)
    getProfile(@CurrentUser('id') userId: string) {
        return this.mahasiswaService.getProfile(userId);
    }

    @Put('profile')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.STUDENT)
    updateProfile(@CurrentUser('id') userId: string, @Body() data: any) {
        return this.mahasiswaService.updateProfile(userId, data);
    }

    @Put('profile/image')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.STUDENT)
    @UseInterceptors(FileInterceptor('image'))
    uploadProfileImage(@CurrentUser('id') userId: string, @UploadedFile() file: Express.Multer.File) {
        return this.mahasiswaService.uploadProfileImage(userId, file);
    }

    @Get()
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.VIEWER)
    findAll(@Query('status') status?: MahasiswaStatus) {
        return this.mahasiswaService.findAll({ status });
    }

    @Get(':id')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.VIEWER)
    findById(@Param('id') id: string) {
        return this.mahasiswaService.findById(id);
    }

    @Put(':id/status')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.ADMIN)
    updateStatus(@Param('id') id: string, @Body('status') status: MahasiswaStatus) {
        return this.mahasiswaService.updateStatus(id, status);
    }

    @Put(':id/assign-tusi')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.ADMIN)
    assignTusi(@Param('id') id: string, @Body('tusiId') tusiId: string, @CurrentUser('id') userId: string) {
        return this.mahasiswaService.assignTusi(id, tusiId, userId);
    }
}

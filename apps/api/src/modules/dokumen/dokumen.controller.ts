import { Controller, Post, Get, Put, Param, Body, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DokumenService } from './dokumen.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel, DocumentType, DocumentStatus } from '../../entities';

@Controller('api/dokumen')
@UseGuards(JwtAuthGuard)
export class DokumenController {
    constructor(private readonly dokumenService: DokumenService) { }

    @Post('upload')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.STUDENT)
    @UseInterceptors(FileInterceptor('file'))
    upload(@CurrentUser('id') userId: string, @UploadedFile() file: Express.Multer.File, @Body('documentType') documentType: DocumentType) {
        return this.dokumenService.upload(userId, file, documentType);
    }

    @Get()
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.STUDENT)
    findByUser(@CurrentUser('id') userId: string) {
        return this.dokumenService.findByUser(userId);
    }

    @Put(':id')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.STUDENT)
    @UseInterceptors(FileInterceptor('file'))
    reUpload(@Param('id') id: string, @CurrentUser('id') userId: string, @UploadedFile() file: Express.Multer.File) {
        return this.dokumenService.reUpload(id, userId, file);
    }

    @Get('all')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.VIEWER)
    findAll() {
        return this.dokumenService.findAll();
    }

    @Put(':id/verify')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.ADMIN)
    verify(@Param('id') id: string, @Body('status') status: DocumentStatus, @CurrentUser('id') userId: string, @Body('rejectionReason') rejectionReason?: string) {
        return this.dokumenService.verify(id, status, userId, rejectionReason);
    }

    @Get(':id/download')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.VIEWER)
    getPresignedUrl(@Param('id') id: string) {
        return this.dokumenService.getPresignedUrl(id);
    }
}

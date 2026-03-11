import { Controller, Post, Get, Put, Param, Body, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LaporanAkhirService } from './laporan-akhir.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel, LaporanStatus } from '../../entities';

@Controller('api/laporan-akhir')
@UseGuards(JwtAuthGuard)
export class LaporanAkhirController {
    constructor(private readonly svc: LaporanAkhirService) { }
    @Post() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) @UseInterceptors(FileInterceptor('file'))
    submit(@CurrentUser('id') uid: string, @UploadedFile() file: Express.Multer.File, @Body('title') title?: string) { return this.svc.submit(uid, file, title); }
    @Get() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) findMine(@CurrentUser('id') uid: string) { return this.svc.findByUser(uid); }
    @Get('all') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.VIEWER) findAll() { return this.svc.findAll(); }
    @Put(':id/review') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.ADMIN)
    review(@Param('id') id: string, @Body('status') status: LaporanStatus, @CurrentUser('id') uid: string, @Body('rejectionReason') reason?: string) { return this.svc.review(id, status, uid, reason); }
    @Get(':id/download') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.VIEWER)
    download(@Param('id') id: string) { return this.svc.getPresignedUrl(id); }
}

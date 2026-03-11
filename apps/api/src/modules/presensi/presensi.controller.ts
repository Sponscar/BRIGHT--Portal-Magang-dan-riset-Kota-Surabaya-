import { Controller, Post, Get, Put, Param, Body, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PresensiService } from './presensi.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel, ValidasiStatus } from '../../entities';

@Controller('api/presensi')
@UseGuards(JwtAuthGuard)
export class PresensiController {
    constructor(private readonly svc: PresensiService) { }
    @Post('check-in') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT)
    checkIn(@CurrentUser('id') uid: string) { return this.svc.checkIn(uid); }
    @Post('permission') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) @UseInterceptors(FileInterceptor('bukti'))
    submitPermission(@CurrentUser('id') uid: string, @Body() d: any, @UploadedFile() file?: Express.Multer.File) { return this.svc.submitPermission(uid, d, file); }
    @Get() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT)
    findMine(@CurrentUser('id') uid: string) { return this.svc.findByUser(uid); }
    @Get('all') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.VIEWER)
    findAll(@Query('date') date?: string) { return this.svc.findAll({ date }); }
    @Put(':id/validate') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.ADMIN)
    validate(@Param('id') id: string, @Body('statusValidasi') status: ValidasiStatus, @CurrentUser('id') uid: string) { return this.svc.validate(id, status, uid); }
}

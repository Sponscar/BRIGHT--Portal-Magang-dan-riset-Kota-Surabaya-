import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JurnalService } from './jurnal.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel, JurnalStatus } from '../../entities';

@Controller('api/jurnal')
@UseGuards(JwtAuthGuard)
export class JurnalController {
    constructor(private readonly svc: JurnalService) { }
    @Post() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) @UseInterceptors(FileInterceptor('file'))
    create(@CurrentUser('id') uid: string, @Body() d: any, @UploadedFile() file?: Express.Multer.File) { return this.svc.create(uid, d, file); }
    @Get() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) findMine(@CurrentUser('id') uid: string) { return this.svc.findByUser(uid); }
    @Put(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) @UseInterceptors(FileInterceptor('file'))
    update(@Param('id') id: string, @CurrentUser('id') uid: string, @Body() d: any, @UploadedFile() file?: Express.Multer.File) { return this.svc.update(id, uid, d, file); }
    @Delete(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) delete(@Param('id') id: string, @CurrentUser('id') uid: string) { return this.svc.delete(id, uid); }
    @Get('all') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.VIEWER) findAll() { return this.svc.findAll(); }
    @Put(':id/review') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.ADMIN)
    review(@Param('id') id: string, @Body('status') status: JurnalStatus, @CurrentUser('id') uid: string) { return this.svc.review(id, status, uid); }
}

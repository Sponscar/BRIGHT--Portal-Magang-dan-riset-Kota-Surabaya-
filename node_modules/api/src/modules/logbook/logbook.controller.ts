import { Controller, Post, Get, Put, Delete, Param, Body, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LogbookService } from './logbook.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel, LogbookStatus } from '../../entities';

@Controller('api/logbook')
@UseGuards(JwtAuthGuard)
export class LogbookController {
    constructor(private readonly svc: LogbookService) { }

    @Post() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) @UseInterceptors(FileInterceptor('file'))
    create(@CurrentUser('id') uid: string, @Body() d: any, @UploadedFile() file?: Express.Multer.File) { return this.svc.create(uid, d, file); }

    @Get() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT)
    findMine(@CurrentUser('id') uid: string, @Query('status') status?: LogbookStatus) { return this.svc.findByUser(uid, { status }); }

    @Put(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) @UseInterceptors(FileInterceptor('file'))
    update(@Param('id') id: string, @CurrentUser('id') uid: string, @Body() d: any, @UploadedFile() file?: Express.Multer.File) { return this.svc.update(id, uid, d, file); }

    @Delete(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT)
    softDelete(@Param('id') id: string, @CurrentUser('id') uid: string) { return this.svc.softDelete(id, uid); }

    @Get('all') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.VIEWER)
    findAll(@Query('status') status?: LogbookStatus) { return this.svc.findAll({ status }); }

    @Get(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.VIEWER)
    findById(@Param('id') id: string) { return this.svc.findById(id); }

    @Put(':id/review') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.ADMIN)
    review(@Param('id') id: string, @Body('status') status: LogbookStatus, @CurrentUser('id') uid: string) { return this.svc.review(id, status, uid); }
}

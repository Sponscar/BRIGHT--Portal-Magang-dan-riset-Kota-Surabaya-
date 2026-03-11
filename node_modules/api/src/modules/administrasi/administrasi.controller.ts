import { Controller, Post, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AdministrasiService } from './administrasi.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel } from '../../entities';

@Controller('api/administrasi')
@UseGuards(JwtAuthGuard)
export class AdministrasiController {
    constructor(private readonly svc: AdministrasiService) { }

    @Post() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT)
    create(@CurrentUser('id') uid: string, @Body() d: any) { return this.svc.create(uid, d); }

    @Get() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT)
    findMine(@CurrentUser('id') uid: string) { return this.svc.findByUser(uid); }

    @Put() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT)
    update(@CurrentUser('id') uid: string, @Body() d: any) { return this.svc.update(uid, d); }

    @Get('all') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.VIEWER)
    findAll() { return this.svc.findAll(); }

    @Get(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.VIEWER)
    findById(@Param('id') id: string) { return this.svc.findById(id); }
}

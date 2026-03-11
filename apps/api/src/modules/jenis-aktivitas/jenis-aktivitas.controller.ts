import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JenisAktivitasService } from './jenis-aktivitas.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel } from '../../entities';

@Controller('api/jenis-aktivitas')
@UseGuards(JwtAuthGuard)
export class JenisAktivitasController {
    constructor(private readonly svc: JenisAktivitasService) { }

    @Get() findAll() { return this.svc.findAll(); }

    @Post() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.EDITOR)
    create(@Body() data: any) { return this.svc.create(data); }

    @Put(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.EDITOR)
    update(@Param('id') id: string, @Body() data: any) { return this.svc.update(id, data); }

    @Delete(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.EDITOR)
    delete(@Param('id') id: string) { return this.svc.delete(id); }
}

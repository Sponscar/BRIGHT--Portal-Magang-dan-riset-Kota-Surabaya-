import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { KriteriaPenilaianService } from './kriteria-penilaian.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel } from '../../entities';

@Controller('api/kriteria-penilaian')
@UseGuards(JwtAuthGuard)
export class KriteriaPenilaianController {
    constructor(private readonly svc: KriteriaPenilaianService) { }
    @Get() findAll() { return this.svc.findAll(); }
    @Post() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.EDITOR) create(@Body() d: any) { return this.svc.create(d); }
    @Put(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.EDITOR) update(@Param('id') id: string, @Body() d: any) { return this.svc.update(id, d); }
    @Delete(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.EDITOR) delete(@Param('id') id: string) { return this.svc.delete(id); }
}

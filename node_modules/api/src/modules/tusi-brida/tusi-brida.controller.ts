import { Controller, Post, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { TusiBridaService } from './tusi-brida.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel } from '../../entities';

@Controller('api/tusi-brida')
@UseGuards(JwtAuthGuard)
export class TusiBridaController {
    constructor(private readonly tusiBridaService: TusiBridaService) { }

    @Post()
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.EDITOR)
    create(@Body() data: any) { return this.tusiBridaService.create(data); }

    @Get()
    findAll() { return this.tusiBridaService.findAll(); }

    @Get(':slug')
    findBySlug(@Param('slug') slug: string) { return this.tusiBridaService.findBySlug(slug); }

    @Put(':id')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.EDITOR)
    update(@Param('id') id: string, @Body() data: any) { return this.tusiBridaService.update(id, data); }

    @Put(':id/toggle')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.EDITOR)
    toggle(@Param('id') id: string) { return this.tusiBridaService.toggle(id); }
}

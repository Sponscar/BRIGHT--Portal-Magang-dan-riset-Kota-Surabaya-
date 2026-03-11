import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { PerguruanTinggiService } from './perguruan-tinggi.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel } from '../../entities';

@Controller('api/perguruan-tinggi')
@UseGuards(JwtAuthGuard)
export class PerguruanTinggiController {
    constructor(private readonly svc: PerguruanTinggiService) { }

    @Get()
    findAll(@Query('search') search?: string) { return this.svc.findAll(search); }

    @Post() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.EDITOR)
    create(@Body() d: any) { return this.svc.create(d); }

    @Put(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.EDITOR)
    update(@Param('id') id: string, @Body() d: any) { return this.svc.update(id, d); }

    @Delete(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.EDITOR)
    delete(@Param('id') id: string) { return this.svc.delete(id); }
}

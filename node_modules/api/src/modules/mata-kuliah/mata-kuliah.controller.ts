import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MataKuliahService } from './mata-kuliah.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel } from '../../entities';

@Controller('api/mata-kuliah')
@UseGuards(JwtAuthGuard)
export class MataKuliahController {
    constructor(private readonly svc: MataKuliahService) { }
    @Get() findAll() { return this.svc.findAll(); }
    @Post() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.EDITOR) create(@Body() d: any) { return this.svc.create(d); }
    @Post('assign') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) assign(@CurrentUser('id') uid: string, @Body('mataKuliahIds') ids: string[]) { return this.svc.assign(uid, ids); }
    @Get('me') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) findMine(@CurrentUser('id') uid: string) { return this.svc.findByUser(uid); }
}

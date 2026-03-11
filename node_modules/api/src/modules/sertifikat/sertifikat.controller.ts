import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { SertifikatService } from './sertifikat.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel } from '../../entities';

@Controller('api/sertifikat')
@UseGuards(JwtAuthGuard)
export class SertifikatController {
    constructor(private readonly svc: SertifikatService) { }
    @Post() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.ADMIN)
    generate(@CurrentUser('id') uid: string, @Body() d: any) { return this.svc.generate(uid, d); }
    @Get() @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.VIEWER) findAll() { return this.svc.findAll(); }
    @Get('me') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) findMine(@CurrentUser('id') uid: string) { return this.svc.findByUser(uid); }
    @Get(':id') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.VIEWER) findById(@Param('id') id: string) { return this.svc.findById(id); }
}

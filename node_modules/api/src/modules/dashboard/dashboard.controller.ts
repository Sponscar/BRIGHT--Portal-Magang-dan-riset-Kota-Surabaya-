import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel } from '../../entities';

@Controller('api/dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
    constructor(private readonly svc: DashboardService) { }
    @Get('admin') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.VIEWER) getAdmin() { return this.svc.getAdminDashboard(); }
    @Get('student') @UseGuards(PermissionsGuard) @RequirePermission(PermissionLevel.STUDENT) getStudent(@CurrentUser('id') uid: string) { return this.svc.getStudentDashboard(uid); }
}

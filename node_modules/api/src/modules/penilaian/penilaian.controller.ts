import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { PenilaianService } from './penilaian.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/permissions.decorator';
import { PermissionLevel } from '../../entities';

@Controller('api/penilaian')
@UseGuards(JwtAuthGuard)
export class PenilaianController {
    constructor(private readonly svc: PenilaianService) { }

    // ─── Mahasiswa Endpoints ───

    @Post('self-assessment')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.STUDENT)
    submitSelfAssessment(
        @CurrentUser('id') userId: string,
        @Body() data: { scores: { kriteriaId: string; score: number; keterangan?: string }[]; feedback?: string },
    ) {
        return this.svc.submitSelfAssessment(userId, data);
    }

    @Post('peer-assessment')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.STUDENT)
    submitPeerAssessment(
        @CurrentUser('id') userId: string,
        @Body() data: { mahasiswaId: string; scores: { kriteriaId: string; score: number; keterangan?: string }[]; feedback?: string },
    ) {
        return this.svc.submitPeerAssessment(userId, data);
    }

    @Get('peers')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.STUDENT)
    getPeers(@CurrentUser('id') userId: string) {
        return this.svc.getPeersForAssessment(userId);
    }

    @Get('me')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.STUDENT)
    getMyResults(@CurrentUser('id') userId: string) {
        return this.svc.getMyResults(userId);
    }

    // ─── Staff Endpoints ───

    @Post('staff-assessment')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.EDITOR)
    submitStaffAssessment(
        @CurrentUser('id') userId: string,
        @CurrentUser('role') role: string,
        @Body() data: {
            mahasiswaId: string;
            perilaku: { scores: { kriteriaId: string; score: number; keterangan?: string }[]; feedback?: string };
            kinerja: { scores: { kriteriaId: string; score: number; keterangan?: string }[]; feedback?: string };
        },
    ) {
        return this.svc.submitStaffAssessment(userId, role as any, data);
    }

    @Post('calculate/:mahasiswaId')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.EDITOR)
    calculateFinalScore(@Param('mahasiswaId') mahasiswaId: string) {
        return this.svc.calculateFinalScore(mahasiswaId);
    }

    @Get('summary/:mahasiswaId')
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.VIEWER)
    getScoreSummary(@Param('mahasiswaId') mahasiswaId: string) {
        return this.svc.getScoreSummary(mahasiswaId);
    }

    // ─── Admin Endpoints ───

    @Get()
    @UseGuards(PermissionsGuard)
    @RequirePermission(PermissionLevel.VIEWER)
    findAll() {
        return this.svc.findAll();
    }
}

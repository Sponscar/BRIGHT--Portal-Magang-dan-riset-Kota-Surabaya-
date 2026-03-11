"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenilaianController = void 0;
const common_1 = require("@nestjs/common");
const penilaian_service_1 = require("./penilaian.service");
const auth_guard_1 = require("../../common/guards/auth.guard");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const entities_1 = require("../../entities");
let PenilaianController = class PenilaianController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    submitSelfAssessment(userId, data) {
        return this.svc.submitSelfAssessment(userId, data);
    }
    submitPeerAssessment(userId, data) {
        return this.svc.submitPeerAssessment(userId, data);
    }
    getPeers(userId) {
        return this.svc.getPeersForAssessment(userId);
    }
    getMyResults(userId) {
        return this.svc.getMyResults(userId);
    }
    submitStaffAssessment(userId, role, data) {
        return this.svc.submitStaffAssessment(userId, role, data);
    }
    calculateFinalScore(mahasiswaId) {
        return this.svc.calculateFinalScore(mahasiswaId);
    }
    getScoreSummary(mahasiswaId) {
        return this.svc.getScoreSummary(mahasiswaId);
    }
    findAll() {
        return this.svc.findAll();
    }
};
exports.PenilaianController = PenilaianController;
__decorate([
    (0, common_1.Post)('self-assessment'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.STUDENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PenilaianController.prototype, "submitSelfAssessment", null);
__decorate([
    (0, common_1.Post)('peer-assessment'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.STUDENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PenilaianController.prototype, "submitPeerAssessment", null);
__decorate([
    (0, common_1.Get)('peers'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.STUDENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PenilaianController.prototype, "getPeers", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.STUDENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PenilaianController.prototype, "getMyResults", null);
__decorate([
    (0, common_1.Post)('staff-assessment'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.EDITOR),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('role')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PenilaianController.prototype, "submitStaffAssessment", null);
__decorate([
    (0, common_1.Post)('calculate/:mahasiswaId'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.EDITOR),
    __param(0, (0, common_1.Param)('mahasiswaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PenilaianController.prototype, "calculateFinalScore", null);
__decorate([
    (0, common_1.Get)('summary/:mahasiswaId'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.VIEWER),
    __param(0, (0, common_1.Param)('mahasiswaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PenilaianController.prototype, "getScoreSummary", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.VIEWER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PenilaianController.prototype, "findAll", null);
exports.PenilaianController = PenilaianController = __decorate([
    (0, common_1.Controller)('api/penilaian'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [penilaian_service_1.PenilaianService])
], PenilaianController);
//# sourceMappingURL=penilaian.controller.js.map
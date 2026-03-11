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
exports.LaporanAkhirController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const laporan_akhir_service_1 = require("./laporan-akhir.service");
const auth_guard_1 = require("../../common/guards/auth.guard");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const entities_1 = require("../../entities");
let LaporanAkhirController = class LaporanAkhirController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    submit(uid, file, title) { return this.svc.submit(uid, file, title); }
    findMine(uid) { return this.svc.findByUser(uid); }
    findAll() { return this.svc.findAll(); }
    review(id, status, uid, reason) { return this.svc.review(id, status, uid, reason); }
    download(id) { return this.svc.getPresignedUrl(id); }
};
exports.LaporanAkhirController = LaporanAkhirController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.STUDENT),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", void 0)
], LaporanAkhirController.prototype, "submit", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.STUDENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LaporanAkhirController.prototype, "findMine", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.VIEWER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LaporanAkhirController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id/review'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(3, (0, common_1.Body)('rejectionReason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], LaporanAkhirController.prototype, "review", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.VIEWER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LaporanAkhirController.prototype, "download", null);
exports.LaporanAkhirController = LaporanAkhirController = __decorate([
    (0, common_1.Controller)('api/laporan-akhir'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [laporan_akhir_service_1.LaporanAkhirService])
], LaporanAkhirController);
//# sourceMappingURL=laporan-akhir.controller.js.map
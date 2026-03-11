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
exports.DokumenController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const dokumen_service_1 = require("./dokumen.service");
const auth_guard_1 = require("../../common/guards/auth.guard");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const entities_1 = require("../../entities");
let DokumenController = class DokumenController {
    dokumenService;
    constructor(dokumenService) {
        this.dokumenService = dokumenService;
    }
    upload(userId, file, documentType) {
        return this.dokumenService.upload(userId, file, documentType);
    }
    findByUser(userId) {
        return this.dokumenService.findByUser(userId);
    }
    reUpload(id, userId, file) {
        return this.dokumenService.reUpload(id, userId, file);
    }
    findAll() {
        return this.dokumenService.findAll();
    }
    verify(id, status, userId, rejectionReason) {
        return this.dokumenService.verify(id, status, userId, rejectionReason);
    }
    getPresignedUrl(id) {
        return this.dokumenService.getPresignedUrl(id);
    }
};
exports.DokumenController = DokumenController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.STUDENT),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)('documentType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", void 0)
], DokumenController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.STUDENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DokumenController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.STUDENT),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], DokumenController.prototype, "reUpload", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.VIEWER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DokumenController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id/verify'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(3, (0, common_1.Body)('rejectionReason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], DokumenController.prototype, "verify", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermission)(entities_1.PermissionLevel.VIEWER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DokumenController.prototype, "getPresignedUrl", null);
exports.DokumenController = DokumenController = __decorate([
    (0, common_1.Controller)('api/dokumen'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [dokumen_service_1.DokumenService])
], DokumenController);
//# sourceMappingURL=dokumen.controller.js.map
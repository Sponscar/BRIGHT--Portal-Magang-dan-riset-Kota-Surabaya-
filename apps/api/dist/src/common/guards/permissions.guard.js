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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const permissions_decorator_1 = require("../decorators/permissions.decorator");
const entities_1 = require("../../entities");
const PERMISSION_HIERARCHY = {
    [entities_1.PermissionLevel.VIEWER]: 1,
    [entities_1.PermissionLevel.EDITOR]: 2,
    [entities_1.PermissionLevel.ADMIN]: 3,
};
let PermissionsGuard = class PermissionsGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredPermissions = this.reflector.getAllAndOverride(permissions_decorator_1.PERMISSION_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            return false;
        }
        const userRole = user.role;
        const userPermission = entities_1.ROLE_PERMISSION_MAP[userRole];
        if (userPermission === entities_1.PermissionLevel.STUDENT) {
            return requiredPermissions.includes(entities_1.PermissionLevel.STUDENT);
        }
        const userLevel = PERMISSION_HIERARCHY[userPermission] || 0;
        return requiredPermissions.some((required) => {
            if (required === entities_1.PermissionLevel.STUDENT) {
                return false;
            }
            const requiredLevel = PERMISSION_HIERARCHY[required] || 0;
            return userLevel >= requiredLevel;
        });
    }
};
exports.PermissionsGuard = PermissionsGuard;
exports.PermissionsGuard = PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PermissionsGuard);
//# sourceMappingURL=permissions.guard.js.map
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/permissions.decorator';
import { PermissionLevel, ROLE_PERMISSION_MAP, UserRole } from '../../entities';

const PERMISSION_HIERARCHY: Record<string, number> = {
    [PermissionLevel.VIEWER]: 1,
    [PermissionLevel.EDITOR]: 2,
    [PermissionLevel.ADMIN]: 3,
};

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<PermissionLevel[]>(
            PERMISSION_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            return false;
        }

        const userRole = user.role as UserRole;
        const userPermission = ROLE_PERMISSION_MAP[userRole];

        // Student has a separate permission level, check directly
        if (userPermission === PermissionLevel.STUDENT) {
            return requiredPermissions.includes(PermissionLevel.STUDENT);
        }

        // For admin roles, check hierarchy: admin > editor > viewer
        const userLevel = PERMISSION_HIERARCHY[userPermission] || 0;

        return requiredPermissions.some((required) => {
            if (required === PermissionLevel.STUDENT) {
                return false; // Admin roles don't match student permission
            }
            const requiredLevel = PERMISSION_HIERARCHY[required] || 0;
            return userLevel >= requiredLevel;
        });
    }
}

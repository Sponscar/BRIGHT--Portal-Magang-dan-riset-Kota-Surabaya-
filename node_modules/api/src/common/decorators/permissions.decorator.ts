import { SetMetadata } from '@nestjs/common';
import { PermissionLevel } from '../../entities';

export const PERMISSION_KEY = 'permission';
export const RequirePermission = (...permissions: PermissionLevel[]) =>
    SetMetadata(PERMISSION_KEY, permissions);

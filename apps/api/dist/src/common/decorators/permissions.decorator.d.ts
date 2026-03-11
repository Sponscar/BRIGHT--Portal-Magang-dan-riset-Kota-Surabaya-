import { PermissionLevel } from '../../entities';
export declare const PERMISSION_KEY = "permission";
export declare const RequirePermission: (...permissions: PermissionLevel[]) => import("@nestjs/common").CustomDecorator<string>;

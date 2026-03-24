import type { Opd } from './opd.entity';
export declare enum UserRole {
    STUDENT = "student",
    ADMIN_OPD = "admin_opd",
    KOORDINATOR_OPD = "koordinator_opd",
    KEPALA_BRIDA = "kepala_brida",
    SEKRETARIATAN = "sekretariatan",
    KOORDINATOR_RISET = "koordinator_riset",
    KOORDINATOR_INOVASI = "koordinator_inovasi",
    KATIMJA_FASILITASI_RISET = "katimja_fasilitasi_riset",
    KATIMJA_KOLABORASI_RISET = "katimja_kolaborasi_riset",
    KATIMJA_APRESIASI_INOVASI = "katimja_apresiasi_inovasi",
    KATIMJA_DIFUSI_INOVASI = "katimja_difusi_inovasi",
    STAF_FUNGSIONAL = "staf_fungsional",
    STAF_PELAKSANA = "staf_pelaksana",
    STAF_NON_ASN = "staf_non_asn",
    ADMIN = "admin"
}
export declare enum PermissionLevel {
    STUDENT = "student",
    VIEWER = "viewer",
    EDITOR = "editor",
    ADMIN = "admin"
}
export declare const ROLE_PERMISSION_MAP: Record<UserRole, PermissionLevel>;
export declare class User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    opd?: Opd;
}

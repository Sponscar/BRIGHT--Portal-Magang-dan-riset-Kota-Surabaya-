import { Entity, PrimaryKey, Property, Enum, OneToOne, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { Opd } from './opd.entity';

export enum UserRole {
    STUDENT = 'student',
    ADMIN_OPD = 'admin_opd',
    KOORDINATOR_OPD = 'koordinator_opd',
    KEPALA_BRIDA = 'kepala_brida',
    SEKRETARIATAN = 'sekretariatan',
    KOORDINATOR_RISET = 'koordinator_riset',
    KOORDINATOR_INOVASI = 'koordinator_inovasi',
    KATIMJA_FASILITASI_RISET = 'katimja_fasilitasi_riset',
    KATIMJA_KOLABORASI_RISET = 'katimja_kolaborasi_riset',
    KATIMJA_APRESIASI_INOVASI = 'katimja_apresiasi_inovasi',
    KATIMJA_DIFUSI_INOVASI = 'katimja_difusi_inovasi',
    STAF_FUNGSIONAL = 'staf_fungsional',
    STAF_PELAKSANA = 'staf_pelaksana',
    STAF_NON_ASN = 'staf_non_asn',
    ADMIN = 'admin',
}

export enum PermissionLevel {
    STUDENT = 'student',
    VIEWER = 'viewer',
    EDITOR = 'editor',
    ADMIN = 'admin',
}

export const ROLE_PERMISSION_MAP: Record<UserRole, PermissionLevel> = {
    [UserRole.STUDENT]: PermissionLevel.STUDENT,
    [UserRole.ADMIN_OPD]: PermissionLevel.EDITOR,
    [UserRole.KOORDINATOR_OPD]: PermissionLevel.EDITOR,
    [UserRole.KEPALA_BRIDA]: PermissionLevel.EDITOR,
    [UserRole.SEKRETARIATAN]: PermissionLevel.EDITOR,
    [UserRole.KOORDINATOR_RISET]: PermissionLevel.EDITOR,
    [UserRole.KOORDINATOR_INOVASI]: PermissionLevel.EDITOR,
    [UserRole.KATIMJA_FASILITASI_RISET]: PermissionLevel.EDITOR,
    [UserRole.KATIMJA_KOLABORASI_RISET]: PermissionLevel.EDITOR,
    [UserRole.KATIMJA_APRESIASI_INOVASI]: PermissionLevel.EDITOR,
    [UserRole.KATIMJA_DIFUSI_INOVASI]: PermissionLevel.EDITOR,
    [UserRole.STAF_FUNGSIONAL]: PermissionLevel.EDITOR,
    [UserRole.STAF_PELAKSANA]: PermissionLevel.EDITOR,
    [UserRole.STAF_NON_ASN]: PermissionLevel.ADMIN,
    [UserRole.ADMIN]: PermissionLevel.ADMIN,
};

@Entity({ tableName: 'users' })
export class User {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @Property({ length: 255 })
    name!: string;

    @Property({ length: 255, unique: true })
    email!: string;

    @Property({ length: 255 })
    passwordHash!: string;

    @Enum({ items: () => UserRole, default: UserRole.STUDENT })
    role: UserRole = UserRole.STUDENT;

    @Property({ default: false })
    emailVerified: boolean = false;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @ManyToOne('Opd', { nullable: true, fieldName: 'opd_id' })
    opd?: Opd;
}

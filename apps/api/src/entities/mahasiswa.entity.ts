import { Entity, PrimaryKey, Property, Enum, ManyToOne, OneToMany, OneToOne, Collection } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from './user.entity';
import { TusiBrida } from './tusi-brida.entity';

export enum MahasiswaStatus {
    PENDING = 'pending',
    DOCUMENTS_UPLOADED = 'documents_uploaded',
    VERIFIED = 'verified',
    ACTIVE = 'active',
    COMPLETED = 'completed',
}

export enum InternshipType {
    MAGANG_KP = 'magang_kp',
    MAGANG_MBKM = 'magang_mbkm',
    MAGANG_MANDIRI = 'magang_mandiri',
}

@Entity({ tableName: 'mahasiswa' })
export class Mahasiswa {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @OneToOne(() => User, { fieldName: 'user_id', unique: true })
    user!: User;

    @Property({ length: 255 })
    fullName!: string;

    @Property({ length: 20, nullable: true })
    phone?: string;

    @Property({ length: 20, nullable: true })
    whatsapp?: string;

    @Property({ type: 'text', nullable: true })
    address?: string;

    // Alamat Domisili
    @Property({ length: 100, nullable: true })
    provinsi?: string;

    @Property({ length: 100, nullable: true })
    kotaKabupaten?: string;

    @Property({ length: 100, nullable: true })
    kecamatan?: string;

    @Property({ length: 100, nullable: true })
    kelurahan?: string;

    @Property({ type: 'text', nullable: true })
    alamatLengkap?: string;

    // Data Perguruan Tinggi
    @Property({ length: 255, nullable: true })
    university?: string;

    @Property({ length: 255, nullable: true })
    major?: string;

    @Property({ length: 500, nullable: true })
    universityAddress?: string;

    @Property({ length: 100, nullable: true })
    uniKelurahan?: string;

    @Property({ length: 100, nullable: true })
    uniKecamatan?: string;

    @Property({ length: 50, nullable: true })
    nik?: string;

    @Property({ length: 50, nullable: true })
    nim?: string;

    @Property({ nullable: true })
    semester?: number;

    @Enum({ items: () => InternshipType, nullable: true })
    internshipType?: InternshipType;

    @Property({ length: 50, nullable: true })
    internshipDuration?: string;

    @Property({ length: 50, nullable: true })
    conversionType?: string;

    @Property({ length: 500, nullable: true })
    perangkatDaerah?: string;

    @Property({ length: 500, nullable: true })
    profileImageUrl?: string;

    @Enum({ items: () => MahasiswaStatus, default: MahasiswaStatus.PENDING })
    status: MahasiswaStatus = MahasiswaStatus.PENDING;

    @ManyToOne(() => TusiBrida, { nullable: true, fieldName: 'tusi_brida_id' })
    tusiBrida?: TusiBrida;

    @ManyToOne(() => User, { nullable: true, fieldName: 'assigned_by' })
    assignedBy?: User;

    @Property({ type: 'timestamptz', nullable: true })
    tusiAssignedAt?: Date;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

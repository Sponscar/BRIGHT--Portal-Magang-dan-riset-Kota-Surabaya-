import { Entity, PrimaryKey, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';

export enum PresensiStatus {
    HADIR = 'hadir',
    IZIN = 'izin',
    SAKIT = 'sakit',
}

export enum ValidasiStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

@Entity({ tableName: 'presensi' })
export class Presensi {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @ManyToOne(() => Mahasiswa, { fieldName: 'mahasiswa_id' })
    mahasiswa!: Mahasiswa;

    @Property({ type: 'date' })
    tanggal!: Date;

    @Property({ length: 10, nullable: true })
    jamMasuk?: string;

    @Enum({ items: () => PresensiStatus })
    status!: PresensiStatus;

    @Property({ type: 'text', nullable: true })
    keterangan?: string;

    @Property({ length: 500, nullable: true })
    buktiUrl?: string;

    @Enum({ items: () => ValidasiStatus, default: ValidasiStatus.PENDING })
    statusValidasi: ValidasiStatus = ValidasiStatus.PENDING;

    @ManyToOne(() => User, { nullable: true, fieldName: 'validated_by' })
    validatedBy?: User;

    @Property({ type: 'timestamptz', nullable: true })
    validatedAt?: Date;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();
}

import { Entity, PrimaryKey, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Mahasiswa } from './mahasiswa.entity';
import type { JenisAktivitas } from './jenis-aktivitas.entity';
import type { MataKuliahKonversi } from './mata-kuliah-konversi.entity';
import { User } from './user.entity';

export enum LogbookStatus {
    DRAFT = 'draft',
    SUBMITTED = 'submitted',
    REVIEWED = 'reviewed',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export enum LogbookType {
    LAPORAN_HARIAN = 'Laporan Harian',
    JURNAL = 'Jurnal',
    DRAFT_JURNAL = 'Draft Jurnal',
}

@Entity({ tableName: 'logbook' })
export class Logbook {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @ManyToOne(() => Mahasiswa, { fieldName: 'mahasiswa_id' })
    mahasiswa!: Mahasiswa;

    @ManyToOne('JenisAktivitas', { nullable: true, fieldName: 'jenis_aktivitas_id' })
    jenisAktivitas?: JenisAktivitas;

    @ManyToOne('MataKuliahKonversi', { nullable: true, fieldName: 'mata_kuliah_id' })
    mataKuliah?: MataKuliahKonversi;

    @Enum({ items: () => LogbookType, nullable: true })
    type?: LogbookType;

    @Property({ type: 'date' })
    logDate!: Date;

    @Property({ length: 10, nullable: true })
    startTime?: string;

    @Property({ length: 10, nullable: true })
    endTime?: string;

    @Property({ length: 50, nullable: true })
    totalJamKerja?: string;

    @Property({ type: 'text' })
    description!: string;

    @Property({ type: 'text', nullable: true })
    pembelajaran?: string;

    @Property({ length: 255, nullable: true })
    lokasiNama?: string;

    @Property({ type: 'double precision', nullable: true })
    lokasiLat?: number;

    @Property({ type: 'double precision', nullable: true })
    lokasiLng?: number;

    @Property({ length: 500, nullable: true })
    attachmentUrl?: string;

    @Property({ length: 255, nullable: true })
    university?: string;

    @Property({ length: 255, nullable: true })
    major?: string;

    @Enum({ items: () => LogbookStatus, default: LogbookStatus.DRAFT })
    status: LogbookStatus = LogbookStatus.DRAFT;

    @ManyToOne(() => User, { nullable: true, fieldName: 'reviewed_by' })
    reviewedBy?: User;

    @Property({ type: 'timestamptz', nullable: true })
    reviewedAt?: Date;

    @Property({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

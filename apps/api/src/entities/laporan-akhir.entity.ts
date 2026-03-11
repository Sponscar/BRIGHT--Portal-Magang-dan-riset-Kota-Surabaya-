import { Entity, PrimaryKey, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';

export enum LaporanStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

@Entity({ tableName: 'laporan_akhir' })
export class LaporanAkhir {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @ManyToOne(() => Mahasiswa, { fieldName: 'mahasiswa_id' })
    mahasiswa!: Mahasiswa;

    @Property({ length: 255, nullable: true })
    title?: string;

    @Property({ length: 255 })
    fileName!: string;

    @Property({ length: 500 })
    fileUrl!: string;

    @Property({ nullable: true })
    fileSize?: number;

    @Enum({ items: () => LaporanStatus, default: LaporanStatus.PENDING })
    status: LaporanStatus = LaporanStatus.PENDING;

    @Property({ length: 500, nullable: true })
    rejectionReason?: string;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    submittedAt: Date = new Date();

    @ManyToOne(() => User, { nullable: true, fieldName: 'reviewed_by' })
    reviewedBy?: User;

    @Property({ type: 'timestamptz', nullable: true })
    reviewedAt?: Date;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();
}

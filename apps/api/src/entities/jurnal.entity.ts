import { Entity, PrimaryKey, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';

export enum JurnalStatus {
    DRAFT = 'draft',
    SUBMITTED = 'submitted',
    REVIEWED = 'reviewed',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

@Entity({ tableName: 'jurnal' })
export class Jurnal {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @ManyToOne(() => Mahasiswa, { fieldName: 'mahasiswa_id' })
    mahasiswa!: Mahasiswa;

    @Property({ length: 255 })
    title!: string;

    @Property({ type: 'text', nullable: true })
    content?: string;

    @Property({ length: 255, nullable: true })
    fileName?: string;

    @Property({ length: 500, nullable: true })
    fileUrl?: string;

    @Property({ nullable: true })
    fileSize?: number;

    @Enum({ items: () => JurnalStatus, default: JurnalStatus.DRAFT })
    status: JurnalStatus = JurnalStatus.DRAFT;

    @ManyToOne(() => User, { nullable: true, fieldName: 'reviewed_by' })
    reviewedBy?: User;

    @Property({ type: 'timestamptz', nullable: true })
    reviewedAt?: Date;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

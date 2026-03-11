import { Entity, PrimaryKey, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Mahasiswa } from './mahasiswa.entity';

export enum AdministrasiStatus {
    DRAFT = 'draft',
    SUBMITTED = 'submitted',
    VERIFIED = 'verified',
}

@Entity({ tableName: 'administrasi' })
export class Administrasi {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @ManyToOne(() => Mahasiswa, { fieldName: 'mahasiswa_id', unique: true })
    mahasiswa!: Mahasiswa;

    @Property({ default: false })
    needsReplyLetter: boolean = false;

    @Property({ type: 'text' })
    proposalDescription!: string;

    @Property({ type: 'text', nullable: true })
    topic?: string;

    @Property({ type: 'text', nullable: true })
    expectedResults?: string; // JSON array

    @Property({ default: false })
    hasCourseConversion: boolean = false;

    @Property()
    declaration!: boolean;

    @Enum({ items: () => AdministrasiStatus, default: AdministrasiStatus.DRAFT })
    status: AdministrasiStatus = AdministrasiStatus.DRAFT;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

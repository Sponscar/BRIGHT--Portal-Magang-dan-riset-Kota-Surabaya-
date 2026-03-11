import { Entity, PrimaryKey, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';

export enum DocumentType {
    SURAT_PENGANTAR = 'surat_pengantar',
    PROPOSAL = 'proposal',
    KTP = 'ktp',
    KTM = 'ktm',
    CV = 'cv',
    SURAT_PERNYATAAN = 'surat_pernyataan',
}

export enum DocumentStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

@Entity({ tableName: 'dokumen' })
export class Dokumen {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @ManyToOne(() => Mahasiswa, { fieldName: 'mahasiswa_id' })
    mahasiswa!: Mahasiswa;

    @Enum({ items: () => DocumentType })
    documentType!: DocumentType;

    @Property({ length: 255 })
    fileName!: string;

    @Property({ length: 500 })
    fileUrl!: string;

    @Property({ nullable: true })
    fileSize?: number;

    @Enum({ items: () => DocumentStatus, default: DocumentStatus.PENDING })
    status: DocumentStatus = DocumentStatus.PENDING;

    @Property({ length: 500, nullable: true })
    rejectionReason?: string;

    @ManyToOne(() => User, { nullable: true, fieldName: 'verified_by' })
    verifiedBy?: User;

    @Property({ type: 'timestamptz', nullable: true })
    verifiedAt?: Date;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

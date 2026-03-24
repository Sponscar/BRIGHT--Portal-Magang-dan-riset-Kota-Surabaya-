import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection, Enum, Unique, type Ref } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';
import type { NilaiPenilaian } from './nilai-penilaian.entity';

export enum AssessorType {
    SELF = 'self',
    PEER = 'peer',
    KOORDINATOR = 'koordinator',
    ADMIN_OPD = 'admin_opd',
    KOORDINATOR_OPD = 'koordinator_opd',
    SEKRETARIS = 'sekretaris',
    KEPALA_BRIDA = 'kepala_brida',
    ADMIN = 'admin',
}

export enum PenilaianComponent {
    PERILAKU = 'perilaku',
    KINERJA = 'kinerja',
}

@Entity({ tableName: 'penilaian' })
@Unique({ properties: ['mahasiswa', 'assessedBy', 'assessorType', 'component'] })
export class Penilaian {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @ManyToOne(() => Mahasiswa, { fieldName: 'mahasiswa_id' })
    mahasiswa!: Mahasiswa;

    @ManyToOne(() => User, { fieldName: 'assessed_by' })
    assessedBy!: User;

    @Enum({ items: () => AssessorType })
    assessorType!: AssessorType;

    @Enum({ items: () => PenilaianComponent })
    component!: PenilaianComponent;

    @ManyToOne(() => Mahasiswa, { nullable: true, fieldName: 'peer_mahasiswa_id' })
    peerMahasiswa?: Mahasiswa;

    @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    finalScore?: number;

    @Property({ type: 'text', nullable: true })
    feedback?: string;

    @OneToMany('NilaiPenilaian', 'penilaian')
    nilaiList = new Collection<NilaiPenilaian>(this);

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

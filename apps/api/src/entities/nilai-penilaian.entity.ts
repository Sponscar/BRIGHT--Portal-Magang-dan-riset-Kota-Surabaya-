import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Penilaian } from './penilaian.entity';
import { KriteriaPenilaian } from './kriteria-penilaian.entity';

@Entity({ tableName: 'nilai_penilaian' })
export class NilaiPenilaian {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @ManyToOne(() => Penilaian, { fieldName: 'penilaian_id' })
    penilaian!: Penilaian;

    @ManyToOne(() => KriteriaPenilaian, { fieldName: 'kriteria_id' })
    kriteria!: KriteriaPenilaian;

    @Property()
    score!: number; // 1-100

    @Property({ type: 'text', nullable: true })
    keterangan?: string;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();
}

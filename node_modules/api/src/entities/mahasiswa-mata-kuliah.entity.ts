import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Mahasiswa } from './mahasiswa.entity';
import { MataKuliahKonversi } from './mata-kuliah-konversi.entity';

@Entity({ tableName: 'mahasiswa_mata_kuliah' })
@Unique({ properties: ['mahasiswa', 'mataKuliah'] })
export class MahasiswaMataKuliah {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @ManyToOne(() => Mahasiswa, { fieldName: 'mahasiswa_id' })
    mahasiswa!: Mahasiswa;

    @ManyToOne(() => MataKuliahKonversi, { fieldName: 'mata_kuliah_id' })
    mataKuliah!: MataKuliahKonversi;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();
}

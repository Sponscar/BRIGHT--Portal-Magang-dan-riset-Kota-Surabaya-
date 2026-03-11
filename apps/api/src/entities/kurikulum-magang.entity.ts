import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Mahasiswa } from './mahasiswa.entity';

@Entity({ tableName: 'kurikulum_magang' })
export class KurikulumMagang {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @ManyToOne(() => Mahasiswa, { fieldName: 'mahasiswa_id' })
    mahasiswa!: Mahasiswa;

    @Property({ type: 'text' })
    materi!: string;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Mahasiswa } from './mahasiswa.entity';

@Entity({ tableName: 'nilai_akhir' })
export class NilaiAkhir {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @OneToOne(() => Mahasiswa, { fieldName: 'mahasiswa_id', unique: true })
    mahasiswa!: Mahasiswa;

    @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    nilaiPerilaku?: number;

    @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    nilaiPerilakuFinal?: number;

    @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    nilaiKinerja?: number;

    @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    nilaiKinerjaFinal?: number;

    @Property({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    nilaiAkhir?: number;

    @Property({ length: 2, nullable: true })
    grade?: string;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

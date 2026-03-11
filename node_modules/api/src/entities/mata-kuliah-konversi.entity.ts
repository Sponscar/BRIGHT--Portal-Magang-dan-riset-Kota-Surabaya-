import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'mata_kuliah_konversi' })
export class MataKuliahKonversi {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @Property({ length: 255, unique: true })
    name!: string;

    @Property({ type: 'text', nullable: true })
    description?: string;

    @Property({ default: true })
    isActive: boolean = true;

    @Property({ nullable: true })
    displayOrder?: number;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();
}

import { Entity, PrimaryKey, Property, Enum } from '@mikro-orm/core';
import { v4 } from 'uuid';

export enum PenilaianCategory {
    BEHAVIOR = 'behavior',
    PERFORMANCE = 'performance',
}

@Entity({ tableName: 'kriteria_penilaian' })
export class KriteriaPenilaian {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @Property({ length: 100, unique: true })
    name!: string;

    @Enum({ items: () => PenilaianCategory })
    category!: PenilaianCategory;

    @Property()
    bobot!: number;

    @Property({ type: 'text', nullable: true })
    description?: string;

    @Property({ default: true })
    isActive: boolean = true;

    @Property({ nullable: true })
    displayOrder?: number;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();
}

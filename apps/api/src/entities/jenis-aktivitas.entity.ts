import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'jenis_aktivitas' })
export class JenisAktivitas {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @Property({ length: 200, unique: true })
    name!: string;

    @Property({ type: 'text', nullable: true })
    description?: string;

    @Property({ length: 50, nullable: true })
    category?: string;

    @Property({ default: true })
    isActive: boolean = true;

    @Property({ nullable: true })
    displayOrder?: number;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();
}

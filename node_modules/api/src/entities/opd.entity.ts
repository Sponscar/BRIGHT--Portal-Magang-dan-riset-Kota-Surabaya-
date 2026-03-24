import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'opd' })
export class Opd {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @Property({ length: 255, unique: true })
    nama!: string;

    @Property({ length: 255, unique: true })
    slug!: string;

    @Property({ type: 'text', nullable: true })
    alamat?: string;

    @Property({ length: 50, nullable: true })
    telp?: string;

    @Property({ length: 255, nullable: true })
    email?: string;

    @Property({ default: true })
    isActive: boolean = true;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

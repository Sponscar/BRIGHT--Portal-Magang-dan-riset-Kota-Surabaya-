import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { Opd } from './opd.entity';

@Entity({ tableName: 'tim_lokus' })
export class TimLokus {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @Property({ length: 100 })
    name!: string;

    @Property({ length: 100 })
    slug!: string;

    @Property({ type: 'text', nullable: true })
    shortDescription?: string;

    @Property({ type: 'text', nullable: true })
    fullDescription?: string;

    @Property({ length: 50, nullable: true })
    icon?: string;

    @Property({ length: 500, nullable: true })
    imageUrl?: string;

    @Property({ type: 'text', nullable: true })
    responsibilities?: string;

    @Property({ type: 'text', nullable: true })
    requirements?: string;

    @Property({ default: true })
    isActive: boolean = true;

    @Property({ nullable: true })
    displayOrder?: number;

    @ManyToOne('Opd', { nullable: true, fieldName: 'opd_id' })
    opd?: Opd;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'tusi_brida' })
export class TusiBrida {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @Property({ length: 100, unique: true })
    name!: string;

    @Property({ length: 100, unique: true })
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

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

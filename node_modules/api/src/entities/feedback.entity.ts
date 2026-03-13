import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'feedback' })
export class Feedback {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @Property({ length: 200 })
    nama!: string;

    @Property({ length: 200 })
    email!: string;

    @Property({ type: 'smallint' })
    rating!: number; // 1-5

    @Property({ type: 'text', nullable: true })
    komentar?: string;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();
}

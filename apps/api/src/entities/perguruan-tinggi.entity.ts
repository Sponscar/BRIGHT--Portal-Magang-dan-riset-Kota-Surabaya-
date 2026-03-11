import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'master_perguruan_tinggi' })
export class PerguruanTinggi {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @Property({ length: 255 })
    nama!: string;

    @Property({ length: 500 })
    alamat!: string;

    @Property({ length: 100 })
    kelurahan!: string;

    @Property({ length: 100 })
    kecamatan!: string;

    @Property({ default: true })
    isActive: boolean = true;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}

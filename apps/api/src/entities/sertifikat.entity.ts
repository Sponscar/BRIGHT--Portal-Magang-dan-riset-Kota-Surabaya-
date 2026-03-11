import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';

@Entity({ tableName: 'sertifikat' })
export class Sertifikat {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @ManyToOne(() => Mahasiswa, { fieldName: 'mahasiswa_id' })
    mahasiswa!: Mahasiswa;

    @Property({ length: 100, unique: true })
    nomorSertifikat!: string;

    @Property({ length: 255 })
    studentName!: string;

    @Property({ type: 'date' })
    startDate!: Date;

    @Property({ type: 'date' })
    endDate!: Date;

    @ManyToOne(() => User, { fieldName: 'issued_by' })
    issuedBy!: User;

    @Property({ type: 'date' })
    tanggalTerbit!: Date;

    @Property({ type: 'timestamptz', defaultRaw: 'NOW()' })
    createdAt: Date = new Date();
}

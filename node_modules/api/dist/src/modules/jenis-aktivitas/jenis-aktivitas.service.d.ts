import { EntityManager } from '@mikro-orm/postgresql';
import { JenisAktivitas } from '../../entities';
export declare class JenisAktivitasService {
    private readonly em;
    constructor(em: EntityManager);
    findAll(): Promise<import("@mikro-orm/postgresql").Loaded<JenisAktivitas, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    create(data: Partial<JenisAktivitas>): Promise<JenisAktivitas>;
    update(id: string, data: Partial<JenisAktivitas>): Promise<import("@mikro-orm/postgresql").Loaded<JenisAktivitas, never, "*", never>>;
    delete(id: string): Promise<{
        message: string;
    }>;
}

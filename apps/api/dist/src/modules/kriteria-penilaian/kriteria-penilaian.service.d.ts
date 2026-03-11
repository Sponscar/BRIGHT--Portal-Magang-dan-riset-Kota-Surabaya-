import { EntityManager } from '@mikro-orm/postgresql';
import { KriteriaPenilaian } from '../../entities';
export declare class KriteriaPenilaianService {
    private readonly em;
    constructor(em: EntityManager);
    findAll(): Promise<import("@mikro-orm/postgresql").Loaded<KriteriaPenilaian, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    create(data: Partial<KriteriaPenilaian>): Promise<KriteriaPenilaian>;
    update(id: string, data: Partial<KriteriaPenilaian>): Promise<import("@mikro-orm/postgresql").Loaded<KriteriaPenilaian, never, "*", never>>;
    delete(id: string): Promise<{
        message: string;
    }>;
}

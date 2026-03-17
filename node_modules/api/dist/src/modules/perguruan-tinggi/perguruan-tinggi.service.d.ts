import { EntityManager } from '@mikro-orm/postgresql';
import { PerguruanTinggi } from '../../entities';
export declare class PerguruanTinggiService {
    private readonly em;
    constructor(em: EntityManager);
    findAll(search?: string): Promise<import("@mikro-orm/postgresql").Loaded<PerguruanTinggi, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    create(data: Partial<PerguruanTinggi>): Promise<PerguruanTinggi>;
    update(id: string, data: Partial<PerguruanTinggi>): Promise<import("@mikro-orm/postgresql").Loaded<PerguruanTinggi, never, "*", never>>;
    delete(id: string): Promise<{
        message: string;
    }>;
}

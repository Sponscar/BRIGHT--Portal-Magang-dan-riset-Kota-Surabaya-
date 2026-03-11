import { EntityManager } from '@mikro-orm/postgresql';
import { TusiBrida } from '../../entities';
export declare class TusiBridaService {
    private readonly em;
    constructor(em: EntityManager);
    create(data: Partial<TusiBrida>): Promise<TusiBrida>;
    findAll(): Promise<import("@mikro-orm/postgresql").Loaded<TusiBrida, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    findBySlug(slug: string): Promise<import("@mikro-orm/postgresql").Loaded<TusiBrida, never, "*", never>>;
    update(id: string, data: Partial<TusiBrida>): Promise<import("@mikro-orm/postgresql").Loaded<TusiBrida, never, "*", never>>;
    toggle(id: string): Promise<import("@mikro-orm/postgresql").Loaded<TusiBrida, never, "*", never>>;
}

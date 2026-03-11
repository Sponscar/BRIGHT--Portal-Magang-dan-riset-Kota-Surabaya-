import { EntityManager } from '@mikro-orm/postgresql';
import { Administrasi } from '../../entities';
export declare class AdministrasiService {
    private readonly em;
    constructor(em: EntityManager);
    create(userId: string, data: Partial<Administrasi>): Promise<Administrasi>;
    findByUser(userId: string): Promise<import("@mikro-orm/postgresql").Loaded<Administrasi, never, "*", never> | null>;
    update(userId: string, data: Partial<Administrasi>): Promise<import("@mikro-orm/postgresql").Loaded<Administrasi, never, "*", never>>;
    findAll(): Promise<import("@mikro-orm/postgresql").Loaded<Administrasi, "mahasiswa" | "mahasiswa.user", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    findById(id: string): Promise<import("@mikro-orm/postgresql").Loaded<Administrasi, "mahasiswa" | "mahasiswa.user", "*", never>>;
}

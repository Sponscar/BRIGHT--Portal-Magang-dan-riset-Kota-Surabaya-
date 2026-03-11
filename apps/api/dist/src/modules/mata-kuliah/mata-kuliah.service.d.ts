import { EntityManager } from '@mikro-orm/postgresql';
import { MataKuliahKonversi, MahasiswaMataKuliah } from '../../entities';
export declare class MataKuliahService {
    private readonly em;
    constructor(em: EntityManager);
    findAll(): Promise<import("@mikro-orm/postgresql").Loaded<MataKuliahKonversi, never, import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    create(data: Partial<MataKuliahKonversi>): Promise<MataKuliahKonversi>;
    assign(userId: string, mataKuliahIds: string[]): Promise<{
        message: string;
    }>;
    findByUser(userId: string): Promise<import("@mikro-orm/postgresql").Loaded<MahasiswaMataKuliah, "mataKuliah", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
}

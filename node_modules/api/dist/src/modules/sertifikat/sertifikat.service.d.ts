import { EntityManager } from '@mikro-orm/postgresql';
import { Sertifikat } from '../../entities';
export declare class SertifikatService {
    private readonly em;
    constructor(em: EntityManager);
    generate(issuedByUserId: string, data: {
        mahasiswaId: string;
        startDate: string;
        endDate: string;
    }): Promise<Sertifikat>;
    findAll(): Promise<import("@mikro-orm/postgresql").Loaded<Sertifikat, "mahasiswa" | "mahasiswa.user" | "issuedBy", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
    findById(id: string): Promise<import("@mikro-orm/postgresql").Loaded<Sertifikat, "mahasiswa" | "mahasiswa.user" | "issuedBy", "*", never>>;
    findByUser(userId: string): Promise<import("@mikro-orm/postgresql").Loaded<Sertifikat, "issuedBy", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[]>;
}

import { SertifikatService } from './sertifikat.service';
export declare class SertifikatController {
    private readonly svc;
    constructor(svc: SertifikatService);
    generate(uid: string, d: any): Promise<import("../../entities").Sertifikat>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Sertifikat, "mahasiswa" | "mahasiswa.user" | "issuedBy", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    findMine(uid: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Sertifikat, "issuedBy", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    findById(id: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Sertifikat, "mahasiswa" | "mahasiswa.user" | "issuedBy", "*", never>>;
}

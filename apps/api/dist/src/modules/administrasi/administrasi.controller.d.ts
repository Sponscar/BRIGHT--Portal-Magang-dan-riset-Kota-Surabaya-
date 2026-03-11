import { AdministrasiService } from './administrasi.service';
export declare class AdministrasiController {
    private readonly svc;
    constructor(svc: AdministrasiService);
    create(uid: string, d: any): Promise<import("../../entities").Administrasi>;
    findMine(uid: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Administrasi, never, "*", never> | null>;
    update(uid: string, d: any): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Administrasi, never, "*", never>>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Administrasi, "mahasiswa" | "mahasiswa.user", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    findById(id: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Administrasi, "mahasiswa" | "mahasiswa.user", "*", never>>;
}

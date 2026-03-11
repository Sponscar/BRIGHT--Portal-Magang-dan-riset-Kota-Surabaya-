import { MataKuliahService } from './mata-kuliah.service';
export declare class MataKuliahController {
    private readonly svc;
    constructor(svc: MataKuliahService);
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../entities").MataKuliahKonversi, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    create(d: any): Promise<import("../../entities").MataKuliahKonversi>;
    assign(uid: string, ids: string[]): Promise<{
        message: string;
    }>;
    findMine(uid: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").MahasiswaMataKuliah, "mataKuliah", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
}

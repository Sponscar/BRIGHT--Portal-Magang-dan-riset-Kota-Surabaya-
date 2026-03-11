import { KriteriaPenilaianService } from './kriteria-penilaian.service';
export declare class KriteriaPenilaianController {
    private readonly svc;
    constructor(svc: KriteriaPenilaianService);
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../entities").KriteriaPenilaian, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    create(d: any): Promise<import("../../entities").KriteriaPenilaian>;
    update(id: string, d: any): Promise<import("@mikro-orm/core").Loaded<import("../../entities").KriteriaPenilaian, never, "*", never>>;
    delete(id: string): Promise<{
        message: string;
    }>;
}

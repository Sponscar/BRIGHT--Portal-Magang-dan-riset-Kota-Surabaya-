import { KurikulumMagangService } from './kurikulum-magang.service';
export declare class KurikulumMagangController {
    private readonly kurikulumMagangService;
    constructor(kurikulumMagangService: KurikulumMagangService);
    create(body: {
        mahasiswaId: string;
        materi: string;
    }): Promise<import("../../entities").KurikulumMagang>;
    findAll(): Promise<import("../../entities").KurikulumMagang[]>;
    findByMahasiswa(mahasiswaId: string): Promise<import("../../entities").KurikulumMagang[]>;
    delete(id: string): Promise<{
        message: string;
    }>;
}

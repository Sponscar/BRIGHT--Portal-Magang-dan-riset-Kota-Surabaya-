import { JenisAktivitasService } from './jenis-aktivitas.service';
export declare class JenisAktivitasController {
    private readonly svc;
    constructor(svc: JenisAktivitasService);
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../entities").JenisAktivitas, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    create(data: any): Promise<import("../../entities").JenisAktivitas>;
    update(id: string, data: any): Promise<import("@mikro-orm/core").Loaded<import("../../entities").JenisAktivitas, never, "*", never>>;
    delete(id: string): Promise<{
        message: string;
    }>;
}

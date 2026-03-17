import { PerguruanTinggiService } from './perguruan-tinggi.service';
export declare class PerguruanTinggiController {
    private readonly svc;
    constructor(svc: PerguruanTinggiService);
    findAll(search?: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").PerguruanTinggi, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    create(d: any): Promise<import("../../entities").PerguruanTinggi>;
    update(id: string, d: any): Promise<import("@mikro-orm/core").Loaded<import("../../entities").PerguruanTinggi, never, "*", never>>;
    delete(id: string): Promise<{
        message: string;
    }>;
}

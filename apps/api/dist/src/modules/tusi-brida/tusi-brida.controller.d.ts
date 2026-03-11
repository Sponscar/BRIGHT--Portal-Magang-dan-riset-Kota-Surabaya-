import { TusiBridaService } from './tusi-brida.service';
export declare class TusiBridaController {
    private readonly tusiBridaService;
    constructor(tusiBridaService: TusiBridaService);
    create(data: any): Promise<import("../../entities").TusiBrida>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../entities").TusiBrida, never, import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    findBySlug(slug: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").TusiBrida, never, "*", never>>;
    update(id: string, data: any): Promise<import("@mikro-orm/core").Loaded<import("../../entities").TusiBrida, never, "*", never>>;
    toggle(id: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").TusiBrida, never, "*", never>>;
}

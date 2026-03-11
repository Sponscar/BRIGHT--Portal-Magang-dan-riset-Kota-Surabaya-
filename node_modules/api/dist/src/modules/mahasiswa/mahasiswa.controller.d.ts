import { MahasiswaService } from './mahasiswa.service';
import { MahasiswaStatus } from '../../entities';
export declare class MahasiswaController {
    private readonly mahasiswaService;
    constructor(mahasiswaService: MahasiswaService);
    getProfile(userId: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Mahasiswa, "user" | "tusiBrida", "*", never>>;
    updateProfile(userId: string, data: any): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Mahasiswa, never, "*", never>>;
    uploadProfileImage(userId: string, file: Express.Multer.File): Promise<{
        profileImageUrl: string;
    }>;
    findAll(status?: MahasiswaStatus): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Mahasiswa, "user" | "tusiBrida", import("@mikro-orm/core").PopulatePath.ALL, never>[]>;
    findById(id: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Mahasiswa, "user" | "tusiBrida", "*", never>>;
    updateStatus(id: string, status: MahasiswaStatus): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Mahasiswa, never, "*", never>>;
    assignTusi(id: string, tusiId: string, userId: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").Mahasiswa, never, "*", never>>;
}

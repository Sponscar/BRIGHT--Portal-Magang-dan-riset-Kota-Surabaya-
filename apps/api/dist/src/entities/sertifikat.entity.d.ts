import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';
export declare class Sertifikat {
    id: string;
    mahasiswa: Mahasiswa;
    studentName: string;
    startDate: Date;
    endDate: Date;
    issuedBy: User;
    tanggalTerbit: Date;
    createdAt: Date;
}

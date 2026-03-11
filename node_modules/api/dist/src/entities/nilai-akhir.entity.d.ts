import { Mahasiswa } from './mahasiswa.entity';
export declare class NilaiAkhir {
    id: string;
    mahasiswa: Mahasiswa;
    nilaiPerilaku?: number;
    nilaiPerilakuFinal?: number;
    nilaiKinerja?: number;
    nilaiKinerjaFinal?: number;
    nilaiAkhir?: number;
    grade?: string;
    createdAt: Date;
    updatedAt: Date;
}

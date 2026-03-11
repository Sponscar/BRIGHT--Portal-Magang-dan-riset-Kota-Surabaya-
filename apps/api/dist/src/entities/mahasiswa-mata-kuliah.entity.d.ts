import { Mahasiswa } from './mahasiswa.entity';
import { MataKuliahKonversi } from './mata-kuliah-konversi.entity';
export declare class MahasiswaMataKuliah {
    id: string;
    mahasiswa: Mahasiswa;
    mataKuliah: MataKuliahKonversi;
    createdAt: Date;
}

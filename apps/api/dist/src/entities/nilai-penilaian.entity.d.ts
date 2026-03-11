import { Penilaian } from './penilaian.entity';
import { KriteriaPenilaian } from './kriteria-penilaian.entity';
export declare class NilaiPenilaian {
    id: string;
    penilaian: Penilaian;
    kriteria: KriteriaPenilaian;
    score: number;
    keterangan?: string;
    createdAt: Date;
}

import { Collection } from '@mikro-orm/core';
import { Mahasiswa } from './mahasiswa.entity';
import { User } from './user.entity';
import type { NilaiPenilaian } from './nilai-penilaian.entity';
export declare enum AssessorType {
    SELF = "self",
    PEER = "peer",
    KOORDINATOR = "koordinator",
    ADMIN_OPD = "admin_opd",
    KOORDINATOR_OPD = "koordinator_opd",
    SEKRETARIS = "sekretaris",
    KEPALA_BRIDA = "kepala_brida",
    ADMIN = "admin"
}
export declare enum PenilaianComponent {
    PERILAKU = "perilaku",
    KINERJA = "kinerja"
}
export declare class Penilaian {
    id: string;
    mahasiswa: Mahasiswa;
    assessedBy: User;
    assessorType: AssessorType;
    component: PenilaianComponent;
    peerMahasiswa?: Mahasiswa;
    finalScore?: number;
    feedback?: string;
    nilaiList: Collection<NilaiPenilaian, object>;
    createdAt: Date;
    updatedAt: Date;
}

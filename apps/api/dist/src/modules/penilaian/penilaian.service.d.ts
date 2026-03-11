import { EntityManager } from '@mikro-orm/postgresql';
import { Penilaian, Mahasiswa, NilaiAkhir, UserRole } from '../../entities';
export declare class PenilaianService {
    private readonly em;
    constructor(em: EntityManager);
    submitSelfAssessment(userId: string, data: {
        scores: {
            kriteriaId: string;
            score: number;
            keterangan?: string;
        }[];
        feedback?: string;
    }): Promise<Penilaian>;
    submitPeerAssessment(userId: string, data: {
        mahasiswaId: string;
        scores: {
            kriteriaId: string;
            score: number;
            keterangan?: string;
        }[];
        feedback?: string;
    }): Promise<Penilaian>;
    submitStaffAssessment(userId: string, userRole: UserRole, data: {
        mahasiswaId: string;
        perilaku: {
            scores: {
                kriteriaId: string;
                score: number;
                keterangan?: string;
            }[];
            feedback?: string;
        };
        kinerja: {
            scores: {
                kriteriaId: string;
                score: number;
                keterangan?: string;
            }[];
            feedback?: string;
        };
    }): Promise<{
        perilaku: Penilaian;
        kinerja: Penilaian;
    }>;
    calculateFinalScore(mahasiswaId: string): Promise<import("@mikro-orm/postgresql").Loaded<NilaiAkhir, never, "*", never>>;
    getScoreSummary(mahasiswaId: string): Promise<{
        penilaianList: import("@mikro-orm/postgresql").Loaded<Penilaian, "assessedBy" | "nilaiList" | "nilaiList.kriteria", import("@mikro-orm/postgresql").PopulatePath.ALL, never>[];
        nilaiAkhir: import("@mikro-orm/postgresql").Loaded<NilaiAkhir, never, "*", never> | null;
        status: Record<string, boolean>;
    }>;
    getPeersForAssessment(userId: string): Promise<{
        id: string;
        fullName: string;
        university: string | undefined;
        major: string | undefined;
        alreadyAssessed: boolean;
    }[]>;
    getMyResults(userId: string): Promise<{
        nilaiAkhir: import("@mikro-orm/postgresql").Loaded<NilaiAkhir, never, "*", never> | null;
        behaviorData: {
            id: string;
            name: string;
            nilai: string;
            keterangan: string;
        }[];
        performanceData: {
            id: string;
            name: string;
            nilai: string;
            keterangan: string;
        }[];
        hasSelfAssessment: boolean;
        selfAssessmentScores: {
            kriteriaId: string;
            kriteriaName: string;
            score: number;
            keterangan: string | undefined;
        }[] | null;
    }>;
    findAll(): Promise<{
        mahasiswa: import("@mikro-orm/postgresql").Loaded<Mahasiswa, "user" | "tusiBrida", import("@mikro-orm/postgresql").PopulatePath.ALL, never>;
        nilaiAkhir: import("@mikro-orm/postgresql").Loaded<NilaiAkhir, never, "*", never> | null;
        penilaianCount: number;
        assessmentStatus: Record<string, boolean>;
    }[]>;
    private savePenilaian;
    private buildCriteriaView;
}

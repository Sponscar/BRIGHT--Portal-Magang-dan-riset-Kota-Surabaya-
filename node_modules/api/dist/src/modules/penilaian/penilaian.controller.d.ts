import { PenilaianService } from './penilaian.service';
export declare class PenilaianController {
    private readonly svc;
    constructor(svc: PenilaianService);
    submitSelfAssessment(userId: string, data: {
        scores: {
            kriteriaId: string;
            score: number;
            keterangan?: string;
        }[];
        feedback?: string;
    }): Promise<import("../../entities").Penilaian>;
    submitPeerAssessment(userId: string, data: {
        mahasiswaId: string;
        scores: {
            kriteriaId: string;
            score: number;
            keterangan?: string;
        }[];
        feedback?: string;
    }): Promise<import("../../entities").Penilaian>;
    getPeers(userId: string): Promise<{
        id: string;
        fullName: string;
        university: string | undefined;
        major: string | undefined;
        alreadyAssessed: boolean;
    }[]>;
    getMyResults(userId: string): Promise<{
        nilaiAkhir: import("@mikro-orm/core").Loaded<import("../../entities").NilaiAkhir, never, "*", never> | null;
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
    submitStaffAssessment(userId: string, role: string, data: {
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
        perilaku: import("../../entities").Penilaian;
        kinerja: import("../../entities").Penilaian;
    }>;
    calculateFinalScore(mahasiswaId: string): Promise<import("@mikro-orm/core").Loaded<import("../../entities").NilaiAkhir, never, "*", never>>;
    getScoreSummary(mahasiswaId: string): Promise<{
        penilaianList: import("@mikro-orm/core").Loaded<import("../../entities").Penilaian, "assessedBy" | "nilaiList" | "nilaiList.kriteria", import("@mikro-orm/core").PopulatePath.ALL, never>[];
        nilaiAkhir: import("@mikro-orm/core").Loaded<import("../../entities").NilaiAkhir, never, "*", never> | null;
        status: Record<string, boolean>;
    }>;
    findAll(): Promise<{
        mahasiswa: import("@mikro-orm/core").Loaded<import("../../entities").Mahasiswa, "user" | "tusiBrida", import("@mikro-orm/core").PopulatePath.ALL, never>;
        nilaiAkhir: import("@mikro-orm/core").Loaded<import("../../entities").NilaiAkhir, never, "*", never> | null;
        penilaianCount: number;
        assessmentStatus: Record<string, boolean>;
    }[]>;
}

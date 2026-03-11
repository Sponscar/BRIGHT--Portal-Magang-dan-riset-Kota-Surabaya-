export declare enum PenilaianCategory {
    BEHAVIOR = "behavior",
    PERFORMANCE = "performance"
}
export declare class KriteriaPenilaian {
    id: string;
    name: string;
    category: PenilaianCategory;
    bobot: number;
    description?: string;
    isActive: boolean;
    displayOrder?: number;
    createdAt: Date;
}

import type { Opd } from './opd.entity';
export declare class TimLokus {
    id: string;
    name: string;
    slug: string;
    shortDescription?: string;
    fullDescription?: string;
    icon?: string;
    imageUrl?: string;
    responsibilities?: string;
    requirements?: string;
    isActive: boolean;
    displayOrder?: number;
    opd?: Opd;
    createdAt: Date;
    updatedAt: Date;
}

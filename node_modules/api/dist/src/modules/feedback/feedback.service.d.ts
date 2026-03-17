import { EntityManager } from '@mikro-orm/postgresql';
import { Feedback } from '../../entities';
export declare class FeedbackService {
    private readonly em;
    constructor(em: EntityManager);
    create(data: {
        nama: string;
        email: string;
        rating: number;
        komentar?: string;
    }): Promise<Feedback>;
    getResults(): Promise<{
        averageRating: number;
        totalResponden: number;
        distribution: Record<number, number>;
        recentFeedback: {
            id: string;
            nama: string;
            rating: number;
            komentar: string | undefined;
            createdAt: Date;
        }[];
    }>;
}

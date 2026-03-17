import { FeedbackService } from './feedback.service';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    create(data: {
        nama: string;
        email: string;
        rating: number;
        komentar?: string;
    }): Promise<import("../../entities").Feedback>;
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

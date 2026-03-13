import { Injectable, BadRequestException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Feedback } from '../../entities';

@Injectable()
export class FeedbackService {
    constructor(private readonly em: EntityManager) {}

    async create(data: { nama: string; email: string; rating: number; komentar?: string }) {
        if (!data.nama || !data.email || !data.rating) {
            throw new BadRequestException('Nama, email, dan rating wajib diisi');
        }
        if (data.rating < 1 || data.rating > 5) {
            throw new BadRequestException('Rating harus antara 1 sampai 5');
        }

        const fork = this.em.fork();
        const feedback = new Feedback();
        feedback.nama = data.nama;
        feedback.email = data.email;
        feedback.rating = data.rating;
        feedback.komentar = data.komentar;
        fork.persist(feedback);
        await fork.flush();
        return feedback;
    }

    async getResults() {
        const fork = this.em.fork();
        const allFeedback = await fork.find(Feedback, {}, { orderBy: { createdAt: 'DESC' } });

        const total = allFeedback.length;
        if (total === 0) {
            return {
                averageRating: 0,
                totalResponden: 0,
                distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
                recentFeedback: [],
            };
        }

        const sum = allFeedback.reduce((acc, f) => acc + f.rating, 0);
        const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        allFeedback.forEach((f) => {
            distribution[f.rating] = (distribution[f.rating] || 0) + 1;
        });

        return {
            averageRating: parseFloat((sum / total).toFixed(2)),
            totalResponden: total,
            distribution,
            recentFeedback: allFeedback.slice(0, 10).map((f) => ({
                id: f.id,
                nama: f.nama,
                rating: f.rating,
                komentar: f.komentar,
                createdAt: f.createdAt,
            })),
        };
    }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
let FeedbackService = class FeedbackService {
    em;
    constructor(em) {
        this.em = em;
    }
    async create(data) {
        if (!data.nama || !data.email || !data.rating) {
            throw new common_1.BadRequestException('Nama, email, dan rating wajib diisi');
        }
        if (data.rating < 1 || data.rating > 5) {
            throw new common_1.BadRequestException('Rating harus antara 1 sampai 5');
        }
        const fork = this.em.fork();
        const feedback = new entities_1.Feedback();
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
        const allFeedback = await fork.find(entities_1.Feedback, {}, { orderBy: { createdAt: 'DESC' } });
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
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
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
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map
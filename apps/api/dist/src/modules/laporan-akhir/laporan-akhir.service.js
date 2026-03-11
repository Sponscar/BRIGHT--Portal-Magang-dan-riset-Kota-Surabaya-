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
exports.LaporanAkhirService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
const storage_service_1 = require("../storage/storage.service");
let LaporanAkhirService = class LaporanAkhirService {
    em;
    storageService;
    constructor(em, storageService) {
        this.em = em;
        this.storageService = storageService;
    }
    async submit(userId, file, title) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(entities_1.Mahasiswa, { user: { id: userId } });
        const { objectKey } = await this.storageService.upload('laporan-akhir', file);
        const laporan = new entities_1.LaporanAkhir();
        laporan.mahasiswa = mahasiswa;
        laporan.title = title;
        laporan.fileName = file.originalname;
        laporan.fileUrl = objectKey;
        laporan.fileSize = file.size;
        fork.persist(laporan);
        await fork.flush();
        return laporan;
    }
    async findByUser(userId) { return this.em.fork().find(entities_1.LaporanAkhir, { mahasiswa: { user: { id: userId } } }, { orderBy: { createdAt: 'DESC' } }); }
    async findAll() { return this.em.fork().find(entities_1.LaporanAkhir, {}, { populate: ['mahasiswa', 'mahasiswa.user', 'reviewedBy'], orderBy: { createdAt: 'DESC' } }); }
    async review(id, status, reviewedByUserId, rejectionReason) {
        const fork = this.em.fork();
        const laporan = await fork.findOne(entities_1.LaporanAkhir, { id });
        if (!laporan)
            throw new common_1.NotFoundException('Laporan akhir tidak ditemukan');
        laporan.status = status;
        laporan.reviewedBy = await fork.findOneOrFail(entities_1.User, { id: reviewedByUserId });
        laporan.reviewedAt = new Date();
        if (rejectionReason)
            laporan.rejectionReason = rejectionReason;
        await fork.flush();
        return laporan;
    }
    async getPresignedUrl(id) {
        const fork = this.em.fork();
        const laporan = await fork.findOne(entities_1.LaporanAkhir, { id });
        if (!laporan)
            throw new common_1.NotFoundException('Laporan tidak ditemukan');
        return { url: await this.storageService.getPresignedUrl('laporan-akhir', laporan.fileUrl) };
    }
};
exports.LaporanAkhirService = LaporanAkhirService;
exports.LaporanAkhirService = LaporanAkhirService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager, storage_service_1.StorageService])
], LaporanAkhirService);
//# sourceMappingURL=laporan-akhir.service.js.map
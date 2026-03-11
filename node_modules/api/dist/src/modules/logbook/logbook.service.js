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
exports.LogbookService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
const storage_service_1 = require("../storage/storage.service");
let LogbookService = class LogbookService {
    em;
    storageService;
    constructor(em, storageService) {
        this.em = em;
        this.storageService = storageService;
    }
    async create(userId, data, file) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(entities_1.Mahasiswa, { user: { id: userId } });
        const logbook = new entities_1.Logbook();
        Object.assign(logbook, data);
        logbook.mahasiswa = mahasiswa;
        logbook.logDate = new Date(data.logDate);
        if (file) {
            const { objectKey } = await this.storageService.upload('logbook-attachments', file);
            logbook.attachmentUrl = objectKey;
        }
        fork.persist(logbook);
        await fork.flush();
        return logbook;
    }
    async findByUser(userId, filters) {
        const where = { mahasiswa: { user: { id: userId } }, deletedAt: null };
        if (filters?.status)
            where.status = filters.status;
        return this.em.fork().find(entities_1.Logbook, where, { populate: ['jenisAktivitas', 'mataKuliah'], orderBy: { logDate: 'DESC' } });
    }
    async update(id, userId, data, file) {
        const fork = this.em.fork();
        const logbook = await fork.findOne(entities_1.Logbook, { id, mahasiswa: { user: { id: userId } } });
        if (!logbook)
            throw new common_1.NotFoundException('Logbook tidak ditemukan');
        Object.assign(logbook, data);
        if (data.logDate)
            logbook.logDate = new Date(data.logDate);
        if (file) {
            const { objectKey } = await this.storageService.upload('logbook-attachments', file);
            logbook.attachmentUrl = objectKey;
        }
        await fork.flush();
        return logbook;
    }
    async softDelete(id, userId) {
        const fork = this.em.fork();
        const logbook = await fork.findOne(entities_1.Logbook, { id, mahasiswa: { user: { id: userId } } });
        if (!logbook)
            throw new common_1.NotFoundException('Logbook tidak ditemukan');
        logbook.deletedAt = new Date();
        await fork.flush();
        return { message: 'Logbook berhasil dihapus' };
    }
    async findAll(filters) {
        const where = { deletedAt: null };
        if (filters?.status)
            where.status = filters.status;
        return this.em.fork().find(entities_1.Logbook, where, { populate: ['mahasiswa', 'mahasiswa.user', 'jenisAktivitas'], orderBy: { logDate: 'DESC' } });
    }
    async findById(id) {
        const logbook = await this.em.fork().findOne(entities_1.Logbook, { id }, { populate: ['mahasiswa', 'mahasiswa.user', 'jenisAktivitas', 'mataKuliah'] });
        if (!logbook)
            throw new common_1.NotFoundException('Logbook tidak ditemukan');
        return logbook;
    }
    async review(id, status, reviewedByUserId) {
        const fork = this.em.fork();
        const logbook = await fork.findOne(entities_1.Logbook, { id });
        if (!logbook)
            throw new common_1.NotFoundException('Logbook tidak ditemukan');
        const reviewer = await fork.findOneOrFail(entities_1.User, { id: reviewedByUserId });
        logbook.status = status;
        logbook.reviewedBy = reviewer;
        logbook.reviewedAt = new Date();
        await fork.flush();
        return logbook;
    }
};
exports.LogbookService = LogbookService;
exports.LogbookService = LogbookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager, storage_service_1.StorageService])
], LogbookService);
//# sourceMappingURL=logbook.service.js.map
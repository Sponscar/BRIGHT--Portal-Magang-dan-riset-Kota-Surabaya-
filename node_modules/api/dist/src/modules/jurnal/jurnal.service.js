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
exports.JurnalService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
const storage_service_1 = require("../storage/storage.service");
let JurnalService = class JurnalService {
    em;
    storageService;
    constructor(em, storageService) {
        this.em = em;
        this.storageService = storageService;
    }
    async create(userId, data, file) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(entities_1.Mahasiswa, { user: { id: userId } });
        const jurnal = new entities_1.Jurnal();
        Object.assign(jurnal, data);
        jurnal.mahasiswa = mahasiswa;
        if (file) {
            const { objectKey } = await this.storageService.upload('jurnal', file);
            jurnal.fileUrl = objectKey;
            jurnal.fileName = file.originalname;
            jurnal.fileSize = file.size;
        }
        fork.persist(jurnal);
        await fork.flush();
        return jurnal;
    }
    async findByUser(userId) { return this.em.fork().find(entities_1.Jurnal, { mahasiswa: { user: { id: userId } } }, { orderBy: { createdAt: 'DESC' } }); }
    async update(id, userId, data, file) {
        const fork = this.em.fork();
        const jurnal = await fork.findOne(entities_1.Jurnal, { id, mahasiswa: { user: { id: userId } } });
        if (!jurnal)
            throw new common_1.NotFoundException('Jurnal tidak ditemukan');
        Object.assign(jurnal, data);
        if (file) {
            const { objectKey } = await this.storageService.upload('jurnal', file);
            jurnal.fileUrl = objectKey;
            jurnal.fileName = file.originalname;
            jurnal.fileSize = file.size;
        }
        await fork.flush();
        return jurnal;
    }
    async delete(id, userId) {
        const fork = this.em.fork();
        const jurnal = await fork.findOne(entities_1.Jurnal, { id, mahasiswa: { user: { id: userId } } });
        if (!jurnal)
            throw new common_1.NotFoundException('Jurnal tidak ditemukan');
        await fork.removeAndFlush(jurnal);
        return { message: 'Jurnal berhasil dihapus' };
    }
    async findAll() { return this.em.fork().find(entities_1.Jurnal, {}, { populate: ['mahasiswa', 'mahasiswa.user'], orderBy: { createdAt: 'DESC' } }); }
    async review(id, status, reviewedByUserId) {
        const fork = this.em.fork();
        const jurnal = await fork.findOne(entities_1.Jurnal, { id });
        if (!jurnal)
            throw new common_1.NotFoundException('Jurnal tidak ditemukan');
        jurnal.status = status;
        jurnal.reviewedBy = await fork.findOneOrFail(entities_1.User, { id: reviewedByUserId });
        jurnal.reviewedAt = new Date();
        await fork.flush();
        return jurnal;
    }
};
exports.JurnalService = JurnalService;
exports.JurnalService = JurnalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager, storage_service_1.StorageService])
], JurnalService);
//# sourceMappingURL=jurnal.service.js.map
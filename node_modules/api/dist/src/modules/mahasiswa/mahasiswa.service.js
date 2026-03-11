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
exports.MahasiswaService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
const storage_service_1 = require("../storage/storage.service");
let MahasiswaService = class MahasiswaService {
    em;
    storageService;
    constructor(em, storageService) {
        this.em = em;
        this.storageService = storageService;
    }
    async getProfile(userId) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(entities_1.Mahasiswa, { user: { id: userId } }, { populate: ['user', 'tusiBrida'] });
        if (!mahasiswa)
            throw new common_1.NotFoundException('Profil mahasiswa tidak ditemukan');
        return mahasiswa;
    }
    async updateProfile(userId, data) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(entities_1.Mahasiswa, { user: { id: userId } });
        if (!mahasiswa)
            throw new common_1.NotFoundException('Profil mahasiswa tidak ditemukan');
        fork.assign(mahasiswa, data);
        await fork.flush();
        return mahasiswa;
    }
    async uploadProfileImage(userId, file) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(entities_1.Mahasiswa, { user: { id: userId } });
        if (!mahasiswa)
            throw new common_1.NotFoundException('Profil tidak ditemukan');
        if (mahasiswa.profileImageUrl) {
            try {
                await this.storageService.delete('profile-images', mahasiswa.profileImageUrl);
            }
            catch { }
        }
        const { objectKey } = await this.storageService.upload('profile-images', file);
        mahasiswa.profileImageUrl = objectKey;
        await fork.flush();
        return { profileImageUrl: objectKey };
    }
    async findAll(filters) {
        const fork = this.em.fork();
        const where = {};
        if (filters?.status)
            where.status = filters.status;
        return fork.find(entities_1.Mahasiswa, where, { populate: ['user', 'tusiBrida'], orderBy: { createdAt: 'DESC' } });
    }
    async findById(id) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(entities_1.Mahasiswa, { id }, { populate: ['user', 'tusiBrida'] });
        if (!mahasiswa)
            throw new common_1.NotFoundException('Mahasiswa tidak ditemukan');
        return mahasiswa;
    }
    async updateStatus(id, status) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(entities_1.Mahasiswa, { id });
        if (!mahasiswa)
            throw new common_1.NotFoundException('Mahasiswa tidak ditemukan');
        mahasiswa.status = status;
        await fork.flush();
        return mahasiswa;
    }
    async assignTusi(id, tusiId, assignedByUserId) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(entities_1.Mahasiswa, { id });
        if (!mahasiswa)
            throw new common_1.NotFoundException('Mahasiswa tidak ditemukan');
        const tusi = await fork.findOne(entities_1.TusiBrida, { id: tusiId });
        if (!tusi)
            throw new common_1.NotFoundException('Tusi BRIDA tidak ditemukan');
        const assignedBy = await fork.findOneOrFail(entities_1.User, { id: assignedByUserId });
        mahasiswa.tusiBrida = tusi;
        mahasiswa.assignedBy = assignedBy;
        mahasiswa.tusiAssignedAt = new Date();
        await fork.flush();
        return mahasiswa;
    }
};
exports.MahasiswaService = MahasiswaService;
exports.MahasiswaService = MahasiswaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager,
        storage_service_1.StorageService])
], MahasiswaService);
//# sourceMappingURL=mahasiswa.service.js.map
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
exports.PresensiService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
const storage_service_1 = require("../storage/storage.service");
let PresensiService = class PresensiService {
    em;
    storageService;
    constructor(em, storageService) {
        this.em = em;
        this.storageService = storageService;
    }
    async checkIn(userId) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(entities_1.Mahasiswa, { user: { id: userId } });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const existing = await fork.findOne(entities_1.Presensi, { mahasiswa, tanggal: today });
        if (existing)
            return { message: 'Sudah check-in hari ini', presensi: existing };
        const presensi = new entities_1.Presensi();
        presensi.mahasiswa = mahasiswa;
        presensi.tanggal = today;
        presensi.jamMasuk = new Date().toTimeString().slice(0, 5);
        presensi.status = entities_1.PresensiStatus.HADIR;
        presensi.statusValidasi = entities_1.ValidasiStatus.APPROVED;
        fork.persist(presensi);
        await fork.flush();
        return presensi;
    }
    async submitPermission(userId, data, file) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(entities_1.Mahasiswa, { user: { id: userId } });
        const presensi = new entities_1.Presensi();
        presensi.mahasiswa = mahasiswa;
        presensi.tanggal = new Date(data.tanggal);
        presensi.status = data.status;
        presensi.keterangan = data.keterangan;
        if (file) {
            const { objectKey } = await this.storageService.upload('dokumen', file, 'bukti-izin');
            presensi.buktiUrl = objectKey;
        }
        fork.persist(presensi);
        await fork.flush();
        return presensi;
    }
    async findByUser(userId) {
        return this.em.fork().find(entities_1.Presensi, { mahasiswa: { user: { id: userId } } }, { orderBy: { tanggal: 'DESC' } });
    }
    async findAll(filters) {
        const where = {};
        if (filters?.date)
            where.tanggal = new Date(filters.date);
        return this.em.fork().find(entities_1.Presensi, where, { populate: ['mahasiswa', 'mahasiswa.user'], orderBy: { tanggal: 'DESC' } });
    }
    async validate(id, statusValidasi, validatedByUserId) {
        const fork = this.em.fork();
        const presensi = await fork.findOne(entities_1.Presensi, { id });
        if (!presensi)
            throw new common_1.NotFoundException('Presensi tidak ditemukan');
        presensi.statusValidasi = statusValidasi;
        presensi.validatedBy = await fork.findOneOrFail(entities_1.User, { id: validatedByUserId });
        presensi.validatedAt = new Date();
        await fork.flush();
        return presensi;
    }
};
exports.PresensiService = PresensiService;
exports.PresensiService = PresensiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager, storage_service_1.StorageService])
], PresensiService);
//# sourceMappingURL=presensi.service.js.map
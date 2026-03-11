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
exports.DokumenService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
const storage_service_1 = require("../storage/storage.service");
let DokumenService = class DokumenService {
    em;
    storageService;
    constructor(em, storageService) {
        this.em = em;
        this.storageService = storageService;
    }
    async upload(userId, file, documentType) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(entities_1.Mahasiswa, { user: { id: userId } });
        const { objectKey } = await this.storageService.upload('dokumen', file);
        const dokumen = new entities_1.Dokumen();
        dokumen.mahasiswa = mahasiswa;
        dokumen.documentType = documentType;
        dokumen.fileName = file.originalname;
        dokumen.fileUrl = objectKey;
        dokumen.fileSize = file.size;
        fork.persist(dokumen);
        await fork.flush();
        return dokumen;
    }
    async findByUser(userId) {
        const fork = this.em.fork();
        return fork.find(entities_1.Dokumen, { mahasiswa: { user: { id: userId } } }, { orderBy: { createdAt: 'DESC' } });
    }
    async reUpload(id, userId, file) {
        const fork = this.em.fork();
        const dokumen = await fork.findOne(entities_1.Dokumen, { id, mahasiswa: { user: { id: userId } } });
        if (!dokumen)
            throw new common_1.NotFoundException('Dokumen tidak ditemukan');
        if (dokumen.fileUrl) {
            try {
                await this.storageService.delete('dokumen', dokumen.fileUrl);
            }
            catch { }
        }
        const { objectKey } = await this.storageService.upload('dokumen', file);
        dokumen.fileName = file.originalname;
        dokumen.fileUrl = objectKey;
        dokumen.fileSize = file.size;
        dokumen.status = entities_1.DocumentStatus.PENDING;
        await fork.flush();
        return dokumen;
    }
    async findAll() {
        const fork = this.em.fork();
        return fork.find(entities_1.Dokumen, {}, { populate: ['mahasiswa', 'mahasiswa.user'], orderBy: { createdAt: 'DESC' } });
    }
    async verify(id, status, verifiedByUserId, rejectionReason) {
        const fork = this.em.fork();
        const dokumen = await fork.findOne(entities_1.Dokumen, { id });
        if (!dokumen)
            throw new common_1.NotFoundException('Dokumen tidak ditemukan');
        const verifiedBy = await fork.findOneOrFail(entities_1.User, { id: verifiedByUserId });
        dokumen.status = status;
        dokumen.verifiedBy = verifiedBy;
        dokumen.verifiedAt = new Date();
        if (rejectionReason)
            dokumen.rejectionReason = rejectionReason;
        await fork.flush();
        return dokumen;
    }
    async getPresignedUrl(id) {
        const fork = this.em.fork();
        const dokumen = await fork.findOne(entities_1.Dokumen, { id });
        if (!dokumen)
            throw new common_1.NotFoundException('Dokumen tidak ditemukan');
        return { url: await this.storageService.getPresignedUrl('dokumen', dokumen.fileUrl) };
    }
};
exports.DokumenService = DokumenService;
exports.DokumenService = DokumenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager, storage_service_1.StorageService])
], DokumenService);
//# sourceMappingURL=dokumen.service.js.map
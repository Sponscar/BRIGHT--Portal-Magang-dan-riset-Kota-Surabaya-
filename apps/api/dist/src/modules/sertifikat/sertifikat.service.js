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
exports.SertifikatService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
let SertifikatService = class SertifikatService {
    em;
    constructor(em) {
        this.em = em;
    }
    async generate(issuedByUserId, data) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(entities_1.Mahasiswa, { id: data.mahasiswaId }, { populate: ['user'] });
        const issuedBy = await fork.findOneOrFail(entities_1.User, { id: issuedByUserId });
        const sertifikat = new entities_1.Sertifikat();
        sertifikat.mahasiswa = mahasiswa;
        sertifikat.studentName = mahasiswa.fullName;
        sertifikat.startDate = new Date(data.startDate);
        sertifikat.endDate = new Date(data.endDate);
        sertifikat.issuedBy = issuedBy;
        sertifikat.tanggalTerbit = new Date();
        const shortId = sertifikat.id.split('-')[0].toUpperCase();
        const random = Math.floor(1000 + Math.random() * 9000);
        sertifikat.nomorSertifikat = `BRIDA-CERT-${shortId}-${random}`;
        fork.persist(sertifikat);
        await fork.flush();
        return sertifikat;
    }
    async findAll() {
        return this.em.fork().find(entities_1.Sertifikat, {}, {
            populate: ['mahasiswa', 'mahasiswa.user', 'issuedBy'],
            orderBy: { tanggalTerbit: 'DESC' },
        });
    }
    async findById(id) {
        const s = await this.em.fork().findOne(entities_1.Sertifikat, { id }, {
            populate: ['mahasiswa', 'mahasiswa.user', 'issuedBy'],
        });
        if (!s)
            throw new common_1.NotFoundException('Sertifikat tidak ditemukan');
        return s;
    }
    async findByUser(userId) {
        return this.em.fork().find(entities_1.Sertifikat, {
            mahasiswa: { user: { id: userId } },
        }, { populate: ['issuedBy'] });
    }
};
exports.SertifikatService = SertifikatService;
exports.SertifikatService = SertifikatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], SertifikatService);
//# sourceMappingURL=sertifikat.service.js.map
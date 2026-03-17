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
exports.KurikulumMagangService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
let KurikulumMagangService = class KurikulumMagangService {
    em;
    constructor(em) {
        this.em = em;
    }
    async create(mahasiswaId, materi) {
        const entry = this.em.create(entities_1.KurikulumMagang, {
            mahasiswa: mahasiswaId,
            materi,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await this.em.persistAndFlush(entry);
        return entry;
    }
    async findByMahasiswa(mahasiswaId) {
        return this.em.find(entities_1.KurikulumMagang, { mahasiswa: mahasiswaId }, {
            orderBy: { createdAt: 'DESC' },
        });
    }
    async findAll() {
        return this.em.find(entities_1.KurikulumMagang, {}, {
            populate: ['mahasiswa'],
            orderBy: { createdAt: 'DESC' },
        });
    }
    async delete(id) {
        const entry = await this.em.findOneOrFail(entities_1.KurikulumMagang, { id });
        await this.em.removeAndFlush(entry);
    }
};
exports.KurikulumMagangService = KurikulumMagangService;
exports.KurikulumMagangService = KurikulumMagangService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], KurikulumMagangService);
//# sourceMappingURL=kurikulum-magang.service.js.map
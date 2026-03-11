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
exports.KriteriaPenilaianService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
let KriteriaPenilaianService = class KriteriaPenilaianService {
    em;
    constructor(em) {
        this.em = em;
    }
    async findAll() { return this.em.fork().find(entities_1.KriteriaPenilaian, {}, { orderBy: { displayOrder: 'ASC' } }); }
    async create(data) { const fork = this.em.fork(); const k = new entities_1.KriteriaPenilaian(); Object.assign(k, data); fork.persist(k); await fork.flush(); return k; }
    async update(id, data) { const fork = this.em.fork(); const k = await fork.findOne(entities_1.KriteriaPenilaian, { id }); if (!k)
        throw new common_1.NotFoundException('Kriteria tidak ditemukan'); fork.assign(k, data); await fork.flush(); return k; }
    async delete(id) { const fork = this.em.fork(); const k = await fork.findOne(entities_1.KriteriaPenilaian, { id }); if (!k)
        throw new common_1.NotFoundException('Kriteria tidak ditemukan'); await fork.removeAndFlush(k); return { message: 'Berhasil dihapus' }; }
};
exports.KriteriaPenilaianService = KriteriaPenilaianService;
exports.KriteriaPenilaianService = KriteriaPenilaianService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], KriteriaPenilaianService);
//# sourceMappingURL=kriteria-penilaian.service.js.map
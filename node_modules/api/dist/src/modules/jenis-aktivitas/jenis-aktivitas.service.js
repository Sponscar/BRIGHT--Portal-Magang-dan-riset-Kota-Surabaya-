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
exports.JenisAktivitasService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
let JenisAktivitasService = class JenisAktivitasService {
    em;
    constructor(em) {
        this.em = em;
    }
    async findAll() { return this.em.fork().find(entities_1.JenisAktivitas, {}, { orderBy: { displayOrder: 'ASC', name: 'ASC' } }); }
    async create(data) {
        const fork = this.em.fork();
        const item = new entities_1.JenisAktivitas();
        Object.assign(item, data);
        fork.persist(item);
        await fork.flush();
        return item;
    }
    async update(id, data) {
        const fork = this.em.fork();
        const item = await fork.findOne(entities_1.JenisAktivitas, { id });
        if (!item)
            throw new common_1.NotFoundException('Jenis aktivitas tidak ditemukan');
        fork.assign(item, data);
        await fork.flush();
        return item;
    }
    async delete(id) {
        const fork = this.em.fork();
        const item = await fork.findOne(entities_1.JenisAktivitas, { id });
        if (!item)
            throw new common_1.NotFoundException('Jenis aktivitas tidak ditemukan');
        await fork.removeAndFlush(item);
        return { message: 'Berhasil dihapus' };
    }
};
exports.JenisAktivitasService = JenisAktivitasService;
exports.JenisAktivitasService = JenisAktivitasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], JenisAktivitasService);
//# sourceMappingURL=jenis-aktivitas.service.js.map
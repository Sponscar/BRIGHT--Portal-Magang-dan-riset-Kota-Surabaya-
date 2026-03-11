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
exports.TusiBridaService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
let TusiBridaService = class TusiBridaService {
    em;
    constructor(em) {
        this.em = em;
    }
    async create(data) {
        const fork = this.em.fork();
        const tusi = new entities_1.TusiBrida();
        Object.assign(tusi, data);
        if (data.name && !data.slug)
            tusi.slug = data.name.toLowerCase().replace(/\s+/g, '-');
        fork.persist(tusi);
        await fork.flush();
        return tusi;
    }
    async findAll() {
        return this.em.fork().find(entities_1.TusiBrida, {}, { orderBy: { displayOrder: 'ASC', name: 'ASC' } });
    }
    async findBySlug(slug) {
        const tusi = await this.em.fork().findOne(entities_1.TusiBrida, { slug });
        if (!tusi)
            throw new common_1.NotFoundException('Tusi BRIDA tidak ditemukan');
        return tusi;
    }
    async update(id, data) {
        const fork = this.em.fork();
        const tusi = await fork.findOne(entities_1.TusiBrida, { id });
        if (!tusi)
            throw new common_1.NotFoundException('Tusi BRIDA tidak ditemukan');
        fork.assign(tusi, data);
        await fork.flush();
        return tusi;
    }
    async toggle(id) {
        const fork = this.em.fork();
        const tusi = await fork.findOne(entities_1.TusiBrida, { id });
        if (!tusi)
            throw new common_1.NotFoundException('Tusi BRIDA tidak ditemukan');
        tusi.isActive = !tusi.isActive;
        await fork.flush();
        return tusi;
    }
};
exports.TusiBridaService = TusiBridaService;
exports.TusiBridaService = TusiBridaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], TusiBridaService);
//# sourceMappingURL=tusi-brida.service.js.map
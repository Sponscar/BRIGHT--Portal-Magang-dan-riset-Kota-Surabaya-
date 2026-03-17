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
exports.PerguruanTinggiService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
let PerguruanTinggiService = class PerguruanTinggiService {
    em;
    constructor(em) {
        this.em = em;
    }
    async findAll(search) {
        const fork = this.em.fork();
        const where = { isActive: true };
        if (search)
            where.nama = { $ilike: `%${search}%` };
        return fork.find(entities_1.PerguruanTinggi, where, { orderBy: { nama: 'ASC' } });
    }
    async create(data) {
        const fork = this.em.fork();
        const pt = new entities_1.PerguruanTinggi();
        Object.assign(pt, data);
        fork.persist(pt);
        await fork.flush();
        return pt;
    }
    async update(id, data) {
        const fork = this.em.fork();
        const pt = await fork.findOne(entities_1.PerguruanTinggi, { id });
        if (!pt)
            throw new common_1.NotFoundException('Perguruan tinggi tidak ditemukan');
        fork.assign(pt, data);
        await fork.flush();
        return pt;
    }
    async delete(id) {
        const fork = this.em.fork();
        const pt = await fork.findOne(entities_1.PerguruanTinggi, { id });
        if (!pt)
            throw new common_1.NotFoundException('Perguruan tinggi tidak ditemukan');
        pt.isActive = false;
        await fork.flush();
        return { message: 'Berhasil dihapus' };
    }
};
exports.PerguruanTinggiService = PerguruanTinggiService;
exports.PerguruanTinggiService = PerguruanTinggiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], PerguruanTinggiService);
//# sourceMappingURL=perguruan-tinggi.service.js.map
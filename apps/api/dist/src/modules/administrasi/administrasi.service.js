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
exports.AdministrasiService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
let AdministrasiService = class AdministrasiService {
    em;
    constructor(em) {
        this.em = em;
    }
    async create(userId, data) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(entities_1.Mahasiswa, { user: { id: userId } });
        const adm = new entities_1.Administrasi();
        Object.assign(adm, data);
        adm.mahasiswa = mahasiswa;
        fork.persist(adm);
        await fork.flush();
        return adm;
    }
    async findByUser(userId) {
        return this.em.fork().findOne(entities_1.Administrasi, { mahasiswa: { user: { id: userId } } });
    }
    async update(userId, data) {
        const fork = this.em.fork();
        const adm = await fork.findOne(entities_1.Administrasi, { mahasiswa: { user: { id: userId } } });
        if (!adm)
            throw new common_1.NotFoundException('Form administrasi tidak ditemukan');
        fork.assign(adm, data);
        await fork.flush();
        return adm;
    }
    async findAll() {
        return this.em.fork().find(entities_1.Administrasi, {}, { populate: ['mahasiswa', 'mahasiswa.user'], orderBy: { createdAt: 'DESC' } });
    }
    async findById(id) {
        const fork = this.em.fork();
        const adm = await fork.findOne(entities_1.Administrasi, { id }, { populate: ['mahasiswa', 'mahasiswa.user'] });
        if (!adm)
            throw new common_1.NotFoundException('Form administrasi tidak ditemukan');
        return adm;
    }
};
exports.AdministrasiService = AdministrasiService;
exports.AdministrasiService = AdministrasiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], AdministrasiService);
//# sourceMappingURL=administrasi.service.js.map
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
exports.MataKuliahService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
let MataKuliahService = class MataKuliahService {
    em;
    constructor(em) {
        this.em = em;
    }
    async findAll() { return this.em.fork().find(entities_1.MataKuliahKonversi, {}, { orderBy: { displayOrder: 'ASC' } }); }
    async create(data) {
        const fork = this.em.fork();
        const mk = new entities_1.MataKuliahKonversi();
        Object.assign(mk, data);
        fork.persist(mk);
        await fork.flush();
        return mk;
    }
    async assign(userId, mataKuliahIds) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(entities_1.Mahasiswa, { user: { id: userId } });
        const existing = await fork.find(entities_1.MahasiswaMataKuliah, { mahasiswa });
        for (const e of existing)
            fork.remove(e);
        for (const mkId of mataKuliahIds) {
            const mk = await fork.findOneOrFail(entities_1.MataKuliahKonversi, { id: mkId });
            const mmk = new entities_1.MahasiswaMataKuliah();
            mmk.mahasiswa = mahasiswa;
            mmk.mataKuliah = mk;
            fork.persist(mmk);
        }
        await fork.flush();
        return { message: 'Mata kuliah berhasil dipilih' };
    }
    async findByUser(userId) {
        const fork = this.em.fork();
        return fork.find(entities_1.MahasiswaMataKuliah, { mahasiswa: { user: { id: userId } } }, { populate: ['mataKuliah'] });
    }
};
exports.MataKuliahService = MataKuliahService;
exports.MataKuliahService = MataKuliahService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], MataKuliahService);
//# sourceMappingURL=mata-kuliah.service.js.map
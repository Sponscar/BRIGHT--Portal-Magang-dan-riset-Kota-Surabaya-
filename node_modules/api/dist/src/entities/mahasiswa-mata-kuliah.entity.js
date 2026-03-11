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
exports.MahasiswaMataKuliah = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const mahasiswa_entity_1 = require("./mahasiswa.entity");
const mata_kuliah_konversi_entity_1 = require("./mata-kuliah-konversi.entity");
let MahasiswaMataKuliah = class MahasiswaMataKuliah {
    id = (0, uuid_1.v4)();
    mahasiswa;
    mataKuliah;
    createdAt = new Date();
};
exports.MahasiswaMataKuliah = MahasiswaMataKuliah;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], MahasiswaMataKuliah.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => mahasiswa_entity_1.Mahasiswa, { fieldName: 'mahasiswa_id' }),
    __metadata("design:type", mahasiswa_entity_1.Mahasiswa)
], MahasiswaMataKuliah.prototype, "mahasiswa", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => mata_kuliah_konversi_entity_1.MataKuliahKonversi, { fieldName: 'mata_kuliah_id' }),
    __metadata("design:type", mata_kuliah_konversi_entity_1.MataKuliahKonversi)
], MahasiswaMataKuliah.prototype, "mataKuliah", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], MahasiswaMataKuliah.prototype, "createdAt", void 0);
exports.MahasiswaMataKuliah = MahasiswaMataKuliah = __decorate([
    (0, core_1.Entity)({ tableName: 'mahasiswa_mata_kuliah' }),
    (0, core_1.Unique)({ properties: ['mahasiswa', 'mataKuliah'] })
], MahasiswaMataKuliah);
//# sourceMappingURL=mahasiswa-mata-kuliah.entity.js.map
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
exports.NilaiPenilaian = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const penilaian_entity_1 = require("./penilaian.entity");
const kriteria_penilaian_entity_1 = require("./kriteria-penilaian.entity");
let NilaiPenilaian = class NilaiPenilaian {
    id = (0, uuid_1.v4)();
    penilaian;
    kriteria;
    score;
    keterangan;
    createdAt = new Date();
};
exports.NilaiPenilaian = NilaiPenilaian;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], NilaiPenilaian.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => penilaian_entity_1.Penilaian, { fieldName: 'penilaian_id' }),
    __metadata("design:type", penilaian_entity_1.Penilaian)
], NilaiPenilaian.prototype, "penilaian", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => kriteria_penilaian_entity_1.KriteriaPenilaian, { fieldName: 'kriteria_id' }),
    __metadata("design:type", kriteria_penilaian_entity_1.KriteriaPenilaian)
], NilaiPenilaian.prototype, "kriteria", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], NilaiPenilaian.prototype, "score", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], NilaiPenilaian.prototype, "keterangan", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], NilaiPenilaian.prototype, "createdAt", void 0);
exports.NilaiPenilaian = NilaiPenilaian = __decorate([
    (0, core_1.Entity)({ tableName: 'nilai_penilaian' })
], NilaiPenilaian);
//# sourceMappingURL=nilai-penilaian.entity.js.map
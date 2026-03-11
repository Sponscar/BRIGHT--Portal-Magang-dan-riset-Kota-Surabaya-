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
exports.NilaiAkhir = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const mahasiswa_entity_1 = require("./mahasiswa.entity");
let NilaiAkhir = class NilaiAkhir {
    id = (0, uuid_1.v4)();
    mahasiswa;
    nilaiPerilaku;
    nilaiPerilakuFinal;
    nilaiKinerja;
    nilaiKinerjaFinal;
    nilaiAkhir;
    grade;
    createdAt = new Date();
    updatedAt = new Date();
};
exports.NilaiAkhir = NilaiAkhir;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], NilaiAkhir.prototype, "id", void 0);
__decorate([
    (0, core_1.OneToOne)(() => mahasiswa_entity_1.Mahasiswa, { fieldName: 'mahasiswa_id', unique: true }),
    __metadata("design:type", mahasiswa_entity_1.Mahasiswa)
], NilaiAkhir.prototype, "mahasiswa", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], NilaiAkhir.prototype, "nilaiPerilaku", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], NilaiAkhir.prototype, "nilaiPerilakuFinal", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], NilaiAkhir.prototype, "nilaiKinerja", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], NilaiAkhir.prototype, "nilaiKinerjaFinal", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], NilaiAkhir.prototype, "nilaiAkhir", void 0);
__decorate([
    (0, core_1.Property)({ length: 2, nullable: true }),
    __metadata("design:type", String)
], NilaiAkhir.prototype, "grade", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], NilaiAkhir.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], NilaiAkhir.prototype, "updatedAt", void 0);
exports.NilaiAkhir = NilaiAkhir = __decorate([
    (0, core_1.Entity)({ tableName: 'nilai_akhir' })
], NilaiAkhir);
//# sourceMappingURL=nilai-akhir.entity.js.map
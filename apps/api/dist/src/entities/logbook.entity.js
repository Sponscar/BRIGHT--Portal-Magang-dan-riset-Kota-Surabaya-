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
exports.Logbook = exports.LogbookType = exports.LogbookStatus = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const mahasiswa_entity_1 = require("./mahasiswa.entity");
const user_entity_1 = require("./user.entity");
var LogbookStatus;
(function (LogbookStatus) {
    LogbookStatus["DRAFT"] = "draft";
    LogbookStatus["SUBMITTED"] = "submitted";
    LogbookStatus["REVIEWED"] = "reviewed";
    LogbookStatus["APPROVED"] = "approved";
    LogbookStatus["REJECTED"] = "rejected";
})(LogbookStatus || (exports.LogbookStatus = LogbookStatus = {}));
var LogbookType;
(function (LogbookType) {
    LogbookType["LAPORAN_HARIAN"] = "Laporan Harian";
    LogbookType["JURNAL"] = "Jurnal";
    LogbookType["DRAFT_JURNAL"] = "Draft Jurnal";
})(LogbookType || (exports.LogbookType = LogbookType = {}));
let Logbook = class Logbook {
    id = (0, uuid_1.v4)();
    mahasiswa;
    jenisAktivitas;
    mataKuliah;
    jenisPenugasanText;
    jenisAktivitasText;
    type;
    logDate;
    startTime;
    endTime;
    totalJamKerja;
    description;
    pembelajaran;
    lokasiNama;
    lokasiLat;
    lokasiLng;
    attachmentUrl;
    university;
    major;
    status = LogbookStatus.DRAFT;
    reviewedBy;
    reviewedAt;
    deletedAt;
    createdAt = new Date();
    updatedAt = new Date();
};
exports.Logbook = Logbook;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Logbook.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => mahasiswa_entity_1.Mahasiswa, { fieldName: 'mahasiswa_id' }),
    __metadata("design:type", mahasiswa_entity_1.Mahasiswa)
], Logbook.prototype, "mahasiswa", void 0);
__decorate([
    (0, core_1.ManyToOne)('JenisAktivitas', { nullable: true, fieldName: 'jenis_aktivitas_id' }),
    __metadata("design:type", Function)
], Logbook.prototype, "jenisAktivitas", void 0);
__decorate([
    (0, core_1.ManyToOne)('MataKuliahKonversi', { nullable: true, fieldName: 'mata_kuliah_id' }),
    __metadata("design:type", Function)
], Logbook.prototype, "mataKuliah", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Logbook.prototype, "jenisPenugasanText", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Logbook.prototype, "jenisAktivitasText", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => LogbookType, nullable: true }),
    __metadata("design:type", String)
], Logbook.prototype, "type", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", Date)
], Logbook.prototype, "logDate", void 0);
__decorate([
    (0, core_1.Property)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Logbook.prototype, "startTime", void 0);
__decorate([
    (0, core_1.Property)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Logbook.prototype, "endTime", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Logbook.prototype, "totalJamKerja", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], Logbook.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Logbook.prototype, "pembelajaran", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Logbook.prototype, "lokasiNama", void 0);
__decorate([
    (0, core_1.Property)({ type: 'double precision', nullable: true }),
    __metadata("design:type", Number)
], Logbook.prototype, "lokasiLat", void 0);
__decorate([
    (0, core_1.Property)({ type: 'double precision', nullable: true }),
    __metadata("design:type", Number)
], Logbook.prototype, "lokasiLng", void 0);
__decorate([
    (0, core_1.Property)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Logbook.prototype, "attachmentUrl", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Logbook.prototype, "university", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Logbook.prototype, "major", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => LogbookStatus, default: LogbookStatus.DRAFT }),
    __metadata("design:type", String)
], Logbook.prototype, "status", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User, { nullable: true, fieldName: 'reviewed_by' }),
    __metadata("design:type", user_entity_1.User)
], Logbook.prototype, "reviewedBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Logbook.prototype, "reviewedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Logbook.prototype, "deletedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], Logbook.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Logbook.prototype, "updatedAt", void 0);
exports.Logbook = Logbook = __decorate([
    (0, core_1.Entity)({ tableName: 'logbook' })
], Logbook);
//# sourceMappingURL=logbook.entity.js.map
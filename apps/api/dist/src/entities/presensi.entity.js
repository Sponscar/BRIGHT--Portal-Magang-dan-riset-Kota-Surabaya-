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
exports.Presensi = exports.ValidasiStatus = exports.PresensiStatus = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const mahasiswa_entity_1 = require("./mahasiswa.entity");
const user_entity_1 = require("./user.entity");
var PresensiStatus;
(function (PresensiStatus) {
    PresensiStatus["HADIR"] = "hadir";
    PresensiStatus["IZIN"] = "izin";
    PresensiStatus["SAKIT"] = "sakit";
})(PresensiStatus || (exports.PresensiStatus = PresensiStatus = {}));
var ValidasiStatus;
(function (ValidasiStatus) {
    ValidasiStatus["PENDING"] = "pending";
    ValidasiStatus["APPROVED"] = "approved";
    ValidasiStatus["REJECTED"] = "rejected";
})(ValidasiStatus || (exports.ValidasiStatus = ValidasiStatus = {}));
let Presensi = class Presensi {
    id = (0, uuid_1.v4)();
    mahasiswa;
    tanggal;
    jamMasuk;
    status;
    keterangan;
    buktiUrl;
    statusValidasi = ValidasiStatus.PENDING;
    validatedBy;
    validatedAt;
    createdAt = new Date();
};
exports.Presensi = Presensi;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Presensi.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => mahasiswa_entity_1.Mahasiswa, { fieldName: 'mahasiswa_id' }),
    __metadata("design:type", mahasiswa_entity_1.Mahasiswa)
], Presensi.prototype, "mahasiswa", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", Date)
], Presensi.prototype, "tanggal", void 0);
__decorate([
    (0, core_1.Property)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Presensi.prototype, "jamMasuk", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => PresensiStatus }),
    __metadata("design:type", String)
], Presensi.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Presensi.prototype, "keterangan", void 0);
__decorate([
    (0, core_1.Property)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Presensi.prototype, "buktiUrl", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => ValidasiStatus, default: ValidasiStatus.PENDING }),
    __metadata("design:type", String)
], Presensi.prototype, "statusValidasi", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User, { nullable: true, fieldName: 'validated_by' }),
    __metadata("design:type", user_entity_1.User)
], Presensi.prototype, "validatedBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Presensi.prototype, "validatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], Presensi.prototype, "createdAt", void 0);
exports.Presensi = Presensi = __decorate([
    (0, core_1.Entity)({ tableName: 'presensi' })
], Presensi);
//# sourceMappingURL=presensi.entity.js.map
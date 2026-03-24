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
exports.Mahasiswa = exports.InternshipType = exports.MahasiswaStatus = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const user_entity_1 = require("./user.entity");
const tusi_brida_entity_1 = require("./tusi-brida.entity");
var MahasiswaStatus;
(function (MahasiswaStatus) {
    MahasiswaStatus["PENDING"] = "pending";
    MahasiswaStatus["DOCUMENTS_UPLOADED"] = "documents_uploaded";
    MahasiswaStatus["VERIFIED"] = "verified";
    MahasiswaStatus["FORWARDED_TO_OPD"] = "forwarded_to_opd";
    MahasiswaStatus["ACTIVE"] = "active";
    MahasiswaStatus["COMPLETED"] = "completed";
})(MahasiswaStatus || (exports.MahasiswaStatus = MahasiswaStatus = {}));
var InternshipType;
(function (InternshipType) {
    InternshipType["MAGANG_KP"] = "magang_kp";
    InternshipType["MAGANG_MBKM"] = "magang_mbkm";
    InternshipType["MAGANG_MANDIRI"] = "magang_mandiri";
})(InternshipType || (exports.InternshipType = InternshipType = {}));
let Mahasiswa = class Mahasiswa {
    id = (0, uuid_1.v4)();
    user;
    fullName;
    phone;
    whatsapp;
    address;
    provinsi;
    kotaKabupaten;
    kecamatan;
    kelurahan;
    alamatLengkap;
    university;
    major;
    universityAddress;
    uniKelurahan;
    uniKecamatan;
    nik;
    nim;
    semester;
    internshipType;
    internshipDuration;
    conversionType;
    perangkatDaerah;
    profileImageUrl;
    opd;
    kelurahanOpd;
    status = MahasiswaStatus.PENDING;
    tusiBrida;
    assignedBy;
    tusiAssignedAt;
    createdAt = new Date();
    updatedAt = new Date();
};
exports.Mahasiswa = Mahasiswa;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "id", void 0);
__decorate([
    (0, core_1.OneToOne)(() => user_entity_1.User, { fieldName: 'user_id', unique: true }),
    __metadata("design:type", user_entity_1.User)
], Mahasiswa.prototype, "user", void 0);
__decorate([
    (0, core_1.Property)({ length: 255 }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "fullName", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "phone", void 0);
__decorate([
    (0, core_1.Property)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "whatsapp", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "address", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "provinsi", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "kotaKabupaten", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "kecamatan", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "kelurahan", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "alamatLengkap", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "university", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "major", void 0);
__decorate([
    (0, core_1.Property)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "universityAddress", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "uniKelurahan", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "uniKecamatan", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "nik", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "nim", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Number)
], Mahasiswa.prototype, "semester", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => InternshipType, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "internshipType", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "internshipDuration", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "conversionType", void 0);
__decorate([
    (0, core_1.Property)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "perangkatDaerah", void 0);
__decorate([
    (0, core_1.Property)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "profileImageUrl", void 0);
__decorate([
    (0, core_1.ManyToOne)('Opd', { nullable: true, fieldName: 'opd_id' }),
    __metadata("design:type", Function)
], Mahasiswa.prototype, "opd", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "kelurahanOpd", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => MahasiswaStatus, default: MahasiswaStatus.PENDING }),
    __metadata("design:type", String)
], Mahasiswa.prototype, "status", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => tusi_brida_entity_1.TusiBrida, { nullable: true, fieldName: 'tusi_brida_id' }),
    __metadata("design:type", tusi_brida_entity_1.TusiBrida)
], Mahasiswa.prototype, "tusiBrida", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User, { nullable: true, fieldName: 'assigned_by' }),
    __metadata("design:type", user_entity_1.User)
], Mahasiswa.prototype, "assignedBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Mahasiswa.prototype, "tusiAssignedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], Mahasiswa.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Mahasiswa.prototype, "updatedAt", void 0);
exports.Mahasiswa = Mahasiswa = __decorate([
    (0, core_1.Entity)({ tableName: 'mahasiswa' })
], Mahasiswa);
//# sourceMappingURL=mahasiswa.entity.js.map
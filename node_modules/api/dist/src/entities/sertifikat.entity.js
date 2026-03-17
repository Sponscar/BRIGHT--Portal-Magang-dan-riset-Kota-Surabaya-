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
exports.Sertifikat = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const mahasiswa_entity_1 = require("./mahasiswa.entity");
const user_entity_1 = require("./user.entity");
let Sertifikat = class Sertifikat {
    id = (0, uuid_1.v4)();
    mahasiswa;
    nomorSertifikat;
    studentName;
    startDate;
    endDate;
    issuedBy;
    tanggalTerbit;
    createdAt = new Date();
};
exports.Sertifikat = Sertifikat;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Sertifikat.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => mahasiswa_entity_1.Mahasiswa, { fieldName: 'mahasiswa_id' }),
    __metadata("design:type", mahasiswa_entity_1.Mahasiswa)
], Sertifikat.prototype, "mahasiswa", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Sertifikat.prototype, "nomorSertifikat", void 0);
__decorate([
    (0, core_1.Property)({ length: 255 }),
    __metadata("design:type", String)
], Sertifikat.prototype, "studentName", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", Date)
], Sertifikat.prototype, "startDate", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", Date)
], Sertifikat.prototype, "endDate", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User, { fieldName: 'issued_by' }),
    __metadata("design:type", user_entity_1.User)
], Sertifikat.prototype, "issuedBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", Date)
], Sertifikat.prototype, "tanggalTerbit", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], Sertifikat.prototype, "createdAt", void 0);
exports.Sertifikat = Sertifikat = __decorate([
    (0, core_1.Entity)({ tableName: 'sertifikat' })
], Sertifikat);
//# sourceMappingURL=sertifikat.entity.js.map
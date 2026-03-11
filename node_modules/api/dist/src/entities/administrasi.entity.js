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
exports.Administrasi = exports.AdministrasiStatus = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const mahasiswa_entity_1 = require("./mahasiswa.entity");
var AdministrasiStatus;
(function (AdministrasiStatus) {
    AdministrasiStatus["DRAFT"] = "draft";
    AdministrasiStatus["SUBMITTED"] = "submitted";
    AdministrasiStatus["VERIFIED"] = "verified";
})(AdministrasiStatus || (exports.AdministrasiStatus = AdministrasiStatus = {}));
let Administrasi = class Administrasi {
    id = (0, uuid_1.v4)();
    mahasiswa;
    needsReplyLetter = false;
    proposalDescription;
    topic;
    expectedResults;
    hasCourseConversion = false;
    declaration;
    status = AdministrasiStatus.DRAFT;
    createdAt = new Date();
    updatedAt = new Date();
};
exports.Administrasi = Administrasi;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Administrasi.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => mahasiswa_entity_1.Mahasiswa, { fieldName: 'mahasiswa_id', unique: true }),
    __metadata("design:type", mahasiswa_entity_1.Mahasiswa)
], Administrasi.prototype, "mahasiswa", void 0);
__decorate([
    (0, core_1.Property)({ default: false }),
    __metadata("design:type", Boolean)
], Administrasi.prototype, "needsReplyLetter", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], Administrasi.prototype, "proposalDescription", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Administrasi.prototype, "topic", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Administrasi.prototype, "expectedResults", void 0);
__decorate([
    (0, core_1.Property)({ default: false }),
    __metadata("design:type", Boolean)
], Administrasi.prototype, "hasCourseConversion", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Boolean)
], Administrasi.prototype, "declaration", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => AdministrasiStatus, default: AdministrasiStatus.DRAFT }),
    __metadata("design:type", String)
], Administrasi.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], Administrasi.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Administrasi.prototype, "updatedAt", void 0);
exports.Administrasi = Administrasi = __decorate([
    (0, core_1.Entity)({ tableName: 'administrasi' })
], Administrasi);
//# sourceMappingURL=administrasi.entity.js.map
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
exports.Dokumen = exports.DocumentStatus = exports.DocumentType = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const mahasiswa_entity_1 = require("./mahasiswa.entity");
const user_entity_1 = require("./user.entity");
var DocumentType;
(function (DocumentType) {
    DocumentType["SURAT_PENGANTAR"] = "surat_pengantar";
    DocumentType["PROPOSAL"] = "proposal";
    DocumentType["KTP"] = "ktp";
    DocumentType["KTM"] = "ktm";
    DocumentType["CV"] = "cv";
    DocumentType["SURAT_PERNYATAAN"] = "surat_pernyataan";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus["PENDING"] = "pending";
    DocumentStatus["APPROVED"] = "approved";
    DocumentStatus["REJECTED"] = "rejected";
})(DocumentStatus || (exports.DocumentStatus = DocumentStatus = {}));
let Dokumen = class Dokumen {
    id = (0, uuid_1.v4)();
    mahasiswa;
    documentType;
    fileName;
    fileUrl;
    fileSize;
    status = DocumentStatus.PENDING;
    rejectionReason;
    verifiedBy;
    verifiedAt;
    createdAt = new Date();
    updatedAt = new Date();
};
exports.Dokumen = Dokumen;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Dokumen.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => mahasiswa_entity_1.Mahasiswa, { fieldName: 'mahasiswa_id' }),
    __metadata("design:type", mahasiswa_entity_1.Mahasiswa)
], Dokumen.prototype, "mahasiswa", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => DocumentType }),
    __metadata("design:type", String)
], Dokumen.prototype, "documentType", void 0);
__decorate([
    (0, core_1.Property)({ length: 255 }),
    __metadata("design:type", String)
], Dokumen.prototype, "fileName", void 0);
__decorate([
    (0, core_1.Property)({ length: 500 }),
    __metadata("design:type", String)
], Dokumen.prototype, "fileUrl", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Number)
], Dokumen.prototype, "fileSize", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => DocumentStatus, default: DocumentStatus.PENDING }),
    __metadata("design:type", String)
], Dokumen.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Dokumen.prototype, "rejectionReason", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User, { nullable: true, fieldName: 'verified_by' }),
    __metadata("design:type", user_entity_1.User)
], Dokumen.prototype, "verifiedBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Dokumen.prototype, "verifiedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], Dokumen.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Dokumen.prototype, "updatedAt", void 0);
exports.Dokumen = Dokumen = __decorate([
    (0, core_1.Entity)({ tableName: 'dokumen' })
], Dokumen);
//# sourceMappingURL=dokumen.entity.js.map
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
exports.Jurnal = exports.JurnalStatus = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const mahasiswa_entity_1 = require("./mahasiswa.entity");
const user_entity_1 = require("./user.entity");
var JurnalStatus;
(function (JurnalStatus) {
    JurnalStatus["DRAFT"] = "draft";
    JurnalStatus["SUBMITTED"] = "submitted";
    JurnalStatus["REVIEWED"] = "reviewed";
    JurnalStatus["APPROVED"] = "approved";
    JurnalStatus["REJECTED"] = "rejected";
})(JurnalStatus || (exports.JurnalStatus = JurnalStatus = {}));
let Jurnal = class Jurnal {
    id = (0, uuid_1.v4)();
    mahasiswa;
    title;
    content;
    fileName;
    fileUrl;
    fileSize;
    status = JurnalStatus.DRAFT;
    reviewedBy;
    reviewedAt;
    createdAt = new Date();
    updatedAt = new Date();
};
exports.Jurnal = Jurnal;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Jurnal.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => mahasiswa_entity_1.Mahasiswa, { fieldName: 'mahasiswa_id' }),
    __metadata("design:type", mahasiswa_entity_1.Mahasiswa)
], Jurnal.prototype, "mahasiswa", void 0);
__decorate([
    (0, core_1.Property)({ length: 255 }),
    __metadata("design:type", String)
], Jurnal.prototype, "title", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Jurnal.prototype, "content", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Jurnal.prototype, "fileName", void 0);
__decorate([
    (0, core_1.Property)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Jurnal.prototype, "fileUrl", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Number)
], Jurnal.prototype, "fileSize", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => JurnalStatus, default: JurnalStatus.DRAFT }),
    __metadata("design:type", String)
], Jurnal.prototype, "status", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User, { nullable: true, fieldName: 'reviewed_by' }),
    __metadata("design:type", user_entity_1.User)
], Jurnal.prototype, "reviewedBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], Jurnal.prototype, "reviewedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], Jurnal.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Jurnal.prototype, "updatedAt", void 0);
exports.Jurnal = Jurnal = __decorate([
    (0, core_1.Entity)({ tableName: 'jurnal' })
], Jurnal);
//# sourceMappingURL=jurnal.entity.js.map
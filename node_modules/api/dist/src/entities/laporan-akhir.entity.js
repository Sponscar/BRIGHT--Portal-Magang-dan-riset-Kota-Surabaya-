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
exports.LaporanAkhir = exports.LaporanStatus = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const mahasiswa_entity_1 = require("./mahasiswa.entity");
const user_entity_1 = require("./user.entity");
var LaporanStatus;
(function (LaporanStatus) {
    LaporanStatus["PENDING"] = "pending";
    LaporanStatus["APPROVED"] = "approved";
    LaporanStatus["REJECTED"] = "rejected";
})(LaporanStatus || (exports.LaporanStatus = LaporanStatus = {}));
let LaporanAkhir = class LaporanAkhir {
    id = (0, uuid_1.v4)();
    mahasiswa;
    title;
    fileName;
    fileUrl;
    fileSize;
    status = LaporanStatus.PENDING;
    rejectionReason;
    submittedAt = new Date();
    reviewedBy;
    reviewedAt;
    createdAt = new Date();
};
exports.LaporanAkhir = LaporanAkhir;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], LaporanAkhir.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => mahasiswa_entity_1.Mahasiswa, { fieldName: 'mahasiswa_id' }),
    __metadata("design:type", mahasiswa_entity_1.Mahasiswa)
], LaporanAkhir.prototype, "mahasiswa", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], LaporanAkhir.prototype, "title", void 0);
__decorate([
    (0, core_1.Property)({ length: 255 }),
    __metadata("design:type", String)
], LaporanAkhir.prototype, "fileName", void 0);
__decorate([
    (0, core_1.Property)({ length: 500 }),
    __metadata("design:type", String)
], LaporanAkhir.prototype, "fileUrl", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Number)
], LaporanAkhir.prototype, "fileSize", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => LaporanStatus, default: LaporanStatus.PENDING }),
    __metadata("design:type", String)
], LaporanAkhir.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], LaporanAkhir.prototype, "rejectionReason", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], LaporanAkhir.prototype, "submittedAt", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User, { nullable: true, fieldName: 'reviewed_by' }),
    __metadata("design:type", user_entity_1.User)
], LaporanAkhir.prototype, "reviewedBy", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], LaporanAkhir.prototype, "reviewedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], LaporanAkhir.prototype, "createdAt", void 0);
exports.LaporanAkhir = LaporanAkhir = __decorate([
    (0, core_1.Entity)({ tableName: 'laporan_akhir' })
], LaporanAkhir);
//# sourceMappingURL=laporan-akhir.entity.js.map
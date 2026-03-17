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
exports.Penilaian = exports.PenilaianComponent = exports.AssessorType = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
const mahasiswa_entity_1 = require("./mahasiswa.entity");
const user_entity_1 = require("./user.entity");
var AssessorType;
(function (AssessorType) {
    AssessorType["SELF"] = "self";
    AssessorType["PEER"] = "peer";
    AssessorType["KOORDINATOR"] = "koordinator";
    AssessorType["SEKRETARIS"] = "sekretaris";
    AssessorType["KEPALA_BRIDA"] = "kepala_brida";
    AssessorType["ADMIN"] = "admin";
})(AssessorType || (exports.AssessorType = AssessorType = {}));
var PenilaianComponent;
(function (PenilaianComponent) {
    PenilaianComponent["PERILAKU"] = "perilaku";
    PenilaianComponent["KINERJA"] = "kinerja";
})(PenilaianComponent || (exports.PenilaianComponent = PenilaianComponent = {}));
let Penilaian = class Penilaian {
    id = (0, uuid_1.v4)();
    mahasiswa;
    assessedBy;
    assessorType;
    component;
    peerMahasiswa;
    finalScore;
    feedback;
    nilaiList = new core_1.Collection(this);
    createdAt = new Date();
    updatedAt = new Date();
};
exports.Penilaian = Penilaian;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Penilaian.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => mahasiswa_entity_1.Mahasiswa, { fieldName: 'mahasiswa_id' }),
    __metadata("design:type", mahasiswa_entity_1.Mahasiswa)
], Penilaian.prototype, "mahasiswa", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User, { fieldName: 'assessed_by' }),
    __metadata("design:type", user_entity_1.User)
], Penilaian.prototype, "assessedBy", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => AssessorType }),
    __metadata("design:type", String)
], Penilaian.prototype, "assessorType", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => PenilaianComponent }),
    __metadata("design:type", String)
], Penilaian.prototype, "component", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => mahasiswa_entity_1.Mahasiswa, { nullable: true, fieldName: 'peer_mahasiswa_id' }),
    __metadata("design:type", mahasiswa_entity_1.Mahasiswa)
], Penilaian.prototype, "peerMahasiswa", void 0);
__decorate([
    (0, core_1.Property)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Penilaian.prototype, "finalScore", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Penilaian.prototype, "feedback", void 0);
__decorate([
    (0, core_1.OneToMany)('NilaiPenilaian', 'penilaian'),
    __metadata("design:type", Object)
], Penilaian.prototype, "nilaiList", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], Penilaian.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Penilaian.prototype, "updatedAt", void 0);
exports.Penilaian = Penilaian = __decorate([
    (0, core_1.Entity)({ tableName: 'penilaian' }),
    (0, core_1.Unique)({ properties: ['mahasiswa', 'assessedBy', 'assessorType', 'component'] })
], Penilaian);
//# sourceMappingURL=penilaian.entity.js.map
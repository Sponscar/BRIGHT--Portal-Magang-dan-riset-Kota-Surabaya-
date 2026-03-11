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
exports.KriteriaPenilaian = exports.PenilaianCategory = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
var PenilaianCategory;
(function (PenilaianCategory) {
    PenilaianCategory["BEHAVIOR"] = "behavior";
    PenilaianCategory["PERFORMANCE"] = "performance";
})(PenilaianCategory || (exports.PenilaianCategory = PenilaianCategory = {}));
let KriteriaPenilaian = class KriteriaPenilaian {
    id = (0, uuid_1.v4)();
    name;
    category;
    bobot;
    description;
    isActive = true;
    displayOrder;
    createdAt = new Date();
};
exports.KriteriaPenilaian = KriteriaPenilaian;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], KriteriaPenilaian.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, unique: true }),
    __metadata("design:type", String)
], KriteriaPenilaian.prototype, "name", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => PenilaianCategory }),
    __metadata("design:type", String)
], KriteriaPenilaian.prototype, "category", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], KriteriaPenilaian.prototype, "bobot", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], KriteriaPenilaian.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ default: true }),
    __metadata("design:type", Boolean)
], KriteriaPenilaian.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Number)
], KriteriaPenilaian.prototype, "displayOrder", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], KriteriaPenilaian.prototype, "createdAt", void 0);
exports.KriteriaPenilaian = KriteriaPenilaian = __decorate([
    (0, core_1.Entity)({ tableName: 'kriteria_penilaian' })
], KriteriaPenilaian);
//# sourceMappingURL=kriteria-penilaian.entity.js.map
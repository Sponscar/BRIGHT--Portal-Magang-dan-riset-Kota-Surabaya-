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
exports.Opd = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
let Opd = class Opd {
    id = (0, uuid_1.v4)();
    nama;
    slug;
    alamat;
    telp;
    email;
    isActive = true;
    createdAt = new Date();
    updatedAt = new Date();
};
exports.Opd = Opd;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Opd.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, unique: true }),
    __metadata("design:type", String)
], Opd.prototype, "nama", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, unique: true }),
    __metadata("design:type", String)
], Opd.prototype, "slug", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Opd.prototype, "alamat", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Opd.prototype, "telp", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Opd.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ default: true }),
    __metadata("design:type", Boolean)
], Opd.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], Opd.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Opd.prototype, "updatedAt", void 0);
exports.Opd = Opd = __decorate([
    (0, core_1.Entity)({ tableName: 'opd' })
], Opd);
//# sourceMappingURL=opd.entity.js.map
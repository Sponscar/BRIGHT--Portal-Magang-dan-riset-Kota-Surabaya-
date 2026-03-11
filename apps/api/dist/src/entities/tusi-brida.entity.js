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
exports.TusiBrida = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
let TusiBrida = class TusiBrida {
    id = (0, uuid_1.v4)();
    name;
    slug;
    shortDescription;
    fullDescription;
    icon;
    imageUrl;
    responsibilities;
    requirements;
    isActive = true;
    displayOrder;
    createdAt = new Date();
    updatedAt = new Date();
};
exports.TusiBrida = TusiBrida;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], TusiBrida.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, unique: true }),
    __metadata("design:type", String)
], TusiBrida.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)({ length: 100, unique: true }),
    __metadata("design:type", String)
], TusiBrida.prototype, "slug", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TusiBrida.prototype, "shortDescription", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TusiBrida.prototype, "fullDescription", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], TusiBrida.prototype, "icon", void 0);
__decorate([
    (0, core_1.Property)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], TusiBrida.prototype, "imageUrl", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TusiBrida.prototype, "responsibilities", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TusiBrida.prototype, "requirements", void 0);
__decorate([
    (0, core_1.Property)({ default: true }),
    __metadata("design:type", Boolean)
], TusiBrida.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Number)
], TusiBrida.prototype, "displayOrder", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], TusiBrida.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], TusiBrida.prototype, "updatedAt", void 0);
exports.TusiBrida = TusiBrida = __decorate([
    (0, core_1.Entity)({ tableName: 'tusi_brida' })
], TusiBrida);
//# sourceMappingURL=tusi-brida.entity.js.map
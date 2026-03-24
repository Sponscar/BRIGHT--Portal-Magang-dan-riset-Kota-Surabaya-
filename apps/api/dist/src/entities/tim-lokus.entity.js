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
exports.TimLokus = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
let TimLokus = class TimLokus {
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
    opd;
    createdAt = new Date();
    updatedAt = new Date();
};
exports.TimLokus = TimLokus;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], TimLokus.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], TimLokus.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)({ length: 100 }),
    __metadata("design:type", String)
], TimLokus.prototype, "slug", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TimLokus.prototype, "shortDescription", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TimLokus.prototype, "fullDescription", void 0);
__decorate([
    (0, core_1.Property)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], TimLokus.prototype, "icon", void 0);
__decorate([
    (0, core_1.Property)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], TimLokus.prototype, "imageUrl", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TimLokus.prototype, "responsibilities", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TimLokus.prototype, "requirements", void 0);
__decorate([
    (0, core_1.Property)({ default: true }),
    __metadata("design:type", Boolean)
], TimLokus.prototype, "isActive", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Number)
], TimLokus.prototype, "displayOrder", void 0);
__decorate([
    (0, core_1.ManyToOne)('Opd', { nullable: true, fieldName: 'opd_id' }),
    __metadata("design:type", Function)
], TimLokus.prototype, "opd", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], TimLokus.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], TimLokus.prototype, "updatedAt", void 0);
exports.TimLokus = TimLokus = __decorate([
    (0, core_1.Entity)({ tableName: 'tim_lokus' })
], TimLokus);
//# sourceMappingURL=tim-lokus.entity.js.map
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
exports.Feedback = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
let Feedback = class Feedback {
    id = (0, uuid_1.v4)();
    nama;
    email;
    rating;
    komentar;
    createdAt = new Date();
};
exports.Feedback = Feedback;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Feedback.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ length: 200 }),
    __metadata("design:type", String)
], Feedback.prototype, "nama", void 0);
__decorate([
    (0, core_1.Property)({ length: 200 }),
    __metadata("design:type", String)
], Feedback.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ type: 'smallint' }),
    __metadata("design:type", Number)
], Feedback.prototype, "rating", void 0);
__decorate([
    (0, core_1.Property)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Feedback.prototype, "komentar", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], Feedback.prototype, "createdAt", void 0);
exports.Feedback = Feedback = __decorate([
    (0, core_1.Entity)({ tableName: 'feedback' })
], Feedback);
//# sourceMappingURL=feedback.entity.js.map
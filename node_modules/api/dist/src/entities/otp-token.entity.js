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
exports.OtpToken = exports.OtpType = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
var OtpType;
(function (OtpType) {
    OtpType["REGISTER"] = "register";
    OtpType["RESET_PASSWORD"] = "reset_password";
})(OtpType || (exports.OtpType = OtpType = {}));
let OtpToken = class OtpToken {
    id = (0, uuid_1.v4)();
    email;
    code;
    type;
    expiresAt;
    used = false;
    createdAt = new Date();
};
exports.OtpToken = OtpToken;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], OtpToken.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ length: 255 }),
    __metadata("design:type", String)
], OtpToken.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ length: 6 }),
    __metadata("design:type", String)
], OtpToken.prototype, "code", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => OtpType }),
    __metadata("design:type", String)
], OtpToken.prototype, "type", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], OtpToken.prototype, "expiresAt", void 0);
__decorate([
    (0, core_1.Property)({ default: false }),
    __metadata("design:type", Boolean)
], OtpToken.prototype, "used", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], OtpToken.prototype, "createdAt", void 0);
exports.OtpToken = OtpToken = __decorate([
    (0, core_1.Entity)({ tableName: 'otp_tokens' })
], OtpToken);
//# sourceMappingURL=otp-token.entity.js.map
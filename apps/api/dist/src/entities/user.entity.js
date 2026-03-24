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
exports.User = exports.ROLE_PERMISSION_MAP = exports.PermissionLevel = exports.UserRole = void 0;
const core_1 = require("@mikro-orm/core");
const uuid_1 = require("uuid");
var UserRole;
(function (UserRole) {
    UserRole["STUDENT"] = "student";
    UserRole["ADMIN_OPD"] = "admin_opd";
    UserRole["KOORDINATOR_OPD"] = "koordinator_opd";
    UserRole["KEPALA_BRIDA"] = "kepala_brida";
    UserRole["SEKRETARIATAN"] = "sekretariatan";
    UserRole["KOORDINATOR_RISET"] = "koordinator_riset";
    UserRole["KOORDINATOR_INOVASI"] = "koordinator_inovasi";
    UserRole["KATIMJA_FASILITASI_RISET"] = "katimja_fasilitasi_riset";
    UserRole["KATIMJA_KOLABORASI_RISET"] = "katimja_kolaborasi_riset";
    UserRole["KATIMJA_APRESIASI_INOVASI"] = "katimja_apresiasi_inovasi";
    UserRole["KATIMJA_DIFUSI_INOVASI"] = "katimja_difusi_inovasi";
    UserRole["STAF_FUNGSIONAL"] = "staf_fungsional";
    UserRole["STAF_PELAKSANA"] = "staf_pelaksana";
    UserRole["STAF_NON_ASN"] = "staf_non_asn";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var PermissionLevel;
(function (PermissionLevel) {
    PermissionLevel["STUDENT"] = "student";
    PermissionLevel["VIEWER"] = "viewer";
    PermissionLevel["EDITOR"] = "editor";
    PermissionLevel["ADMIN"] = "admin";
})(PermissionLevel || (exports.PermissionLevel = PermissionLevel = {}));
exports.ROLE_PERMISSION_MAP = {
    [UserRole.STUDENT]: PermissionLevel.STUDENT,
    [UserRole.ADMIN_OPD]: PermissionLevel.EDITOR,
    [UserRole.KOORDINATOR_OPD]: PermissionLevel.EDITOR,
    [UserRole.KEPALA_BRIDA]: PermissionLevel.EDITOR,
    [UserRole.SEKRETARIATAN]: PermissionLevel.EDITOR,
    [UserRole.KOORDINATOR_RISET]: PermissionLevel.EDITOR,
    [UserRole.KOORDINATOR_INOVASI]: PermissionLevel.EDITOR,
    [UserRole.KATIMJA_FASILITASI_RISET]: PermissionLevel.EDITOR,
    [UserRole.KATIMJA_KOLABORASI_RISET]: PermissionLevel.EDITOR,
    [UserRole.KATIMJA_APRESIASI_INOVASI]: PermissionLevel.EDITOR,
    [UserRole.KATIMJA_DIFUSI_INOVASI]: PermissionLevel.EDITOR,
    [UserRole.STAF_FUNGSIONAL]: PermissionLevel.EDITOR,
    [UserRole.STAF_PELAKSANA]: PermissionLevel.EDITOR,
    [UserRole.STAF_NON_ASN]: PermissionLevel.ADMIN,
    [UserRole.ADMIN]: PermissionLevel.ADMIN,
};
let User = class User {
    id = (0, uuid_1.v4)();
    name;
    email;
    passwordHash;
    role = UserRole.STUDENT;
    emailVerified = false;
    createdAt = new Date();
    updatedAt = new Date();
    opd;
};
exports.User = User;
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ length: 255 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)({ length: 255, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ length: 255 }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, core_1.Enum)({ items: () => UserRole, default: UserRole.STUDENT }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, core_1.Property)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'timestamptz', defaultRaw: 'NOW()', onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.ManyToOne)('Opd', { nullable: true, fieldName: 'opd_id' }),
    __metadata("design:type", Function)
], User.prototype, "opd", void 0);
exports.User = User = __decorate([
    (0, core_1.Entity)({ tableName: 'users' })
], User);
//# sourceMappingURL=user.entity.js.map
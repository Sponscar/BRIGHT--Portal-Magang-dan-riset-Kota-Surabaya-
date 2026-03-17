"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KurikulumMagangModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_1 = require("@mikro-orm/nestjs");
const entities_1 = require("../../entities");
const kurikulum_magang_controller_1 = require("./kurikulum-magang.controller");
const kurikulum_magang_service_1 = require("./kurikulum-magang.service");
let KurikulumMagangModule = class KurikulumMagangModule {
};
exports.KurikulumMagangModule = KurikulumMagangModule;
exports.KurikulumMagangModule = KurikulumMagangModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_1.MikroOrmModule.forFeature([entities_1.KurikulumMagang])],
        controllers: [kurikulum_magang_controller_1.KurikulumMagangController],
        providers: [kurikulum_magang_service_1.KurikulumMagangService],
        exports: [kurikulum_magang_service_1.KurikulumMagangService],
    })
], KurikulumMagangModule);
//# sourceMappingURL=kurikulum-magang.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministrasiModule = void 0;
const common_1 = require("@nestjs/common");
const administrasi_controller_1 = require("./administrasi.controller");
const administrasi_service_1 = require("./administrasi.service");
let AdministrasiModule = class AdministrasiModule {
};
exports.AdministrasiModule = AdministrasiModule;
exports.AdministrasiModule = AdministrasiModule = __decorate([
    (0, common_1.Module)({ controllers: [administrasi_controller_1.AdministrasiController], providers: [administrasi_service_1.AdministrasiService], exports: [administrasi_service_1.AdministrasiService] })
], AdministrasiModule);
//# sourceMappingURL=administrasi.module.js.map
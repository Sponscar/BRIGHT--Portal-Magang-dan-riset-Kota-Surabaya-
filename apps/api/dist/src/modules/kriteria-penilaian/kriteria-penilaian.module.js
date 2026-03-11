"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KriteriaPenilaianModule = void 0;
const common_1 = require("@nestjs/common");
const kriteria_penilaian_controller_1 = require("./kriteria-penilaian.controller");
const kriteria_penilaian_service_1 = require("./kriteria-penilaian.service");
let KriteriaPenilaianModule = class KriteriaPenilaianModule {
};
exports.KriteriaPenilaianModule = KriteriaPenilaianModule;
exports.KriteriaPenilaianModule = KriteriaPenilaianModule = __decorate([
    (0, common_1.Module)({ controllers: [kriteria_penilaian_controller_1.KriteriaPenilaianController], providers: [kriteria_penilaian_service_1.KriteriaPenilaianService], exports: [kriteria_penilaian_service_1.KriteriaPenilaianService] })
], KriteriaPenilaianModule);
//# sourceMappingURL=kriteria-penilaian.module.js.map
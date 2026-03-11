"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MataKuliahModule = void 0;
const common_1 = require("@nestjs/common");
const mata_kuliah_controller_1 = require("./mata-kuliah.controller");
const mata_kuliah_service_1 = require("./mata-kuliah.service");
let MataKuliahModule = class MataKuliahModule {
};
exports.MataKuliahModule = MataKuliahModule;
exports.MataKuliahModule = MataKuliahModule = __decorate([
    (0, common_1.Module)({ controllers: [mata_kuliah_controller_1.MataKuliahController], providers: [mata_kuliah_service_1.MataKuliahService], exports: [mata_kuliah_service_1.MataKuliahService] })
], MataKuliahModule);
//# sourceMappingURL=mata-kuliah.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerguruanTinggiModule = void 0;
const common_1 = require("@nestjs/common");
const perguruan_tinggi_controller_1 = require("./perguruan-tinggi.controller");
const perguruan_tinggi_service_1 = require("./perguruan-tinggi.service");
let PerguruanTinggiModule = class PerguruanTinggiModule {
};
exports.PerguruanTinggiModule = PerguruanTinggiModule;
exports.PerguruanTinggiModule = PerguruanTinggiModule = __decorate([
    (0, common_1.Module)({ controllers: [perguruan_tinggi_controller_1.PerguruanTinggiController], providers: [perguruan_tinggi_service_1.PerguruanTinggiService], exports: [perguruan_tinggi_service_1.PerguruanTinggiService] })
], PerguruanTinggiModule);
//# sourceMappingURL=perguruan-tinggi.module.js.map
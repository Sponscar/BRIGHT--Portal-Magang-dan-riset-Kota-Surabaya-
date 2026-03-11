"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogbookModule = void 0;
const common_1 = require("@nestjs/common");
const logbook_controller_1 = require("./logbook.controller");
const logbook_service_1 = require("./logbook.service");
const storage_module_1 = require("../storage/storage.module");
let LogbookModule = class LogbookModule {
};
exports.LogbookModule = LogbookModule;
exports.LogbookModule = LogbookModule = __decorate([
    (0, common_1.Module)({ imports: [storage_module_1.StorageModule], controllers: [logbook_controller_1.LogbookController], providers: [logbook_service_1.LogbookService], exports: [logbook_service_1.LogbookService] })
], LogbookModule);
//# sourceMappingURL=logbook.module.js.map
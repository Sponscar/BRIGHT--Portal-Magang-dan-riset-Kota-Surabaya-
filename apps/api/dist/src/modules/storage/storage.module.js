"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = exports.MINIO_CLIENT = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Minio = __importStar(require("minio"));
const storage_service_1 = require("./storage.service");
exports.MINIO_CLIENT = 'MINIO_CLIENT';
const BUCKETS = [
    'profile-images',
    'dokumen',
    'logbook-attachments',
    'jurnal',
    'laporan-akhir',
    'sertifikat',
];
let StorageModule = class StorageModule {
};
exports.StorageModule = StorageModule;
exports.StorageModule = StorageModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: exports.MINIO_CLIENT,
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const client = new Minio.Client({
                        endPoint: configService.get('MINIO_ENDPOINT') || 'localhost',
                        port: Number(configService.get('MINIO_PORT')) || 9000,
                        useSSL: configService.get('MINIO_USE_SSL') === 'true',
                        accessKey: configService.get('MINIO_ACCESS_KEY') || 'minioadmin',
                        secretKey: configService.get('MINIO_SECRET_KEY') || 'minioadmin',
                    });
                    for (const bucket of BUCKETS) {
                        const exists = await client.bucketExists(bucket);
                        if (!exists) {
                            await client.makeBucket(bucket);
                        }
                    }
                    return client;
                },
            },
            storage_service_1.StorageService,
        ],
        exports: [storage_service_1.StorageService],
    })
], StorageModule);
//# sourceMappingURL=storage.module.js.map
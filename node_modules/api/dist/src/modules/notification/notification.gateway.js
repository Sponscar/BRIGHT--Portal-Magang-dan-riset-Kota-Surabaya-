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
var NotificationGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
let NotificationGateway = NotificationGateway_1 = class NotificationGateway {
    jwtService;
    server;
    logger = new common_1.Logger(NotificationGateway_1.name);
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    afterInit() {
        this.logger.log('✅ WebSocket Gateway initialized');
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth?.token ||
                client.handshake.headers?.authorization?.replace('Bearer ', '');
            if (!token) {
                this.logger.warn(`Client ${client.id} rejected — no token`);
                client.disconnect();
                return;
            }
            let userId;
            let role;
            try {
                const payload = this.jwtService.verify(token);
                userId = payload.sub;
                role = payload.role;
            }
            catch {
                if (token.startsWith('mock-token-')) {
                    userId = token.replace('mock-token-', '');
                    role = client.handshake.query?.role || 'STUDENT';
                    this.logger.warn(`Client ${client.id} using mock token (userId=${userId}, role=${role})`);
                }
                else {
                    throw new Error('Invalid token');
                }
            }
            client.userId = userId;
            client.userRole = role;
            client.join(`user:${userId}`);
            if (['ADMIN', 'KOORDINATOR_RISET', 'KOORDINATOR_INOVASI', 'SEKRETARIS', 'KEPALA_BRIDA', 'admin'].includes(role)) {
                client.join('staff');
                client.join('admin');
            }
            if (['MAHASISWA', 'STUDENT', 'student'].includes(role)) {
                client.join('mahasiswa');
            }
            this.logger.log(`🔌 Connected: ${client.id} (userId=${userId}, role=${role})`);
        }
        catch (err) {
            this.logger.warn(`Client ${client.id} rejected — invalid token: ${err.message}`);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        this.logger.log(`❌ Disconnected: ${client.id}`);
    }
    emitPenilaianSubmitted(data) {
        this.server.to('admin').emit('penilaian:submitted', {
            ...data,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`📡 penilaian:submitted → admin (${data.assessorType} menilai ${data.mahasiswaName})`);
    }
    emitPenilaianComplete(data) {
        this.server.to(`user:${data.mahasiswaId}`).emit('penilaian:complete', {
            ...data,
            timestamp: new Date().toISOString(),
        });
        this.server.to('admin').emit('penilaian:complete', {
            ...data,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`📡 penilaian:complete → user:${data.mahasiswaId} + admin (NA=${data.nilaiAkhir} ${data.grade})`);
    }
    emitSertifikatGenerated(data) {
        this.server.to(`user:${data.mahasiswaId}`).emit('sertifikat:generated', {
            ...data,
            timestamp: new Date().toISOString(),
        });
        this.server.to('admin').emit('sertifikat:generated', {
            ...data,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`📡 sertifikat:generated → user:${data.mahasiswaId} (${data.nomorSertifikat})`);
    }
    emitMahasiswaRegistered(data) {
        this.server.to('admin').emit('mahasiswa:registered', {
            ...data,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`📡 mahasiswa:registered → admin (${data.fullName})`);
    }
    emitDataUpdated(data) {
        this.server.to('admin').emit('data:updated', {
            ...data,
            timestamp: new Date().toISOString(),
        });
        if (data.mahasiswaId) {
            this.server.to(`user:${data.mahasiswaId}`).emit('data:updated', {
                ...data,
                timestamp: new Date().toISOString(),
            });
        }
        this.logger.log(`📡 data:updated → admin (${data.type}:${data.action})`);
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
exports.NotificationGateway = NotificationGateway = NotificationGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['http://localhost:5173', 'http://localhost:3000'],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map
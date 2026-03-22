import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        credentials: true,
    },
})
export class NotificationGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(NotificationGateway.name);

    constructor(private readonly jwtService: JwtService) {}

    afterInit() {
        this.logger.log('✅ WebSocket Gateway initialized');
    }

    async handleConnection(client: Socket) {
        try {
            const token =
                client.handshake.auth?.token ||
                client.handshake.headers?.authorization?.replace('Bearer ', '');

            if (!token) {
                this.logger.warn(`Client ${client.id} rejected — no token`);
                client.disconnect();
                return;
            }

            let userId: string;
            let role: string;

            // Coba JWT dulu, fallback ke mock token untuk testing lokal
            try {
                const payload = this.jwtService.verify(token);
                userId = payload.sub;
                role = payload.role;
            } catch {
                // Mock token format: "mock-token-{userId}"
                if (token.startsWith('mock-token-')) {
                    userId = token.replace('mock-token-', '');
                    // Ambil role dari query params atau default
                    role = (client.handshake.query?.role as string) || 'STUDENT';
                    this.logger.warn(`Client ${client.id} using mock token (userId=${userId}, role=${role})`);
                } else {
                    throw new Error('Invalid token');
                }
            }

            // Attach user info ke socket
            (client as any).userId = userId;
            (client as any).userRole = role;

            // Join rooms berdasarkan role
            client.join(`user:${userId}`);

            if (['ADMIN', 'KOORDINATOR_RISET', 'KOORDINATOR_INOVASI', 'SEKRETARIS', 'KEPALA_BRIDA', 'admin'].includes(role)) {
                client.join('staff');
                client.join('admin');
            }

            if (['MAHASISWA', 'STUDENT', 'student'].includes(role)) {
                client.join('mahasiswa');
            }

            this.logger.log(`🔌 Connected: ${client.id} (userId=${userId}, role=${role})`);
        } catch (err) {
            this.logger.warn(`Client ${client.id} rejected — invalid token: ${err.message}`);
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`❌ Disconnected: ${client.id}`);
    }

    // ─── Emit Helpers ───

    /** Penilaian disubmit oleh assessor (self/peer/koordinator/admin) */
    emitPenilaianSubmitted(data: {
        mahasiswaId: string;
        mahasiswaName: string;
        assessorType: string;
        assessorName: string;
        component: string;
    }) {
        this.server.to('admin').emit('penilaian:submitted', {
            ...data,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`📡 penilaian:submitted → admin (${data.assessorType} menilai ${data.mahasiswaName})`);
    }

    /** Nilai akhir berhasil dihitung */
    emitPenilaianComplete(data: {
        mahasiswaId: string;
        mahasiswaName: string;
        nilaiAkhir: number;
        grade: string;
        predikat: string;
    }) {
        // Kirim ke mahasiswa yang dinilai
        this.server.to(`user:${data.mahasiswaId}`).emit('penilaian:complete', {
            ...data,
            timestamp: new Date().toISOString(),
        });
        // Kirim ke admin juga
        this.server.to('admin').emit('penilaian:complete', {
            ...data,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`📡 penilaian:complete → user:${data.mahasiswaId} + admin (NA=${data.nilaiAkhir} ${data.grade})`);
    }

    /** Sertifikat berhasil digenerate */
    emitSertifikatGenerated(data: {
        mahasiswaId: string;
        mahasiswaName: string;
        nomorSertifikat: string;
    }) {
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

    /** Mahasiswa baru mendaftar */
    emitMahasiswaRegistered(data: {
        mahasiswaId: string;
        fullName: string;
        university: string;
        lokus: string;
    }) {
        this.server.to('admin').emit('mahasiswa:registered', {
            ...data,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`📡 mahasiswa:registered → admin (${data.fullName})`);
    }

    /** Event generik untuk semua data (logbook, jurnal, presensi, dll) */
    emitDataUpdated(data: {
        type: string;   // 'logbook' | 'jurnal' | 'presensi' | 'dokumen' | 'laporan_akhir' | etc
        action: string; // 'created' | 'updated' | 'deleted'
        mahasiswaId?: string;
        mahasiswaName?: string;
        detail?: string;
    }) {
        // Kirim ke admin
        this.server.to('admin').emit('data:updated', {
            ...data,
            timestamp: new Date().toISOString(),
        });
        // Jika ada mahasiswaId, kirim ke mahasiswa juga
        if (data.mahasiswaId) {
            this.server.to(`user:${data.mahasiswaId}`).emit('data:updated', {
                ...data,
                timestamp: new Date().toISOString(),
            });
        }
        this.logger.log(`📡 data:updated → admin (${data.type}:${data.action})`);
    }
}

import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
export declare class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    server: Server;
    private readonly logger;
    constructor(jwtService: JwtService);
    afterInit(): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    emitPenilaianSubmitted(data: {
        mahasiswaId: string;
        mahasiswaName: string;
        assessorType: string;
        assessorName: string;
        component: string;
    }): void;
    emitPenilaianComplete(data: {
        mahasiswaId: string;
        mahasiswaName: string;
        nilaiAkhir: number;
        grade: string;
        predikat: string;
    }): void;
    emitSertifikatGenerated(data: {
        mahasiswaId: string;
        mahasiswaName: string;
        nomorSertifikat: string;
    }): void;
    emitMahasiswaRegistered(data: {
        mahasiswaId: string;
        fullName: string;
        university: string;
        lokus: string;
    }): void;
    emitDataUpdated(data: {
        type: string;
        action: string;
        mahasiswaId?: string;
        mahasiswaName?: string;
        detail?: string;
    }): void;
}

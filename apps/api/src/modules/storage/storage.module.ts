import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { StorageService } from './storage.service';

export const MINIO_CLIENT = 'MINIO_CLIENT';

const BUCKETS = [
    'profile-images',
    'dokumen',
    'logbook-attachments',
    'jurnal',
    'laporan-akhir',
    'sertifikat',
];

@Module({
    providers: [
        {
            provide: MINIO_CLIENT,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const client = new Minio.Client({
                    endPoint: configService.get<string>('MINIO_ENDPOINT') || 'localhost',
                    port: Number(configService.get<string>('MINIO_PORT')) || 9000,
                    useSSL: configService.get<string>('MINIO_USE_SSL') === 'true',
                    accessKey: configService.get<string>('MINIO_ACCESS_KEY') || 'minioadmin',
                    secretKey: configService.get<string>('MINIO_SECRET_KEY') || 'minioadmin',
                });

                // Ensure buckets exist
                for (const bucket of BUCKETS) {
                    const exists = await client.bucketExists(bucket);
                    if (!exists) {
                        await client.makeBucket(bucket);
                    }
                }

                return client;
            },
        },
        StorageService,
    ],
    exports: [StorageService],
})
export class StorageModule { }

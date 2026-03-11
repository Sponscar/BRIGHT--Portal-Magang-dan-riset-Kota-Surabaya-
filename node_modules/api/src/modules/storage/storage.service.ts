import { Injectable, Inject } from '@nestjs/common';
import * as Minio from 'minio';
import { v4 } from 'uuid';
import { MINIO_CLIENT } from './storage.module';

@Injectable()
export class StorageService {
    constructor(@Inject(MINIO_CLIENT) private readonly minioClient: Minio.Client) { }

    async upload(
        bucket: string,
        file: Express.Multer.File,
        folder?: string,
    ): Promise<{ objectKey: string; url: string }> {
        const ext = file.originalname.split('.').pop();
        const objectKey = folder
            ? `${folder}/${v4()}.${ext}`
            : `${v4()}.${ext}`;

        await this.minioClient.putObject(bucket, objectKey, file.buffer, file.size, {
            'Content-Type': file.mimetype,
        });

        return { objectKey, url: `/${bucket}/${objectKey}` };
    }

    async getPresignedUrl(bucket: string, objectKey: string, expirySeconds = 3600): Promise<string> {
        return this.minioClient.presignedGetObject(bucket, objectKey, expirySeconds);
    }

    async delete(bucket: string, objectKey: string): Promise<void> {
        await this.minioClient.removeObject(bucket, objectKey);
    }
}

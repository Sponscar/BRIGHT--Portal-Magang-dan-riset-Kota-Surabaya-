import * as Minio from 'minio';
export declare class StorageService {
    private readonly minioClient;
    constructor(minioClient: Minio.Client);
    upload(bucket: string, file: Express.Multer.File, folder?: string): Promise<{
        objectKey: string;
        url: string;
    }>;
    getPresignedUrl(bucket: string, objectKey: string, expirySeconds?: number): Promise<string>;
    delete(bucket: string, objectKey: string): Promise<void>;
}

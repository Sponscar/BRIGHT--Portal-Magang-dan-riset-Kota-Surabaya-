import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Dokumen, DocumentType, DocumentStatus, Mahasiswa, User } from '../../entities';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class DokumenService {
    constructor(private readonly em: EntityManager, private readonly storageService: StorageService) { }

    async upload(userId: string, file: Express.Multer.File, documentType: DocumentType) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(Mahasiswa, { user: { id: userId } });
        const { objectKey } = await this.storageService.upload('dokumen', file);

        const dokumen = new Dokumen();
        dokumen.mahasiswa = mahasiswa;
        dokumen.documentType = documentType;
        dokumen.fileName = file.originalname;
        dokumen.fileUrl = objectKey;
        dokumen.fileSize = file.size;
        fork.persist(dokumen);
        await fork.flush();
        return dokumen;
    }

    async findByUser(userId: string) {
        const fork = this.em.fork();
        return fork.find(Dokumen, { mahasiswa: { user: { id: userId } } }, { orderBy: { createdAt: 'DESC' } });
    }

    async reUpload(id: string, userId: string, file: Express.Multer.File) {
        const fork = this.em.fork();
        const dokumen = await fork.findOne(Dokumen, { id, mahasiswa: { user: { id: userId } } });
        if (!dokumen) throw new NotFoundException('Dokumen tidak ditemukan');
        if (dokumen.fileUrl) { try { await this.storageService.delete('dokumen', dokumen.fileUrl); } catch { } }
        const { objectKey } = await this.storageService.upload('dokumen', file);
        dokumen.fileName = file.originalname;
        dokumen.fileUrl = objectKey;
        dokumen.fileSize = file.size;
        dokumen.status = DocumentStatus.PENDING;
        await fork.flush();
        return dokumen;
    }

    async findAll() {
        const fork = this.em.fork();
        return fork.find(Dokumen, {}, { populate: ['mahasiswa', 'mahasiswa.user'], orderBy: { createdAt: 'DESC' } });
    }

    async verify(id: string, status: DocumentStatus, verifiedByUserId: string, rejectionReason?: string) {
        const fork = this.em.fork();
        const dokumen = await fork.findOne(Dokumen, { id });
        if (!dokumen) throw new NotFoundException('Dokumen tidak ditemukan');
        const verifiedBy = await fork.findOneOrFail(User, { id: verifiedByUserId });
        dokumen.status = status;
        dokumen.verifiedBy = verifiedBy;
        dokumen.verifiedAt = new Date();
        if (rejectionReason) dokumen.rejectionReason = rejectionReason;
        await fork.flush();
        return dokumen;
    }

    async getPresignedUrl(id: string) {
        const fork = this.em.fork();
        const dokumen = await fork.findOne(Dokumen, { id });
        if (!dokumen) throw new NotFoundException('Dokumen tidak ditemukan');
        return { url: await this.storageService.getPresignedUrl('dokumen', dokumen.fileUrl) };
    }
}

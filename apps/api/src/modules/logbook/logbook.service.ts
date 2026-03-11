import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Logbook, LogbookStatus, Mahasiswa, User } from '../../entities';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class LogbookService {
    constructor(private readonly em: EntityManager, private readonly storageService: StorageService) { }

    async create(userId: string, data: any, file?: Express.Multer.File) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(Mahasiswa, { user: { id: userId } });
        const logbook = new Logbook();
        Object.assign(logbook, data);
        logbook.mahasiswa = mahasiswa;
        logbook.logDate = new Date(data.logDate);
        if (file) { const { objectKey } = await this.storageService.upload('logbook-attachments', file); logbook.attachmentUrl = objectKey; }
        fork.persist(logbook);
        await fork.flush();
        return logbook;
    }

    async findByUser(userId: string, filters?: { status?: LogbookStatus }) {
        const where: any = { mahasiswa: { user: { id: userId } }, deletedAt: null };
        if (filters?.status) where.status = filters.status;
        return this.em.fork().find(Logbook, where, { populate: ['jenisAktivitas', 'mataKuliah'], orderBy: { logDate: 'DESC' } });
    }

    async update(id: string, userId: string, data: any, file?: Express.Multer.File) {
        const fork = this.em.fork();
        const logbook = await fork.findOne(Logbook, { id, mahasiswa: { user: { id: userId } } });
        if (!logbook) throw new NotFoundException('Logbook tidak ditemukan');
        Object.assign(logbook, data);
        if (data.logDate) logbook.logDate = new Date(data.logDate);
        if (file) { const { objectKey } = await this.storageService.upload('logbook-attachments', file); logbook.attachmentUrl = objectKey; }
        await fork.flush();
        return logbook;
    }

    async softDelete(id: string, userId: string) {
        const fork = this.em.fork();
        const logbook = await fork.findOne(Logbook, { id, mahasiswa: { user: { id: userId } } });
        if (!logbook) throw new NotFoundException('Logbook tidak ditemukan');
        logbook.deletedAt = new Date();
        await fork.flush();
        return { message: 'Logbook berhasil dihapus' };
    }

    async findAll(filters?: { status?: LogbookStatus }) {
        const where: any = { deletedAt: null };
        if (filters?.status) where.status = filters.status;
        return this.em.fork().find(Logbook, where, { populate: ['mahasiswa', 'mahasiswa.user', 'jenisAktivitas'], orderBy: { logDate: 'DESC' } });
    }

    async findById(id: string) {
        const logbook = await this.em.fork().findOne(Logbook, { id }, { populate: ['mahasiswa', 'mahasiswa.user', 'jenisAktivitas', 'mataKuliah'] });
        if (!logbook) throw new NotFoundException('Logbook tidak ditemukan');
        return logbook;
    }

    async review(id: string, status: LogbookStatus, reviewedByUserId: string) {
        const fork = this.em.fork();
        const logbook = await fork.findOne(Logbook, { id });
        if (!logbook) throw new NotFoundException('Logbook tidak ditemukan');
        const reviewer = await fork.findOneOrFail(User, { id: reviewedByUserId });
        logbook.status = status;
        logbook.reviewedBy = reviewer;
        logbook.reviewedAt = new Date();
        await fork.flush();
        return logbook;
    }
}

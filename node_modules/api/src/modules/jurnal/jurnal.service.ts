import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Jurnal, JurnalStatus, Mahasiswa, User } from '../../entities';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class JurnalService {
    constructor(private readonly em: EntityManager, private readonly storageService: StorageService) { }

    async create(userId: string, data: any, file?: Express.Multer.File) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(Mahasiswa, { user: { id: userId } });
        const jurnal = new Jurnal();
        Object.assign(jurnal, data);
        jurnal.mahasiswa = mahasiswa;
        if (file) { const { objectKey } = await this.storageService.upload('jurnal', file); jurnal.fileUrl = objectKey; jurnal.fileName = file.originalname; jurnal.fileSize = file.size; }
        fork.persist(jurnal);
        await fork.flush();
        return jurnal;
    }

    async findByUser(userId: string) { return this.em.fork().find(Jurnal, { mahasiswa: { user: { id: userId } } }, { orderBy: { createdAt: 'DESC' } }); }
    async update(id: string, userId: string, data: any, file?: Express.Multer.File) {
        const fork = this.em.fork();
        const jurnal = await fork.findOne(Jurnal, { id, mahasiswa: { user: { id: userId } } });
        if (!jurnal) throw new NotFoundException('Jurnal tidak ditemukan');
        Object.assign(jurnal, data);
        if (file) { const { objectKey } = await this.storageService.upload('jurnal', file); jurnal.fileUrl = objectKey; jurnal.fileName = file.originalname; jurnal.fileSize = file.size; }
        await fork.flush();
        return jurnal;
    }
    async delete(id: string, userId: string) {
        const fork = this.em.fork();
        const jurnal = await fork.findOne(Jurnal, { id, mahasiswa: { user: { id: userId } } });
        if (!jurnal) throw new NotFoundException('Jurnal tidak ditemukan');
        await fork.removeAndFlush(jurnal);
        return { message: 'Jurnal berhasil dihapus' };
    }
    async findAll() { return this.em.fork().find(Jurnal, {}, { populate: ['mahasiswa', 'mahasiswa.user'], orderBy: { createdAt: 'DESC' } }); }
    async review(id: string, status: JurnalStatus, reviewedByUserId: string) {
        const fork = this.em.fork();
        const jurnal = await fork.findOne(Jurnal, { id });
        if (!jurnal) throw new NotFoundException('Jurnal tidak ditemukan');
        jurnal.status = status;
        jurnal.reviewedBy = await fork.findOneOrFail(User, { id: reviewedByUserId });
        jurnal.reviewedAt = new Date();
        await fork.flush();
        return jurnal;
    }
}

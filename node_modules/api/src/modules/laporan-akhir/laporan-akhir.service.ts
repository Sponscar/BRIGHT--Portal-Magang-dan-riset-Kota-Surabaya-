import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { LaporanAkhir, LaporanStatus, Mahasiswa, User } from '../../entities';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class LaporanAkhirService {
    constructor(private readonly em: EntityManager, private readonly storageService: StorageService) { }

    async submit(userId: string, file: Express.Multer.File, title?: string) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(Mahasiswa, { user: { id: userId } });
        const { objectKey } = await this.storageService.upload('laporan-akhir', file);
        const laporan = new LaporanAkhir();
        laporan.mahasiswa = mahasiswa;
        laporan.title = title;
        laporan.fileName = file.originalname;
        laporan.fileUrl = objectKey;
        laporan.fileSize = file.size;
        fork.persist(laporan);
        await fork.flush();
        return laporan;
    }

    async findByUser(userId: string) { return this.em.fork().find(LaporanAkhir, { mahasiswa: { user: { id: userId } } }, { orderBy: { createdAt: 'DESC' } }); }
    async findAll() { return this.em.fork().find(LaporanAkhir, {}, { populate: ['mahasiswa', 'mahasiswa.user', 'reviewedBy'], orderBy: { createdAt: 'DESC' } }); }
    async review(id: string, status: LaporanStatus, reviewedByUserId: string, rejectionReason?: string) {
        const fork = this.em.fork();
        const laporan = await fork.findOne(LaporanAkhir, { id });
        if (!laporan) throw new NotFoundException('Laporan akhir tidak ditemukan');
        laporan.status = status;
        laporan.reviewedBy = await fork.findOneOrFail(User, { id: reviewedByUserId });
        laporan.reviewedAt = new Date();
        if (rejectionReason) laporan.rejectionReason = rejectionReason;
        await fork.flush();
        return laporan;
    }
    async getPresignedUrl(id: string) {
        const fork = this.em.fork();
        const laporan = await fork.findOne(LaporanAkhir, { id });
        if (!laporan) throw new NotFoundException('Laporan tidak ditemukan');
        return { url: await this.storageService.getPresignedUrl('laporan-akhir', laporan.fileUrl) };
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Presensi, PresensiStatus, ValidasiStatus, Mahasiswa, User } from '../../entities';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class PresensiService {
    constructor(private readonly em: EntityManager, private readonly storageService: StorageService) { }

    async checkIn(userId: string) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(Mahasiswa, { user: { id: userId } });
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const existing = await fork.findOne(Presensi, { mahasiswa, tanggal: today });
        if (existing) return { message: 'Sudah check-in hari ini', presensi: existing };
        const presensi = new Presensi();
        presensi.mahasiswa = mahasiswa;
        presensi.tanggal = today;
        presensi.jamMasuk = new Date().toTimeString().slice(0, 5);
        presensi.status = PresensiStatus.HADIR;
        presensi.statusValidasi = ValidasiStatus.APPROVED;
        fork.persist(presensi);
        await fork.flush();
        return presensi;
    }

    async submitPermission(userId: string, data: any, file?: Express.Multer.File) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(Mahasiswa, { user: { id: userId } });
        const presensi = new Presensi();
        presensi.mahasiswa = mahasiswa;
        presensi.tanggal = new Date(data.tanggal);
        presensi.status = data.status; // izin or sakit
        presensi.keterangan = data.keterangan;
        if (file) { const { objectKey } = await this.storageService.upload('dokumen', file, 'bukti-izin'); presensi.buktiUrl = objectKey; }
        fork.persist(presensi);
        await fork.flush();
        return presensi;
    }

    async findByUser(userId: string) {
        return this.em.fork().find(Presensi, { mahasiswa: { user: { id: userId } } }, { orderBy: { tanggal: 'DESC' } });
    }

    async findAll(filters?: { date?: string }) {
        const where: any = {};
        if (filters?.date) where.tanggal = new Date(filters.date);
        return this.em.fork().find(Presensi, where, { populate: ['mahasiswa', 'mahasiswa.user'], orderBy: { tanggal: 'DESC' } });
    }

    async validate(id: string, statusValidasi: ValidasiStatus, validatedByUserId: string) {
        const fork = this.em.fork();
        const presensi = await fork.findOne(Presensi, { id });
        if (!presensi) throw new NotFoundException('Presensi tidak ditemukan');
        presensi.statusValidasi = statusValidasi;
        presensi.validatedBy = await fork.findOneOrFail(User, { id: validatedByUserId });
        presensi.validatedAt = new Date();
        await fork.flush();
        return presensi;
    }
}

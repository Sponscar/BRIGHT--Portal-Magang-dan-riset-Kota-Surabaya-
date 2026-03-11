import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Sertifikat, Mahasiswa, User } from '../../entities';

@Injectable()
export class SertifikatService {
    constructor(private readonly em: EntityManager) { }

    async generate(issuedByUserId: string, data: { mahasiswaId: string; startDate: string; endDate: string }) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(Mahasiswa, { id: data.mahasiswaId }, { populate: ['user'] });
        const issuedBy = await fork.findOneOrFail(User, { id: issuedByUserId });

        const sertifikat = new Sertifikat();
        sertifikat.mahasiswa = mahasiswa;
        sertifikat.studentName = mahasiswa.fullName;
        sertifikat.startDate = new Date(data.startDate);
        sertifikat.endDate = new Date(data.endDate);
        sertifikat.issuedBy = issuedBy;
        sertifikat.tanggalTerbit = new Date();

        // Auto-generate nomor sertifikat: BRIDA-CERT-{UUID_SHORT}-{RANDOM}
        const shortId = sertifikat.id.split('-')[0].toUpperCase();
        const random = Math.floor(1000 + Math.random() * 9000);
        sertifikat.nomorSertifikat = `BRIDA-CERT-${shortId}-${random}`;

        fork.persist(sertifikat);
        await fork.flush();
        return sertifikat;
    }

    async findAll() {
        return this.em.fork().find(Sertifikat, {}, {
            populate: ['mahasiswa', 'mahasiswa.user', 'issuedBy'],
            orderBy: { tanggalTerbit: 'DESC' },
        });
    }

    async findById(id: string) {
        const s = await this.em.fork().findOne(Sertifikat, { id }, {
            populate: ['mahasiswa', 'mahasiswa.user', 'issuedBy'],
        });
        if (!s) throw new NotFoundException('Sertifikat tidak ditemukan');
        return s;
    }

    async findByUser(userId: string) {
        return this.em.fork().find(Sertifikat, {
            mahasiswa: { user: { id: userId } },
        }, { populate: ['issuedBy'] });
    }
}

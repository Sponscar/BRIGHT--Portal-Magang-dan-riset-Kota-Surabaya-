import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { KurikulumMagang } from '../../entities';

@Injectable()
export class KurikulumMagangService {
    constructor(private readonly em: EntityManager) { }

    async create(mahasiswaId: string, materi: string): Promise<KurikulumMagang> {
        const entry = this.em.create(KurikulumMagang, {
            mahasiswa: mahasiswaId,
            materi,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await this.em.persistAndFlush(entry);
        return entry;
    }

    async findByMahasiswa(mahasiswaId: string): Promise<KurikulumMagang[]> {
        return this.em.find(KurikulumMagang, { mahasiswa: mahasiswaId }, {
            orderBy: { createdAt: 'DESC' },
        });
    }

    async findAll(): Promise<KurikulumMagang[]> {
        return this.em.find(KurikulumMagang, {}, {
            populate: ['mahasiswa'],
            orderBy: { createdAt: 'DESC' },
        });
    }

    async delete(id: string): Promise<void> {
        const entry = await this.em.findOneOrFail(KurikulumMagang, { id });
        await this.em.removeAndFlush(entry);
    }
}

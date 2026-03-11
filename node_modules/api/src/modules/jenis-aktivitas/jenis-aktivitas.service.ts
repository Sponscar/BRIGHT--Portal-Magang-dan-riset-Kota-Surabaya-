import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { JenisAktivitas } from '../../entities';

@Injectable()
export class JenisAktivitasService {
    constructor(private readonly em: EntityManager) { }

    async findAll() { return this.em.fork().find(JenisAktivitas, {}, { orderBy: { displayOrder: 'ASC', name: 'ASC' } }); }

    async create(data: Partial<JenisAktivitas>) {
        const fork = this.em.fork();
        const item = new JenisAktivitas();
        Object.assign(item, data);
        fork.persist(item);
        await fork.flush();
        return item;
    }

    async update(id: string, data: Partial<JenisAktivitas>) {
        const fork = this.em.fork();
        const item = await fork.findOne(JenisAktivitas, { id });
        if (!item) throw new NotFoundException('Jenis aktivitas tidak ditemukan');
        fork.assign(item, data);
        await fork.flush();
        return item;
    }

    async delete(id: string) {
        const fork = this.em.fork();
        const item = await fork.findOne(JenisAktivitas, { id });
        if (!item) throw new NotFoundException('Jenis aktivitas tidak ditemukan');
        await fork.removeAndFlush(item);
        return { message: 'Berhasil dihapus' };
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { PerguruanTinggi } from '../../entities';

@Injectable()
export class PerguruanTinggiService {
    constructor(private readonly em: EntityManager) { }

    async findAll(search?: string) {
        const fork = this.em.fork();
        const where: any = { isActive: true };
        if (search) where.nama = { $ilike: `%${search}%` };
        return fork.find(PerguruanTinggi, where, { orderBy: { nama: 'ASC' } });
    }

    async create(data: Partial<PerguruanTinggi>) {
        const fork = this.em.fork();
        const pt = new PerguruanTinggi();
        Object.assign(pt, data);
        fork.persist(pt);
        await fork.flush();
        return pt;
    }

    async update(id: string, data: Partial<PerguruanTinggi>) {
        const fork = this.em.fork();
        const pt = await fork.findOne(PerguruanTinggi, { id });
        if (!pt) throw new NotFoundException('Perguruan tinggi tidak ditemukan');
        fork.assign(pt, data);
        await fork.flush();
        return pt;
    }

    async delete(id: string) {
        const fork = this.em.fork();
        const pt = await fork.findOne(PerguruanTinggi, { id });
        if (!pt) throw new NotFoundException('Perguruan tinggi tidak ditemukan');
        pt.isActive = false;
        await fork.flush();
        return { message: 'Berhasil dihapus' };
    }
}

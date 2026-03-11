import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { TusiBrida } from '../../entities';

@Injectable()
export class TusiBridaService {
    constructor(private readonly em: EntityManager) { }

    async create(data: Partial<TusiBrida>) {
        const fork = this.em.fork();
        const tusi = new TusiBrida();
        Object.assign(tusi, data);
        if (data.name && !data.slug) tusi.slug = data.name.toLowerCase().replace(/\s+/g, '-');
        fork.persist(tusi);
        await fork.flush();
        return tusi;
    }

    async findAll() {
        return this.em.fork().find(TusiBrida, {}, { orderBy: { displayOrder: 'ASC', name: 'ASC' } });
    }

    async findBySlug(slug: string) {
        const tusi = await this.em.fork().findOne(TusiBrida, { slug });
        if (!tusi) throw new NotFoundException('Tusi BRIDA tidak ditemukan');
        return tusi;
    }

    async update(id: string, data: Partial<TusiBrida>) {
        const fork = this.em.fork();
        const tusi = await fork.findOne(TusiBrida, { id });
        if (!tusi) throw new NotFoundException('Tusi BRIDA tidak ditemukan');
        fork.assign(tusi, data);
        await fork.flush();
        return tusi;
    }

    async toggle(id: string) {
        const fork = this.em.fork();
        const tusi = await fork.findOne(TusiBrida, { id });
        if (!tusi) throw new NotFoundException('Tusi BRIDA tidak ditemukan');
        tusi.isActive = !tusi.isActive;
        await fork.flush();
        return tusi;
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { KriteriaPenilaian } from '../../entities';

@Injectable()
export class KriteriaPenilaianService {
    constructor(private readonly em: EntityManager) { }
    async findAll() { return this.em.fork().find(KriteriaPenilaian, {}, { orderBy: { displayOrder: 'ASC' } }); }
    async create(data: Partial<KriteriaPenilaian>) { const fork = this.em.fork(); const k = new KriteriaPenilaian(); Object.assign(k, data); fork.persist(k); await fork.flush(); return k; }
    async update(id: string, data: Partial<KriteriaPenilaian>) { const fork = this.em.fork(); const k = await fork.findOne(KriteriaPenilaian, { id }); if (!k) throw new NotFoundException('Kriteria tidak ditemukan'); fork.assign(k, data); await fork.flush(); return k; }
    async delete(id: string) { const fork = this.em.fork(); const k = await fork.findOne(KriteriaPenilaian, { id }); if (!k) throw new NotFoundException('Kriteria tidak ditemukan'); await fork.removeAndFlush(k); return { message: 'Berhasil dihapus' }; }
}

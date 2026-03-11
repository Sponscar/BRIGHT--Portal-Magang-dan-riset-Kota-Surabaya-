import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { MataKuliahKonversi, MahasiswaMataKuliah, Mahasiswa } from '../../entities';

@Injectable()
export class MataKuliahService {
    constructor(private readonly em: EntityManager) { }

    async findAll() { return this.em.fork().find(MataKuliahKonversi, {}, { orderBy: { displayOrder: 'ASC' } }); }

    async create(data: Partial<MataKuliahKonversi>) {
        const fork = this.em.fork();
        const mk = new MataKuliahKonversi();
        Object.assign(mk, data);
        fork.persist(mk);
        await fork.flush();
        return mk;
    }

    async assign(userId: string, mataKuliahIds: string[]) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(Mahasiswa, { user: { id: userId } });
        // Remove existing assignments
        const existing = await fork.find(MahasiswaMataKuliah, { mahasiswa });
        for (const e of existing) fork.remove(e);
        // Create new assignments
        for (const mkId of mataKuliahIds) {
            const mk = await fork.findOneOrFail(MataKuliahKonversi, { id: mkId });
            const mmk = new MahasiswaMataKuliah();
            mmk.mahasiswa = mahasiswa;
            mmk.mataKuliah = mk;
            fork.persist(mmk);
        }
        await fork.flush();
        return { message: 'Mata kuliah berhasil dipilih' };
    }

    async findByUser(userId: string) {
        const fork = this.em.fork();
        return fork.find(MahasiswaMataKuliah, { mahasiswa: { user: { id: userId } } }, { populate: ['mataKuliah'] });
    }
}

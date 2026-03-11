// === ADMINISTRASI MODULE ===
import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Administrasi, AdministrasiStatus, Mahasiswa } from '../../entities';

@Injectable()
export class AdministrasiService {
    constructor(private readonly em: EntityManager) { }

    async create(userId: string, data: Partial<Administrasi>) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(Mahasiswa, { user: { id: userId } });
        const adm = new Administrasi();
        Object.assign(adm, data);
        adm.mahasiswa = mahasiswa;
        fork.persist(adm);
        await fork.flush();
        return adm;
    }

    async findByUser(userId: string) {
        return this.em.fork().findOne(Administrasi, { mahasiswa: { user: { id: userId } } });
    }

    async update(userId: string, data: Partial<Administrasi>) {
        const fork = this.em.fork();
        const adm = await fork.findOne(Administrasi, { mahasiswa: { user: { id: userId } } });
        if (!adm) throw new NotFoundException('Form administrasi tidak ditemukan');
        fork.assign(adm, data);
        await fork.flush();
        return adm;
    }

    async findAll() {
        return this.em.fork().find(Administrasi, {}, { populate: ['mahasiswa', 'mahasiswa.user'], orderBy: { createdAt: 'DESC' } });
    }

    async findById(id: string) {
        const fork = this.em.fork();
        const adm = await fork.findOne(Administrasi, { id }, { populate: ['mahasiswa', 'mahasiswa.user'] });
        if (!adm) throw new NotFoundException('Form administrasi tidak ditemukan');
        return adm;
    }
}

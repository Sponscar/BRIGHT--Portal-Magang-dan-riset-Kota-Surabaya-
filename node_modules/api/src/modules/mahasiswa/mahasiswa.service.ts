import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Mahasiswa, MahasiswaStatus, User, UserRole, TusiBrida } from '../../entities';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class MahasiswaService {
    constructor(
        private readonly em: EntityManager,
        private readonly storageService: StorageService,
    ) { }

    // Student: get own profile
    async getProfile(userId: string) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(Mahasiswa, { user: { id: userId } }, { populate: ['user', 'tusiBrida'] });
        if (!mahasiswa) throw new NotFoundException('Profil mahasiswa tidak ditemukan');
        return mahasiswa;
    }

    // Student: update own profile
    async updateProfile(userId: string, data: Partial<Mahasiswa>) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(Mahasiswa, { user: { id: userId } });
        if (!mahasiswa) throw new NotFoundException('Profil mahasiswa tidak ditemukan');
        fork.assign(mahasiswa, data);
        await fork.flush();
        return mahasiswa;
    }

    // Student: upload profile image
    async uploadProfileImage(userId: string, file: Express.Multer.File) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(Mahasiswa, { user: { id: userId } });
        if (!mahasiswa) throw new NotFoundException('Profil tidak ditemukan');

        if (mahasiswa.profileImageUrl) {
            try { await this.storageService.delete('profile-images', mahasiswa.profileImageUrl); } catch { }
        }

        const { objectKey } = await this.storageService.upload('profile-images', file);
        mahasiswa.profileImageUrl = objectKey;
        await fork.flush();
        return { profileImageUrl: objectKey };
    }

    // Admin: list all students
    async findAll(filters?: { status?: MahasiswaStatus }) {
        const fork = this.em.fork();
        const where: any = {};
        if (filters?.status) where.status = filters.status;
        return fork.find(Mahasiswa, where, { populate: ['user', 'tusiBrida'], orderBy: { createdAt: 'DESC' } });
    }

    // Admin: get student by id
    async findById(id: string) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(Mahasiswa, { id }, { populate: ['user', 'tusiBrida'] });
        if (!mahasiswa) throw new NotFoundException('Mahasiswa tidak ditemukan');
        return mahasiswa;
    }

    // Admin: update student status
    async updateStatus(id: string, status: MahasiswaStatus) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(Mahasiswa, { id });
        if (!mahasiswa) throw new NotFoundException('Mahasiswa tidak ditemukan');
        mahasiswa.status = status;
        await fork.flush();
        return mahasiswa;
    }

    // Admin: assign tusi brida
    async assignTusi(id: string, tusiId: string, assignedByUserId: string) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOne(Mahasiswa, { id });
        if (!mahasiswa) throw new NotFoundException('Mahasiswa tidak ditemukan');

        const tusi = await fork.findOne(TusiBrida, { id: tusiId });
        if (!tusi) throw new NotFoundException('Tusi BRIDA tidak ditemukan');

        const assignedBy = await fork.findOneOrFail(User, { id: assignedByUserId });
        mahasiswa.tusiBrida = tusi;
        mahasiswa.assignedBy = assignedBy;
        mahasiswa.tusiAssignedAt = new Date();
        await fork.flush();
        return mahasiswa;
    }
}

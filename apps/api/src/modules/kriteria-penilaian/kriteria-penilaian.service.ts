import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { KriteriaPenilaian, PenilaianCategory } from '../../entities';

const MAX_BOBOT = {
    [PenilaianCategory.BEHAVIOR]: 40,
    [PenilaianCategory.PERFORMANCE]: 60,
};

const CATEGORY_LABEL = {
    [PenilaianCategory.BEHAVIOR]: 'Perilaku Kerja',
    [PenilaianCategory.PERFORMANCE]: 'Kinerja',
};

@Injectable()
export class KriteriaPenilaianService {
    constructor(private readonly em: EntityManager) { }

    async findAll() {
        return this.em.fork().find(KriteriaPenilaian, {}, { orderBy: { displayOrder: 'ASC' } });
    }

    async create(data: Partial<KriteriaPenilaian>) {
        const fork = this.em.fork();

        // Validasi total bobot per kategori
        if (data.category && data.bobot) {
            await this.validateBobot(fork, data.category, data.bobot);
        }

        const k = new KriteriaPenilaian();
        Object.assign(k, data);
        fork.persist(k);
        await fork.flush();
        return k;
    }

    async update(id: string, data: Partial<KriteriaPenilaian>) {
        const fork = this.em.fork();
        const k = await fork.findOne(KriteriaPenilaian, { id });
        if (!k) throw new NotFoundException('Kriteria tidak ditemukan');

        // Validasi total bobot per kategori (kurangi bobot lama, tambah bobot baru)
        const category = data.category || k.category;
        const newBobot = data.bobot ?? k.bobot;
        const oldBobot = (data.category && data.category !== k.category) ? 0 : k.bobot;

        if (newBobot !== undefined) {
            await this.validateBobot(fork, category, newBobot, oldBobot, id);
        }

        fork.assign(k, data);
        await fork.flush();
        return k;
    }

    async delete(id: string) {
        const fork = this.em.fork();
        const k = await fork.findOne(KriteriaPenilaian, { id });
        if (!k) throw new NotFoundException('Kriteria tidak ditemukan');
        await fork.removeAndFlush(k);
        return { message: 'Berhasil dihapus' };
    }

    /**
     * Validasi bahwa total bobot tidak melebihi batas per kategori.
     * behavior (Perilaku Kerja): max 40%
     * performance (Kinerja): max 60%
     */
    private async validateBobot(
        fork: EntityManager,
        category: PenilaianCategory,
        newBobot: number,
        excludeBobot: number = 0,
        excludeId?: string,
    ) {
        const maxBobot = MAX_BOBOT[category];
        if (!maxBobot) return;

        const existing = await fork.find(KriteriaPenilaian, { category });
        let currentTotal = existing.reduce((sum, k) => {
            if (excludeId && k.id === excludeId) return sum;
            return sum + (k.bobot || 0);
        }, 0);

        // Kurangi bobot lama jika pindah kategori
        currentTotal -= excludeBobot > 0 && !excludeId ? excludeBobot : 0;

        const projectedTotal = currentTotal + newBobot;
        if (projectedTotal > maxBobot) {
            const label = CATEGORY_LABEL[category];
            const sisa = maxBobot - currentTotal;
            throw new BadRequestException(
                `Total bobot ${label} tidak boleh melebihi ${maxBobot}%. ` +
                `Saat ini: ${currentTotal}%, sisa tersedia: ${sisa}%. Anda mencoba menambah ${newBobot}%.`
            );
        }
    }
}

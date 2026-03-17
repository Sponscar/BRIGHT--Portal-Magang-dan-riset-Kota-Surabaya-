import { EntityManager } from '@mikro-orm/postgresql';
import { KurikulumMagang } from '../../entities';
export declare class KurikulumMagangService {
    private readonly em;
    constructor(em: EntityManager);
    create(mahasiswaId: string, materi: string): Promise<KurikulumMagang>;
    findByMahasiswa(mahasiswaId: string): Promise<KurikulumMagang[]>;
    findAll(): Promise<KurikulumMagang[]>;
    delete(id: string): Promise<void>;
}

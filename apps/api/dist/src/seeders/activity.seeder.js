"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("@mikro-orm/postgresql");
const dotenv = __importStar(require("dotenv"));
const entities_1 = require("../entities");
dotenv.config();
const activityTypes = [
    { name: 'Bimbingan teknis SDM dengan biaya APBD', description: 'Pelatihan teknis untuk pengembangan kompetensi SDM yang dibiayai oleh APBD.', category: 'sdm', displayOrder: 1 },
    { name: 'Bimbingan SDM dengan biaya kemitraan', description: 'Program bimbingan dan pengembangan SDM melalui skema kemitraan.', category: 'sdm', displayOrder: 2 },
    { name: 'Fasilitasi pengabdian masyarakat, magang, dan/atau penugasan dari PTN/PTS', description: 'Kegiatan fasilitasi pengabdian masyarakat serta penugasan akademik lainnya.', category: 'kolaborasi', displayOrder: 3 },
    { name: 'Pembangunan dan/atau Pengembangan sistem informasi kolaborasi riset dan inovasi', description: 'Pengembangan sistem informasi untuk mendukung kolaborasi riset dan inovasi.', category: 'kolaborasi', displayOrder: 4 },
    { name: 'Kerjasama/Kemitraan Riset, Invensi, dan Inovasi', description: 'Program kerjasama dan kemitraan dalam bidang riset, invensi, serta inovasi.', category: 'kolaborasi', displayOrder: 5 },
    { name: 'Pemantauan dan Evaluasi Riset', description: 'Kegiatan pemantauan dan evaluasi terhadap pelaksanaan program riset.', category: 'pemantauan', displayOrder: 6 },
    { name: 'Pemantauan dan Evaluasi Inovasi', description: 'Kegiatan pemantauan dan evaluasi terhadap pelaksanaan program inovasi.', category: 'pemantauan', displayOrder: 7 },
    { name: 'Pemantauan, evaluasi dan/atau reviu RIPJ-PID', description: 'Kegiatan pemantauan, evaluasi, dan reviu dokumen RIPJ-PID.', category: 'pemantauan', displayOrder: 8 },
    { name: 'Persiapan penyusunan penelitian', description: 'Kegiatan persiapan awal untuk penyusunan penelitian.', category: 'penelitian', displayOrder: 9 },
    { name: 'Penyusunan penelitian', description: 'Pelaksanaan kegiatan penyusunan penelitian.', category: 'penelitian', displayOrder: 10 },
    { name: 'Peningkatan fungsi dan manfaat hasil penelitian', description: 'Kegiatan peningkatan fungsi dan manfaat dari hasil penelitian yang telah dilakukan.', category: 'pengembangan', displayOrder: 11 },
    { name: 'Perekayasaan', description: 'Kegiatan perekayasaan teknologi atau sistem.', category: 'pengembangan', displayOrder: 12 },
    { name: 'Alih Teknologi', description: 'Proses pemindahan kemampuan memanfaatkan dan menguasai ilmu pengetahuan dan teknologi antar lembaga, badan atau orang.', category: 'penerapan', displayOrder: 13 },
    { name: 'Intermediasi teknologi', description: 'Kegiatan menjembatani penyedia teknologi dengan pengguna teknologi.', category: 'penerapan', displayOrder: 14 },
    { name: 'Difusi Ilmu Pengetahuan dan Teknologi', description: 'Penyebarluasan ilmu pengetahuan dan teknologi untuk diadopsi oleh pengguna.', category: 'penerapan', displayOrder: 15 },
    { name: 'Komersialisasi Teknologi', description: 'Kegiatan pemanfaatan teknologi untuk tujuan komersial.', category: 'penerapan', displayOrder: 16 },
    { name: 'Promosi dan Apresiasi Invensi dan Inovasi', description: 'Kegiatan promosi dan pemberian apresiasi terhadap invensi dan inovasi.', category: 'inovasi', displayOrder: 17 },
    { name: 'Inkubasi Invensi dan Inovasi', description: 'Program inkubasi untuk mengembangkan invensi dan inovasi.', category: 'inovasi', displayOrder: 18 },
    { name: 'Fasilitasi Pemanfaatan Hasil Invensi dan Inovasi (Difusi Inovasi)', description: 'Fasilitasi untuk mempercepat pemanfaatan dan penyebaran inovasi.', category: 'inovasi', displayOrder: 19 },
    { name: 'Adopsi Hasil Invensi dan Inovasi', description: 'Kegiatan adopsi hasil invensi dan inovasi oleh pengguna.', category: 'inovasi', displayOrder: 20 },
    { name: 'Penguatan Kawasan Ilmu Pengetahuan dan Teknologi (Science Techno Park)', description: 'Penguatan kelembagaan dan kawasan sains dan teknologi.', category: 'inovasi', displayOrder: 21 },
    { name: 'Kegiatan Perawatan Kawasan Kebun Raya Mangrove', description: 'Kegiatan rutin perawatan kawasan Kebun Raya Mangrove.', category: 'pemeliharaan_kebun', displayOrder: 22 },
    { name: 'Penataan Lingkungan Kawasan Kebun Raya Mangrove', description: 'Kegiatan penataan dan pemeliharaan lingkungan kawasan.', category: 'pemeliharaan_kebun', displayOrder: 23 },
    { name: 'Kegiatan Perbanyakan Koleksi Tumbuhan', description: 'Kegiatan perbanyakan koleksi tumbuhan di Kebun Raya.', category: 'koleksi_tumbuhan', displayOrder: 24 },
    { name: 'Perawatan Koleksi Tumbuhan', description: 'Kegiatan perawatan rutin koleksi tumbuhan.', category: 'koleksi_tumbuhan', displayOrder: 25 },
    { name: 'Pendokumentasian Data Koleksi Tumbuhan', description: 'Kegiatan pendataan dan dokumentasi koleksi tumbuhan.', category: 'koleksi_tumbuhan', displayOrder: 26 },
    { name: 'Pemanfaatan Fungsi Pendidikan', description: 'Kegiatan pemanfaatan kawasan untuk fungsi pendidikan.', category: 'pemanfaatan_kebun', displayOrder: 27 },
    { name: 'Pemanfaatan Fungsi Wisata', description: 'Kegiatan pemanfaatan kawasan untuk fungsi wisata.', category: 'pemanfaatan_kebun', displayOrder: 28 },
    { name: 'Pemanfaatan Fungsi Jasa Lingkungan', description: 'Kegiatan pemanfaatan kawasan untuk jasa lingkungan.', category: 'pemanfaatan_kebun', displayOrder: 29 },
    { name: 'Penyusunan Renstra', description: 'Penyusunan Rencana Strategis.', category: 'perencanaan', displayOrder: 30 },
    { name: 'Penyusunan RKPD', description: 'Penyusunan Rencana Kerja Pemerintah Daerah.', category: 'perencanaan', displayOrder: 31 },
    { name: 'Perbendaharaan', description: 'Kegiatan pengelolaan perbendaharaan.', category: 'keuangan', displayOrder: 32 },
    { name: 'Akuntansi dan Pelaporan', description: 'Kegiatan akuntansi dan pelaporan keuangan.', category: 'keuangan', displayOrder: 33 },
    { name: 'Administrasi Kepegawaian', description: 'Kegiatan administrasi kepegawaian internal.', category: 'sdm_sekretariat', displayOrder: 34 },
    { name: 'Pengembangan Karir', description: 'Kegiatan pengembangan karir pegawai.', category: 'sdm_sekretariat', displayOrder: 35 },
    { name: 'Kebersihan Kantor', description: 'Kegiatan menjaga kebersihan lingkungan kantor.', category: 'umum', displayOrder: 36 },
    { name: 'Keamanan Kantor', description: 'Kegiatan menjaga keamanan lingkungan kantor.', category: 'umum', displayOrder: 37 },
    { name: 'Maintenance Jaringan', description: 'Pemeliharaan jaringan komputer dan internet.', category: 'tik', displayOrder: 38 },
    { name: 'Pengembangan Website', description: 'Pengembangan dan pemeliharaan website.', category: 'tik', displayOrder: 39 },
    { name: 'Laporan Kinerja (LKjIP)', description: 'Penyusunan Laporan Kinerja Instansi Pemerintah.', category: 'monev_sekretariat', displayOrder: 40 },
    { name: 'Evaluasi Renja', description: 'Evaluasi pelaksanaan Rencana Kerja.', category: 'monev_sekretariat', displayOrder: 41 },
];
async function seed() {
    const orm = await postgresql_1.MikroORM.init({
        entities: ['./dist/entities/*.entity.js'],
        entitiesTs: ['./src/entities/*.entity.ts'],
        dbName: process.env.DB_NAME || 'brida_magang',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
    });
    const em = orm.em.fork();
    for (const activity of activityTypes) {
        const exists = await em.findOne(entities_1.JenisAktivitas, { name: activity.name });
        if (!exists) {
            const item = new entities_1.JenisAktivitas();
            Object.assign(item, activity);
            em.persist(item);
            console.log(`✅ Created: ${activity.name}`);
        }
        else {
            console.log(`⏩ Skipped: ${activity.name} (already exists)`);
        }
    }
    await em.flush();
    await orm.close(true);
    console.log(`\n🎉 Activity types seeding completed! (${activityTypes.length} items)`);
}
seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
//# sourceMappingURL=activity.seeder.js.map
import { MikroORM } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { User, UserRole } from '../entities';

dotenv.config();

const admins = [
    { name: 'Admin Sistem', email: 'admin@brida.com', role: UserRole.ADMIN },
    { name: 'Kepala BRIDA', email: 'kepala@brida.com', role: UserRole.KEPALA_BRIDA },
    { name: 'Sekretariatan BRIDA', email: 'sekretariatan@brida.com', role: UserRole.SEKRETARIATAN },
    { name: 'Koordinator Riset', email: 'riset@brida.com', role: UserRole.KOORDINATOR_RISET },
    { name: 'Koordinator Inovasi', email: 'inovasi@brida.com', role: UserRole.KOORDINATOR_INOVASI },
    { name: 'Katimja Fas. Riset', email: 'fas.riset@brida.com', role: UserRole.KATIMJA_FASILITASI_RISET },
    { name: 'Katimja Kol. Riset', email: 'kol.riset@brida.com', role: UserRole.KATIMJA_KOLABORASI_RISET },
    { name: 'Katimja Apr. Inovasi', email: 'apr.inovasi@brida.com', role: UserRole.KATIMJA_APRESIASI_INOVASI },
    { name: 'Katimja Dif. Inovasi', email: 'dif.inovasi@brida.com', role: UserRole.KATIMJA_DIFUSI_INOVASI },
    { name: 'Staf Fungsional', email: 'fungsional@brida.com', role: UserRole.STAF_FUNGSIONAL },
    { name: 'Staf Pelaksana', email: 'pelaksana@brida.com', role: UserRole.STAF_PELAKSANA },
    { name: 'Staf Non ASN', email: 'nonasn@brida.com', role: UserRole.STAF_NON_ASN },
];

async function seed() {
    const orm = await MikroORM.init({
        entities: ['./dist/entities/*.entity.js'],
        entitiesTs: ['./src/entities/*.entity.ts'],
        dbName: process.env.DB_NAME || 'brida_magang',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
    });

    const em = orm.em.fork();
    const defaultPassword = await bcrypt.hash('password123', 10);

    for (const admin of admins) {
        const exists = await em.findOne(User, { email: admin.email });
        if (!exists) {
            const user = new User();
            user.name = admin.name;
            user.email = admin.email;
            user.passwordHash = defaultPassword;
            user.role = admin.role;
            user.emailVerified = true;
            em.persist(user);
            console.log(`✅ Created: ${admin.name} (${admin.email})`);
        } else {
            console.log(`⏩ Skipped: ${admin.name} (already exists)`);
        }
    }

    await em.flush();
    await orm.close(true);
    console.log('\n🎉 Admin seeding completed!');
}

seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});

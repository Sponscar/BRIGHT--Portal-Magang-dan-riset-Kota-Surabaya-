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
const bcrypt = __importStar(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const entities_1 = require("../entities");
dotenv.config();
const admins = [
    { name: 'Admin Sistem', email: 'admin@brida.com', role: entities_1.UserRole.ADMIN },
    { name: 'Kepala BRIDA', email: 'kepala@brida.com', role: entities_1.UserRole.KEPALA_BRIDA },
    { name: 'Sekretariatan BRIDA', email: 'sekretariatan@brida.com', role: entities_1.UserRole.SEKRETARIATAN },
    { name: 'Koordinator Riset', email: 'riset@brida.com', role: entities_1.UserRole.KOORDINATOR_RISET },
    { name: 'Koordinator Inovasi', email: 'inovasi@brida.com', role: entities_1.UserRole.KOORDINATOR_INOVASI },
    { name: 'Katimja Fas. Riset', email: 'fas.riset@brida.com', role: entities_1.UserRole.KATIMJA_FASILITASI_RISET },
    { name: 'Katimja Kol. Riset', email: 'kol.riset@brida.com', role: entities_1.UserRole.KATIMJA_KOLABORASI_RISET },
    { name: 'Katimja Apr. Inovasi', email: 'apr.inovasi@brida.com', role: entities_1.UserRole.KATIMJA_APRESIASI_INOVASI },
    { name: 'Katimja Dif. Inovasi', email: 'dif.inovasi@brida.com', role: entities_1.UserRole.KATIMJA_DIFUSI_INOVASI },
    { name: 'Staf Fungsional', email: 'fungsional@brida.com', role: entities_1.UserRole.STAF_FUNGSIONAL },
    { name: 'Staf Pelaksana', email: 'pelaksana@brida.com', role: entities_1.UserRole.STAF_PELAKSANA },
    { name: 'Staf Non ASN', email: 'nonasn@brida.com', role: entities_1.UserRole.STAF_NON_ASN },
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
    const defaultPassword = await bcrypt.hash('password123', 10);
    for (const admin of admins) {
        const exists = await em.findOne(entities_1.User, { email: admin.email });
        if (!exists) {
            const user = new entities_1.User();
            user.name = admin.name;
            user.email = admin.email;
            user.passwordHash = defaultPassword;
            user.role = admin.role;
            user.emailVerified = true;
            em.persist(user);
            console.log(`✅ Created: ${admin.name} (${admin.email})`);
        }
        else {
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
//# sourceMappingURL=admin.seeder.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("./entities");
const auth_module_1 = require("./modules/auth/auth.module");
const mail_module_1 = require("./modules/mail/mail.module");
const storage_module_1 = require("./modules/storage/storage.module");
const mahasiswa_module_1 = require("./modules/mahasiswa/mahasiswa.module");
const dokumen_module_1 = require("./modules/dokumen/dokumen.module");
const tusi_brida_module_1 = require("./modules/tusi-brida/tusi-brida.module");
const jenis_aktivitas_module_1 = require("./modules/jenis-aktivitas/jenis-aktivitas.module");
const kriteria_penilaian_module_1 = require("./modules/kriteria-penilaian/kriteria-penilaian.module");
const mata_kuliah_module_1 = require("./modules/mata-kuliah/mata-kuliah.module");
const administrasi_module_1 = require("./modules/administrasi/administrasi.module");
const logbook_module_1 = require("./modules/logbook/logbook.module");
const jurnal_module_1 = require("./modules/jurnal/jurnal.module");
const presensi_module_1 = require("./modules/presensi/presensi.module");
const penilaian_module_1 = require("./modules/penilaian/penilaian.module");
const sertifikat_module_1 = require("./modules/sertifikat/sertifikat.module");
const laporan_akhir_module_1 = require("./modules/laporan-akhir/laporan-akhir.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const entities = [
    entities_1.User, entities_1.OtpToken, entities_1.Mahasiswa, entities_1.TusiBrida, entities_1.Dokumen, entities_1.Administrasi,
    entities_1.JenisAktivitas, entities_1.MataKuliahKonversi, entities_1.MahasiswaMataKuliah, entities_1.Logbook,
    entities_1.Jurnal, entities_1.Presensi, entities_1.KriteriaPenilaian, entities_1.Penilaian, entities_1.NilaiPenilaian,
    entities_1.NilaiAkhir, entities_1.Sertifikat, entities_1.LaporanAkhir, entities_1.PerguruanTinggi,
];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            nestjs_1.MikroOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    driver: postgresql_1.PostgreSqlDriver,
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 5432),
                    user: configService.get('DB_USER', 'postgres'),
                    password: configService.get('DB_PASSWORD', 'postgres'),
                    dbName: configService.get('DB_NAME', 'brida_magang'),
                    entities,
                    debug: configService.get('NODE_ENV') === 'development',
                    allowGlobalContext: true,
                }),
            }),
            nestjs_1.MikroOrmModule.forFeature({ entities }),
            auth_module_1.AuthModule,
            mail_module_1.MailModule,
            storage_module_1.StorageModule,
            mahasiswa_module_1.MahasiswaModule,
            dokumen_module_1.DokumenModule,
            tusi_brida_module_1.TusiBridaModule,
            jenis_aktivitas_module_1.JenisAktivitasModule,
            kriteria_penilaian_module_1.KriteriaPenilaianModule,
            mata_kuliah_module_1.MataKuliahModule,
            administrasi_module_1.AdministrasiModule,
            logbook_module_1.LogbookModule,
            jurnal_module_1.JurnalModule,
            presensi_module_1.PresensiModule,
            penilaian_module_1.PenilaianModule,
            sertifikat_module_1.SertifikatModule,
            laporan_akhir_module_1.LaporanAkhirModule,
            dashboard_module_1.DashboardModule,
        ],
        providers: [
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                    transform: true,
                    forbidNonWhitelisted: true,
                }),
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
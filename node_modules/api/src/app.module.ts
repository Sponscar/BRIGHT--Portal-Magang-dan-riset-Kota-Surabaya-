import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

// Entities
import {
  User, OtpToken, Mahasiswa, TusiBrida, Dokumen, Administrasi,
  JenisAktivitas, MataKuliahKonversi, MahasiswaMataKuliah, Logbook,
  Jurnal, Presensi, KriteriaPenilaian, Penilaian, NilaiPenilaian,
  NilaiAkhir, Sertifikat, LaporanAkhir, PerguruanTinggi, KurikulumMagang,
  Feedback,
} from './entities';

// Core Modules
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { StorageModule } from './modules/storage/storage.module';

// Feature Modules
import { MahasiswaModule } from './modules/mahasiswa/mahasiswa.module';
import { DokumenModule } from './modules/dokumen/dokumen.module';
import { TusiBridaModule } from './modules/tusi-brida/tusi-brida.module';
import { JenisAktivitasModule } from './modules/jenis-aktivitas/jenis-aktivitas.module';
import { KriteriaPenilaianModule } from './modules/kriteria-penilaian/kriteria-penilaian.module';
import { MataKuliahModule } from './modules/mata-kuliah/mata-kuliah.module';
import { AdministrasiModule } from './modules/administrasi/administrasi.module';
import { LogbookModule } from './modules/logbook/logbook.module';
import { JurnalModule } from './modules/jurnal/jurnal.module';
import { PresensiModule } from './modules/presensi/presensi.module';
import { PenilaianModule } from './modules/penilaian/penilaian.module';
import { SertifikatModule } from './modules/sertifikat/sertifikat.module';
import { LaporanAkhirModule } from './modules/laporan-akhir/laporan-akhir.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { KurikulumMagangModule } from './modules/kurikulum-magang/kurikulum-magang.module';
import { PerguruanTinggiModule } from './modules/perguruan-tinggi/perguruan-tinggi.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { NotificationModule } from './modules/notification/notification.module';

const entities = [
  User, OtpToken, Mahasiswa, TusiBrida, Dokumen, Administrasi,
  JenisAktivitas, MataKuliahKonversi, MahasiswaMataKuliah, Logbook,
  Jurnal, Presensi, KriteriaPenilaian, Penilaian, NilaiPenilaian,
  NilaiAkhir, Sertifikat, LaporanAkhir, PerguruanTinggi, KurikulumMagang,
  Feedback,
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        driver: PostgreSqlDriver,
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        user: configService.get('DB_USER', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        dbName: configService.get('DB_NAME', 'brida_magang'),
        entities,
        debug: configService.get('NODE_ENV') === 'development',
        allowGlobalContext: true,
      }),
    }),
    MikroOrmModule.forFeature({ entities }),

    // Core
    AuthModule,
    MailModule,
    StorageModule,

    // Features
    MahasiswaModule,
    DokumenModule,
    TusiBridaModule,
    JenisAktivitasModule,
    KriteriaPenilaianModule,
    MataKuliahModule,
    AdministrasiModule,
    LogbookModule,
    JurnalModule,
    PresensiModule,
    PenilaianModule,
    SertifikatModule,
    LaporanAkhirModule,
    DashboardModule,
    KurikulumMagangModule,
    PerguruanTinggiModule,
    FeedbackModule,
    NotificationModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule { }

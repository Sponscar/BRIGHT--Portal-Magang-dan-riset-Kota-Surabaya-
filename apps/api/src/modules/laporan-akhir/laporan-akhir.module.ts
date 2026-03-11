import { Module } from '@nestjs/common';
import { LaporanAkhirController } from './laporan-akhir.controller';
import { LaporanAkhirService } from './laporan-akhir.service';
import { StorageModule } from '../storage/storage.module';
@Module({ imports: [StorageModule], controllers: [LaporanAkhirController], providers: [LaporanAkhirService], exports: [LaporanAkhirService] })
export class LaporanAkhirModule { }

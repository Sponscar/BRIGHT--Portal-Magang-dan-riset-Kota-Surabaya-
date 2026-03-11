import { Module } from '@nestjs/common';
import { PresensiController } from './presensi.controller';
import { PresensiService } from './presensi.service';
import { StorageModule } from '../storage/storage.module';
@Module({ imports: [StorageModule], controllers: [PresensiController], providers: [PresensiService], exports: [PresensiService] })
export class PresensiModule { }

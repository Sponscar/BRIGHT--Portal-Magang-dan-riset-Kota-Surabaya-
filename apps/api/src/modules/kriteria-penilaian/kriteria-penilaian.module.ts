import { Module } from '@nestjs/common';
import { KriteriaPenilaianController } from './kriteria-penilaian.controller';
import { KriteriaPenilaianService } from './kriteria-penilaian.service';
@Module({ controllers: [KriteriaPenilaianController], providers: [KriteriaPenilaianService], exports: [KriteriaPenilaianService] })
export class KriteriaPenilaianModule { }

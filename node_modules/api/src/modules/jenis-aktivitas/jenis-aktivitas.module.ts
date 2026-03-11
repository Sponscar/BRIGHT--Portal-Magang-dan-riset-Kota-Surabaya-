import { Module } from '@nestjs/common';
import { JenisAktivitasController } from './jenis-aktivitas.controller';
import { JenisAktivitasService } from './jenis-aktivitas.service';
@Module({ controllers: [JenisAktivitasController], providers: [JenisAktivitasService], exports: [JenisAktivitasService] })
export class JenisAktivitasModule { }

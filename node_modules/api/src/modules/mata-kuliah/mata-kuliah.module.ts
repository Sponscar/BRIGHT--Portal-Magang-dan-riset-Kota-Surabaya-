import { Module } from '@nestjs/common';
import { MataKuliahController } from './mata-kuliah.controller';
import { MataKuliahService } from './mata-kuliah.service';
@Module({ controllers: [MataKuliahController], providers: [MataKuliahService], exports: [MataKuliahService] })
export class MataKuliahModule { }

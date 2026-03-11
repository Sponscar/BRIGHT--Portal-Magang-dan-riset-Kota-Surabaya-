import { Module } from '@nestjs/common';
import { AdministrasiController } from './administrasi.controller';
import { AdministrasiService } from './administrasi.service';
@Module({ controllers: [AdministrasiController], providers: [AdministrasiService], exports: [AdministrasiService] })
export class AdministrasiModule { }

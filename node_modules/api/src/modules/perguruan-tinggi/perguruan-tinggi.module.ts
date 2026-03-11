import { Module } from '@nestjs/common';
import { PerguruanTinggiController } from './perguruan-tinggi.controller';
import { PerguruanTinggiService } from './perguruan-tinggi.service';
@Module({ controllers: [PerguruanTinggiController], providers: [PerguruanTinggiService], exports: [PerguruanTinggiService] })
export class PerguruanTinggiModule { }

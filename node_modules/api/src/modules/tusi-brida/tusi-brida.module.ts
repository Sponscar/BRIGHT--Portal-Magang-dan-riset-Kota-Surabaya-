import { Module } from '@nestjs/common';
import { TusiBridaController } from './tusi-brida.controller';
import { TusiBridaService } from './tusi-brida.service';
@Module({ controllers: [TusiBridaController], providers: [TusiBridaService], exports: [TusiBridaService] })
export class TusiBridaModule { }

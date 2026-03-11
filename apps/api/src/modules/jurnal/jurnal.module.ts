import { Module } from '@nestjs/common';
import { JurnalController } from './jurnal.controller';
import { JurnalService } from './jurnal.service';
import { StorageModule } from '../storage/storage.module';
@Module({ imports: [StorageModule], controllers: [JurnalController], providers: [JurnalService], exports: [JurnalService] })
export class JurnalModule { }

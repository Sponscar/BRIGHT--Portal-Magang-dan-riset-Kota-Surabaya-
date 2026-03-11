import { Module } from '@nestjs/common';
import { DokumenController } from './dokumen.controller';
import { DokumenService } from './dokumen.service';
import { StorageModule } from '../storage/storage.module';

@Module({
    imports: [StorageModule],
    controllers: [DokumenController],
    providers: [DokumenService],
    exports: [DokumenService],
})
export class DokumenModule { }

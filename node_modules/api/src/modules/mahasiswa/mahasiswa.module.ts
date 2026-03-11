import { Module } from '@nestjs/common';
import { MahasiswaController } from './mahasiswa.controller';
import { MahasiswaService } from './mahasiswa.service';
import { StorageModule } from '../storage/storage.module';

@Module({
    imports: [StorageModule],
    controllers: [MahasiswaController],
    providers: [MahasiswaService],
    exports: [MahasiswaService],
})
export class MahasiswaModule { }

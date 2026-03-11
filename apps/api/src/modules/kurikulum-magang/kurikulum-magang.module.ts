import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { KurikulumMagang } from '../../entities';
import { KurikulumMagangController } from './kurikulum-magang.controller';
import { KurikulumMagangService } from './kurikulum-magang.service';

@Module({
    imports: [MikroOrmModule.forFeature([KurikulumMagang])],
    controllers: [KurikulumMagangController],
    providers: [KurikulumMagangService],
    exports: [KurikulumMagangService],
})
export class KurikulumMagangModule { }

import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { KurikulumMagangService } from './kurikulum-magang.service';

@Controller('kurikulum-magang')
export class KurikulumMagangController {
    constructor(private readonly kurikulumMagangService: KurikulumMagangService) { }

    @Post()
    async create(@Body() body: { mahasiswaId: string; materi: string }) {
        return this.kurikulumMagangService.create(body.mahasiswaId, body.materi);
    }

    @Get()
    async findAll() {
        return this.kurikulumMagangService.findAll();
    }

    @Get('mahasiswa/:mahasiswaId')
    async findByMahasiswa(@Param('mahasiswaId') mahasiswaId: string) {
        return this.kurikulumMagangService.findByMahasiswa(mahasiswaId);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.kurikulumMagangService.delete(id);
        return { message: 'Kurikulum magang berhasil dihapus' };
    }
}

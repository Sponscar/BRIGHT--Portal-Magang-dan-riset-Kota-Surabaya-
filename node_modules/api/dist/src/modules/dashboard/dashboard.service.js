"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("../../entities");
let DashboardService = class DashboardService {
    em;
    constructor(em) {
        this.em = em;
    }
    async getAdminDashboard() {
        const fork = this.em.fork();
        const [totalMahasiswa, pendingMahasiswa, activeMahasiswa, completedMahasiswa] = await Promise.all([
            fork.count(entities_1.Mahasiswa, {}),
            fork.count(entities_1.Mahasiswa, { status: entities_1.MahasiswaStatus.PENDING }),
            fork.count(entities_1.Mahasiswa, { status: entities_1.MahasiswaStatus.ACTIVE }),
            fork.count(entities_1.Mahasiswa, { status: entities_1.MahasiswaStatus.COMPLETED }),
        ]);
        const [totalLogbook, pendingDokumen, totalSertifikat, pendingLaporan] = await Promise.all([
            fork.count(entities_1.Logbook, { deletedAt: null }),
            fork.count(entities_1.Dokumen, { status: entities_1.DocumentStatus.PENDING }),
            fork.count(entities_1.Sertifikat, {}),
            fork.count(entities_1.LaporanAkhir, { status: entities_1.LaporanStatus.PENDING }),
        ]);
        const recentMahasiswa = await fork.find(entities_1.Mahasiswa, {}, { populate: ['user'], orderBy: { createdAt: 'DESC' }, limit: 10 });
        return { totalMahasiswa, pendingMahasiswa, activeMahasiswa, completedMahasiswa, totalLogbook, pendingDokumen, totalSertifikat, pendingLaporan, recentMahasiswa };
    }
    async getStudentDashboard(userId) {
        const fork = this.em.fork();
        const mahasiswa = await fork.findOneOrFail(entities_1.Mahasiswa, { user: { id: userId } }, { populate: ['tusiBrida'] });
        const [totalLogbook, totalPresensi, penilaian, sertifikat] = await Promise.all([
            fork.count(entities_1.Logbook, { mahasiswa, deletedAt: null }),
            fork.count(entities_1.Presensi, { mahasiswa }),
            fork.find(entities_1.Penilaian, { mahasiswa }, { populate: ['nilaiList', 'nilaiList.kriteria'] }),
            fork.find(entities_1.Sertifikat, { mahasiswa }),
        ]);
        return { mahasiswa, totalLogbook, totalPresensi, penilaian, sertifikat };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgresql_1.EntityManager])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map
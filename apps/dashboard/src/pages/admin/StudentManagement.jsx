import { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import StudentManagementTable from '../../components/admin/student/StudentManagementTable';
import RekapMahasiswaTable, { getRekapColumns, getRekapRowKeys } from '../../components/admin/student/RekapMahasiswaTable';

const StudentManagement = () => {
    // Mock Data — Presensi & Izin
    const [students, setStudents] = useState([
        { id: 1, name: 'Siti Aminah', university: 'Universitas Airlangga', major: 'Kesehatan Masyarakat', status: 'approved', team: 'Riset', logs: [{ date: '2026-02-11', time: '07:55 AM', status: 'pending' }, { date: '2026-02-10', time: '08:00 AM', status: 'approved' }] },
        { id: 2, name: 'Eko Prasetyo', university: 'PENS', major: 'Teknik Komputer', status: 'approved', team: 'Inovasi', logs: [{ date: '2026-02-11', time: '08:02 AM', status: 'pending' }] },
        { id: 3, name: 'Budi Santoso', university: 'Universitas Brawijaya', major: 'Ilmu Komunikasi', status: 'rejected', team: '-', logs: [] },
        { id: 4, name: 'Rina Wijaya', university: 'ITS', major: 'Desain Produk', status: 'approved', team: 'Kesekretariatan', logs: [{ date: '2026-02-10', time: '07:45 AM', status: 'approved' }] },
    ]);

    const [permissions, setPermissions] = useState([
        { id: 1, studentId: 2, studentName: 'Eko Prasetyo', university: 'PENS', date: '2026-02-12', type: 'Sakit', description: 'Demam tinggi dan flu berat', proofLink: 'https://drive.google.com/file/d/example1', status: 'pending' },
        { id: 2, studentId: 4, studentName: 'Rina Wijaya', university: 'ITS', date: '2026-02-12', type: 'Izin', description: 'Acara keluarga mendesak', proofLink: 'https://drive.google.com/file/d/example2', status: 'approved' }
    ]);

    // Mock Data — Rekap Mahasiswa
    const [rekapStudents] = useState([
        { id: 1, fullName: 'Siti Aminah', nik: '3578012345670001', nim: '101911001', university: 'Universitas Airlangga', major: 'Kesehatan Masyarakat', team: 'Riset', internshipType: 'Penelitian', email: 'siti.aminah@mail.com', phone: '081234567890', whatsapp: '081234567890', year: '2026' },
        { id: 2, fullName: 'Eko Prasetyo', nik: '3578012345670002', nim: '102011002', university: 'Politeknik Elektronika Negeri Surabaya (PENS)', major: 'Teknik Komputer', team: 'Inovasi', internshipType: 'Magang', email: 'eko.pras@mail.com', phone: '081234567891', whatsapp: '081234567891', year: '2026' },
        { id: 3, fullName: 'Budi Santoso', nik: '3578012345670003', nim: '103011003', university: 'Universitas Brawijaya', major: 'Ilmu Komunikasi', team: '-', internshipType: 'Magang', email: 'budi.s@mail.com', phone: '081234567892', whatsapp: '081234567892', year: '2025' },
        { id: 4, fullName: 'Rina Wijaya', nik: '3578012345670004', nim: '104011004', university: 'Institut Teknologi Sepuluh Nopember', major: 'Desain Produk', team: 'Kesekretariatan', internshipType: 'Penelitian', email: 'rina.w@mail.com', phone: '081234567893', whatsapp: '081234567893', year: '2026' },
        { id: 5, fullName: 'Ahmad Fauzi', nik: '3578012345670005', nim: '105011005', university: 'Universitas Negeri Surabaya (UNESA)', major: 'Teknik Informatika', team: 'Riset', internshipType: 'Magang', email: 'ahmad.f@mail.com', phone: '081234567894', whatsapp: '081234567894', year: '2026' },
        { id: 6, fullName: 'Dewi Lestari', nik: '3578012345670006', nim: '106011006', university: 'Universitas Airlangga', major: 'Statistika', team: 'Inovasi', internshipType: 'Penelitian', email: 'dewi.l@mail.com', phone: '081234567895', whatsapp: '081234567895', year: '2025' },
        { id: 7, fullName: 'Farhan Rizky', nik: '3578012345670007', nim: '107011007', university: 'Universitas Pembangunan Nasional Veteran Jawa Timur (UPNVJT)', major: 'Sistem Informasi', team: 'Kesekretariatan', internshipType: 'Magang', email: 'farhan.r@mail.com', phone: '081234567896', whatsapp: '081234567896', year: '2026' },
        { id: 8, fullName: 'Nadia Putri', nik: '3578012345670008', nim: '108011008', university: 'Universitas Ciputra Surabaya', major: 'Manajemen Bisnis', team: 'Riset', internshipType: 'Magang', email: 'nadia.p@mail.com', phone: '081234567897', whatsapp: '081234567897', year: '2025' },
    ]);

    const [activeTab, setActiveTab] = useState('presensi');
    const [filter, setFilter] = useState('all');
    const [selectedDate, setSelectedDate] = useState('2026-02-11');
    const [selectedPermDate, setSelectedPermDate] = useState('');

    // --- Rekap Mahasiswa State ---
    const [rekapSearch, setRekapSearch] = useState('');
    const [rekapFilterMode, setRekapFilterMode] = useState('semua');

    // Filtered rekap data (search only — column visibility is handled by the table component)
    const filteredRekap = rekapStudents.filter(s => {
        if (rekapSearch === '') return true;
        const q = rekapSearch.toLowerCase();
        return [s.fullName, s.university, s.major, s.team, s.email, s.nik, s.nim, s.internshipType, s.phone, s.whatsapp].some(
            field => field?.toLowerCase().includes(q)
        );
    });

    // Filters — Presensi & Izin
    const filteredStudents = students.filter(s => filter === 'all' || s.status === filter);
    const filteredPermissions = permissions.filter(p => (filter === 'all' || p.status === filter) && (!selectedPermDate || p.date === selectedPermDate));

    // Actions
    const handleAction = (studentId, logDate, action) => {
        setStudents(students.map(s => s.id === studentId ? { ...s, logs: s.logs.map(l => l.date === logDate ? { ...l, status: action === 'approve' ? 'approved' : 'rejected' } : l) } : s));
    };

    const handlePermissionAction = (id, action) => {
        setPermissions(permissions.map(p => p.id === id ? { ...p, status: action === 'approve' ? 'approved' : 'rejected' } : p));
    };

    const getLogForDate = (student, date) => student.logs?.find(log => log.date === date);
    const formatDateDisplay = (dateString) => { if (!dateString) return '-'; return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); };
    const getAttendanceColor = (status) => { if (status === 'approved') return 'text-emerald-600 bg-emerald-50 border-emerald-200'; if (status === 'rejected') return 'text-blue-600 bg-blue-50 border-blue-200'; return 'text-amber-600 bg-amber-50 border-amber-200'; };
    const getPermissionColor = (type) => type === 'Sakit' ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-blue-600 bg-blue-50 border-blue-200';

    // Export
    const handleExport = () => {
        if (activeTab === 'presensi') {
            const headers = ['No', 'Nama Mahasiswa', 'Perguruan Tinggi', 'Prodi', 'Tim Kerja', 'Tanggal', 'Jam', 'Status Presensi'];
            const rows = filteredStudents.map((s, i) => { const log = getLogForDate(s, selectedDate); return [i + 1, s.name, s.university, s.major, s.team, selectedDate, log ? log.time : '-', log ? (log.status === 'approved' ? 'Disetujui' : log.status === 'rejected' ? 'Ditolak' : 'Menunggu') : 'Belum Absen']; });
            downloadCSV(headers, rows, `Data_Presensi_${selectedDate}.csv`);
        } else if (activeTab === 'izin') {
            const headers = ['No', 'Nama Mahasiswa', 'Perguruan Tinggi', 'Tanggal', 'Jenis', 'Keterangan', 'Link Bukti', 'Status Validasi'];
            const rows = filteredPermissions.map((p, i) => [i + 1, p.studentName, p.university, p.date, p.type, p.description, p.proofLink, p.status === 'approved' ? 'Disetujui' : p.status === 'rejected' ? 'Ditolak' : 'Menunggu']);
            downloadCSV(headers, rows, `Data_Izin.csv`);
        } else if (activeTab === 'rekap') {
            const headers = getRekapColumns(rekapFilterMode);
            const keys = getRekapRowKeys(rekapFilterMode);
            const rows = filteredRekap.map((s, i) => [i + 1, ...keys.map(k => s[k] || '-')]);
            const filterLabel = rekapFilterMode === 'semua' ? 'Semua' : rekapFilterMode === 'perguruan_tinggi' ? 'PerguruanTinggi' : rekapFilterMode === 'jenis_magang' ? 'JenisMagang' : 'Tahun';
            downloadCSV(headers, rows, `Rekap_Mahasiswa_${filterLabel}.csv`);
        }
    };

    const downloadCSV = (headers, rows, filename) => {
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url); link.setAttribute('download', filename); link.style.visibility = 'hidden';
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
    };

    return (
        <>
            <AdminHeader title="Data Mahasiswa" subtitle="Kelola presensi harian, pengajuan izin, dan rekap data mahasiswa." />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
                        <button onClick={() => { setActiveTab('presensi'); setFilter('all'); }}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'presensi' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                            Presensi Harian
                        </button>
                        <button onClick={() => { setActiveTab('izin'); setFilter('all'); }}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'izin' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                            Pengajuan Izin
                        </button>
                        <button onClick={() => { setActiveTab('rekap'); setFilter('all'); }}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'rekap' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                            Rekap Mahasiswa
                        </button>
                    </div>

                    {/* ==================== REKAP MAHASISWA TAB ==================== */}
                    {activeTab === 'rekap' && (
                        <>
                            {/* Search, Filter Dropdown & Export */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
                                    {/* Single Filter Dropdown */}
                                    <div className="relative">
                                        <select
                                            value={rekapFilterMode}
                                            onChange={e => setRekapFilterMode(e.target.value)}
                                            className="pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm appearance-none cursor-pointer min-w-[180px]"
                                        >
                                            <option value="semua">Semua</option>
                                            <option value="perguruan_tinggi">Perguruan Tinggi</option>
                                            <option value="jenis_magang">Jenis Magang</option>
                                            <option value="tahun">Tahun</option>
                                        </select>
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined notranslate text-[20px] text-slate-400 pointer-events-none">filter_list</span>
                                    </div>

                                    {/* Search */}
                                    <div className="relative flex-1 max-w-md">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined notranslate text-[20px] text-slate-400">search</span>
                                        <input
                                            type="text"
                                            placeholder="Cari nama, universitas, NIK, NIM..."
                                            value={rekapSearch}
                                            onChange={e => setRekapSearch(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all"
                                        />
                                    </div>
                                </div>

                                <button onClick={handleExport} className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                                    <span className="material-symbols-outlined notranslate text-[18px]">download</span> Export
                                </button>
                            </div>

                            {/* Table */}
                            <RekapMahasiswaTable students={filteredRekap} filterMode={rekapFilterMode} />
                        </>
                    )}

                    {/* ==================== PRESENSI & IZIN TABS ==================== */}
                    {(activeTab === 'presensi' || activeTab === 'izin') && (
                        <>
                            {/* Filters & Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                                <div className="bg-white rounded-xl border border-slate-200 p-1 flex shadow-sm w-fit overflow-x-auto">
                                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filter === 'all' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}>Semua Data</button>
                                    <button onClick={() => setFilter('approved')} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filter === 'approved' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}>Disetujui</button>
                                    {(activeTab === 'presensi' ? ['rejected'] : ['pending', 'rejected']).map(f => (
                                        <button key={f} onClick={() => setFilter(f)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all capitalize ${filter === f ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}>
                                            {f === 'pending' ? 'Menunggu' : 'Ditolak'}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    {activeTab === 'presensi' && (
                                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
                                            <span className="text-slate-500 material-symbols-outlined notranslate text-[20px]">calendar_today</span>
                                            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="text-sm text-slate-700 outline-none border-none focus:ring-0 bg-transparent" />
                                        </div>
                                    )}
                                    {activeTab === 'izin' && (
                                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
                                            <span className="text-slate-500 material-symbols-outlined notranslate text-[20px]">calendar_today</span>
                                            <input type="date" value={selectedPermDate} onChange={(e) => setSelectedPermDate(e.target.value)} className="text-sm text-slate-700 outline-none border-none focus:ring-0 bg-transparent" />
                                            {selectedPermDate && <button onClick={() => setSelectedPermDate('')} className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined notranslate text-[18px]">close</span></button>}
                                        </div>
                                    )}
                                    <button onClick={handleExport} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                                        <span className="material-symbols-outlined notranslate text-[18px]">download</span> Export
                                    </button>
                                </div>
                            </div>

                            {/* Table */}
                            <StudentManagementTable
                                activeTab={activeTab} filteredStudents={filteredStudents} filteredPermissions={filteredPermissions}
                                selectedDate={selectedDate} getLogForDate={getLogForDate} formatDateDisplay={formatDateDisplay}
                                getAttendanceColor={getAttendanceColor} getPermissionColor={getPermissionColor}
                                handleAction={handleAction} handlePermissionAction={handlePermissionAction}
                            />
                        </>
                    )}
                </div>
            </main>
        </>
    );
};

export default StudentManagement;

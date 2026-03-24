import { useState } from 'react';
import { useAuth, isOpdRole } from '../../context/AuthContext';
import { wilayahSurabaya } from '../../data/perangkatDaerah';
import AdminHeader from '../../components/admin/AdminHeader';
import StudentManagementTable from '../../components/admin/student/StudentManagementTable';
import RekapMahasiswaTable, { getRekapColumns, getRekapRowKeys, REKAP_AVAILABLE_COLUMNS } from '../../components/admin/student/RekapMahasiswaTable';
import { useRef, useEffect } from 'react';

const StudentManagement = () => {
    const { user } = useAuth();
    const isOpd = isOpdRole(user?.role);
    const opdName = user?.opd?.nama || 'OPD';
    // Check if OPD is a kecamatan (has kelurahan data)
    const isKecamatanOpd = isOpd && wilayahSurabaya.some(w => w.nama === user?.opd?.nama);

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
        { id: 1, fullName: 'Siti Aminah', nik: '3578012345670001', nim: '101911001', university: 'Universitas Airlangga', major: 'Kesehatan Masyarakat', team: 'Riset', perangkatDaerah: 'Badan Riset dan Inovasi Daerah', internshipType: 'Penelitian', email: 'siti.aminah@mail.com', phone: '081234567890', whatsapp: '081234567890', year: '2026', kelurahan: '-' },
        { id: 2, fullName: 'Eko Prasetyo', nik: '3578012345670002', nim: '102011002', university: 'Politeknik Elektronika Negeri Surabaya (PENS)', major: 'Teknik Komputer', team: 'Inovasi', perangkatDaerah: 'Dinas Komunikasi dan Informatika', internshipType: 'Magang', email: 'eko.pras@mail.com', phone: '081234567891', whatsapp: '081234567891', year: '2026', kelurahan: '-' },
        { id: 3, fullName: 'Budi Santoso', nik: '3578012345670003', nim: '103011003', university: 'Universitas Brawijaya', major: 'Ilmu Komunikasi', team: '-', perangkatDaerah: 'Kecamatan Sukolilo', internshipType: 'Magang', email: 'budi.s@mail.com', phone: '081234567892', whatsapp: '081234567892', year: '2025', kelurahan: 'Keputih' },
        { id: 4, fullName: 'Rina Wijaya', nik: '3578012345670004', nim: '104011004', university: 'Institut Teknologi Sepuluh Nopember', major: 'Desain Produk', team: 'Kesekretariatan', perangkatDaerah: 'Kecamatan Sukolilo', internshipType: 'Penelitian', email: 'rina.w@mail.com', phone: '081234567893', whatsapp: '081234567893', year: '2026', kelurahan: 'Semolowaru' },
        { id: 5, fullName: 'Ahmad Fauzi', nik: '3578012345670005', nim: '105011005', university: 'Universitas Negeri Surabaya (UNESA)', major: 'Teknik Informatika', team: 'Riset', perangkatDaerah: 'Badan Riset dan Inovasi Daerah', internshipType: 'Magang', email: 'ahmad.f@mail.com', phone: '081234567894', whatsapp: '081234567894', year: '2026', kelurahan: '-' },
        { id: 6, fullName: 'Dewi Lestari', nik: '3578012345670006', nim: '106011006', university: 'Universitas Airlangga', major: 'Statistika', team: 'Inovasi', perangkatDaerah: 'Kecamatan Gubeng', internshipType: 'Penelitian', email: 'dewi.l@mail.com', phone: '081234567895', whatsapp: '081234567895', year: '2025', kelurahan: 'Mojo' },
        { id: 7, fullName: 'Farhan Rizky', nik: '3578012345670007', nim: '107011007', university: 'Universitas Pembangunan Nasional Veteran Jawa Timur (UPNVJT)', major: 'Sistem Informasi', team: 'Kesekretariatan', perangkatDaerah: 'Dinas Kesehatan', internshipType: 'Magang', email: 'farhan.r@mail.com', phone: '081234567896', whatsapp: '081234567896', year: '2026', kelurahan: '-' },
        { id: 8, fullName: 'Nadia Putri', nik: '3578012345670008', nim: '108011008', university: 'Universitas Ciputra Surabaya', major: 'Manajemen Bisnis', team: 'Riset', perangkatDaerah: 'Kecamatan Rungkut', internshipType: 'Magang', email: 'nadia.p@mail.com', phone: '081234567897', whatsapp: '081234567897', year: '2025', kelurahan: 'Medokan Ayu' },
    ]);

    const TABS = ['presensi', 'izin', 'rekap'];
    const [activeTab, setActiveTab] = useState('presensi');
    const [slideDirection, setSlideDirection] = useState('left');

    const handleTabChange = (newTab) => {
        if (newTab === activeTab) return;
        const currentIndex = TABS.indexOf(activeTab);
        const newIndex = TABS.indexOf(newTab);
        setSlideDirection(newIndex > currentIndex ? 'left' : 'right');
        setActiveTab(newTab);
        setFilter('all');
    };
    const [filter, setFilter] = useState('all');
    const [selectedDate, setSelectedDate] = useState('2026-02-11');
    const [selectedPermDate, setSelectedPermDate] = useState('');

    // --- Rekap Mahasiswa State ---
    const [rekapSearch, setRekapSearch] = useState('');
    // Determine which columns are available based on role
    // OPD non-kecamatan: hide kelurahan entirely (not in filter, not in default)
    const isOpdNonKecamatan = isOpd && !isKecamatanOpd;
    const availableColumns = isOpdNonKecamatan
        ? REKAP_AVAILABLE_COLUMNS.filter(c => c.key !== 'kelurahan')
        : REKAP_AVAILABLE_COLUMNS;
    const defaultColumns = availableColumns.map(c => c.key);
    const [visibleColumns, setVisibleColumns] = useState(defaultColumns);
    const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
    const columnMenuRef = useRef(null);

    // Close column menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (columnMenuRef.current && !columnMenuRef.current.contains(event.target)) {
                setIsColumnMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleColumn = (key) => {
        setVisibleColumns(prev => 
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    // OPD-scoped data: OPD admins only see students from their own perangkat daerah
    const scopedRekapStudents = isOpd
        ? rekapStudents.filter(s => s.perangkatDaerah === opdName)
        : rekapStudents;

    // Filtered rekap data (search only within visible columns)
    const filteredRekap = scopedRekapStudents.filter(s => {
        if (rekapSearch === '') return true;
        const q = rekapSearch.toLowerCase();
        
        // Always search fullName, plus any currently visible columns
        const searchableFields = ['fullName', ...visibleColumns];
        
        return searchableFields.some(field => {
            const val = s[field];
            return val && String(val).toLowerCase().includes(q);
        });
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
            const headers = getRekapColumns(visibleColumns);
            const keys = getRekapRowKeys(visibleColumns);
            const rows = filteredRekap.map((s, i) => [i + 1, ...keys.map(k => s[k] || '-')]);
            downloadCSV(headers, rows, `Rekap_Mahasiswa_Custom.csv`);
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
                        <button onClick={() => handleTabChange('presensi')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'presensi' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                            Presensi Harian
                        </button>
                        <button onClick={() => handleTabChange('izin')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'izin' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                            Pengajuan Izin
                        </button>
                        <button onClick={() => handleTabChange('rekap')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'rekap' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                            Rekap Mahasiswa
                        </button>
                    </div>

                    <div key={activeTab} className={`animate-slide-${slideDirection}`}>
                    {/* ==================== REKAP MAHASISWA TAB ==================== */}
                    {activeTab === 'rekap' && (
                        <>
                            {/* Search, Filter Dropdown & Export */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
                                    {/* Column Visibility Toggle */}
                                    <div className="relative" ref={columnMenuRef}>
                                        <button 
                                            onClick={() => setIsColumnMenuOpen(!isColumnMenuOpen)}
                                            className="flex items-center gap-2 pl-4 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm hover:bg-slate-50 transition-colors"
                                        >
                                            <span className="material-symbols-outlined notranslate text-[20px] text-slate-500">view_column_2</span>
                                            <span>Pilih Kolom ({visibleColumns.length})</span>
                                            <span className={`material-symbols-outlined notranslate text-[18px] text-slate-400 transition-transform ${isColumnMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                        </button>

                                        {isColumnMenuOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-80 overflow-y-auto">
                                                <div className="p-2 border-b border-slate-100 flex justify-between items-center mb-1">
                                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tampilkan Kolom</span>
                                                    <button onClick={() => setVisibleColumns(availableColumns.map(c => c.key))} className="text-xs text-primary font-medium hover:underline">Semua</button>
                                                </div>
                                                <div className="space-y-1">
                                                    {/* Fixed Columns */}
                                                    <label className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 cursor-not-allowed border border-slate-100 opacity-60">
                                                        <div className="w-4 h-4 rounded border flex items-center justify-center bg-slate-300 border-slate-300">
                                                            <span className="material-symbols-outlined notranslate text-[12px] text-white">check</span>
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-600 line-clamp-1">No & Nama</span>
                                                    </label>
                                                    
                                                    {/* Optional Columns */}
                                                    {availableColumns.map(col => {
                                                        const isChecked = visibleColumns.includes(col.key);
                                                        return (
                                                            <label key={col.key} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group">
                                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-primary border-primary' : 'border-slate-300 group-hover:border-primary'}`}>
                                                                    {isChecked && <span className="material-symbols-outlined notranslate text-[12px] text-white font-bold">check</span>}
                                                                </div>
                                                                <input
                                                                    type="checkbox"
                                                                    className="hidden"
                                                                    checked={isChecked}
                                                                    onChange={() => toggleColumn(col.key)}
                                                                />
                                                                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 select-none line-clamp-1">{col.label}</span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
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
                            <div>
                                <RekapMahasiswaTable students={filteredRekap} visibleColumns={visibleColumns} />
                            </div>
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
                            <div key={`${activeTab}-${filter}-${selectedDate}-${selectedPermDate}`} className="animate-tab-slide-right">
                                <StudentManagementTable
                                    activeTab={activeTab} filteredStudents={filteredStudents} filteredPermissions={filteredPermissions}
                                    selectedDate={selectedDate} getLogForDate={getLogForDate} formatDateDisplay={formatDateDisplay}
                                    getAttendanceColor={getAttendanceColor} getPermissionColor={getPermissionColor}
                                    handleAction={handleAction} handlePermissionAction={handlePermissionAction}
                                />
                            </div>
                        </>
                    )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default StudentManagement;

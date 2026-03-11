import { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import VerificationActionModal from '../../components/admin/verification/VerificationActionModal';
import AdminDetailModal from '../../components/admin/verification/AdminDetailModal';
import VerificationTable from '../../components/admin/verification/VerificationTable';
import ValidationAlertModal from '../../components/admin/verification/ValidationAlertModal';

const StudentVerification = () => {
    // Mock Data
    const [students, setStudents] = useState([
        { id: 1, name: 'Ahmad Rizky', university: 'Institut Teknologi Sepuluh Nopember', major: 'Teknik Informatika', status: 'pending', date: '01 Feb 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: null },
        { id: 2, name: 'Siti Aminah', university: 'Universitas Airlangga', major: 'Kesehatan Masyarakat', status: 'approved', date: '01 Feb 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: 'Riset' },
        { id: 3, name: 'Dewi Lestari', university: 'UPN Veteran Jawa Timur', major: 'Sistem Informasi', status: 'revision', date: '29 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: null },
        { id: 4, name: 'Eko Prasetyo', university: 'PENS', major: 'Teknik Komputer', status: 'approved', date: '28 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' } },
        { id: 5, name: 'Budi Santoso', university: 'Politeknik Negeri Malang', major: 'Teknik Elektro', status: 'pending', date: '27 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: null },
        { id: 6, name: 'Rina Wijaya', university: 'Universitas Negeri Surabaya', major: 'Desain Komunikasi Visual', status: 'revision', date: '26 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: null },
        { id: 7, name: 'Dian Pratama', university: 'Universitas Brawijaya', major: 'Ilmu Administrasi Publik', status: 'approved', date: '25 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: 'Kesekretariatan' }
    ]);

    const [adminData] = useState([
        { studentId: 1, studentName: 'Ahmad Rizky', university: 'Institut Teknologi Sepuluh Nopember', needsReplyLetter: 'Iya', proposalDescription: 'Penelitian ini bertujuan untuk mengembangkan sistem informasi berbasis web yang dapat membantu proses pengelolaan data magang di BRIGHT Provinsi Jawa Timur. Sistem ini akan mencakup fitur pendaftaran online, verifikasi dokumen, manajemen logbook harian, serta pelaporan akhir kegiatan magang. Pengembangan menggunakan teknologi React.js untuk frontend dan Node.js untuk backend dengan database PostgreSQL. Diharapkan sistem ini dapat meningkatkan efisiensi dan transparansi proses administrasi magang.', topic: 'Pengembangan Sistem Informasi Manajemen Magang berbasis Web menggunakan React.js dan Node.js', expectedResults: ['laporan_akhir', 'jurnal'], courseConversion: ['Kerja Praktik', 'Proyek Akhir'], declaration: true, submittedAt: '2026-02-02' },
        { studentId: 2, studentName: 'Siti Aminah', university: 'Universitas Airlangga', needsReplyLetter: 'Tidak', proposalDescription: 'Kegiatan magang ini berfokus pada analisis data kesehatan masyarakat menggunakan metode statistik dan visualisasi data. Mahasiswa akan mempelajari pengolahan data survei kesehatan, pembuatan dashboard monitoring, dan penyusunan laporan analisis epidemiologi. Selain itu juga akan dilakukan studi literatur mengenai kebijakan kesehatan publik di Jawa Timur untuk mendukung riset yang dilakukan oleh tim BRIGHT.', topic: 'Analisis Data Kesehatan Masyarakat dan Dashboard Monitoring Epidemiologi', expectedResults: ['laporan_akhir', 'draft_jurnal'], courseConversion: ['Magang Industri'], declaration: true, submittedAt: '2026-02-01' },
        { studentId: 5, studentName: 'Budi Santoso', university: 'Politeknik Negeri Malang', needsReplyLetter: 'Iya', proposalDescription: 'Proposal ini mengajukan kegiatan magang di bidang teknik elektro yang berfokus pada perancangan dan pengembangan sistem IoT untuk monitoring lingkungan kerja. Kegiatan meliputi perakitan sensor, pemrograman mikrokontroler, pengembangan dashboard web untuk real-time monitoring, dan dokumentasi teknis. Mahasiswa juga akan mempelajari standar keamanan kelistrikan yang diterapkan di instansi pemerintah.', topic: 'Perancangan Sistem IoT untuk Monitoring Lingkungan Kerja Instansi Pemerintah', expectedResults: ['laporan_akhir', 'seminar_kampus'], courseConversion: ['Kerja Praktik', 'Studi Independen'], declaration: true, submittedAt: '2026-01-28' }
    ]);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [selectedAdminDetail, setSelectedAdminDetail] = useState(null);
    const [isAdminDetailOpen, setIsAdminDetailOpen] = useState(false);

    // Validation Alert State
    const [alertMessage, setAlertMessage] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    // Filter & Search
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Team selection state
    const [teamSelections, setTeamSelections] = useState({});
    const [teamDropdownOpen, setTeamDropdownOpen] = useState({});

    const teamOptions = ['Enabler / Faktor Pendorong', 'Riset', 'Inovasi', 'Pengelolaan Kebun Raya Mangrove', 'Kesekretariatan', 'Lainnya'];
    const enablerSubOptions = ['Peningkatan Kompetensi SDM', 'Kolaborasi', 'Pemantauan dan Evaluasi'];
    const risetSubOptions = ['Penelitian', 'Pengembangan dan Pengkajian', 'Penerapan'];
    const inovasiSubOptions = ['Invensi dan inovasi'];
    const pengelolaankebunrayamangroveSubOptions = ['Pemeliharaan kawasan kebun raya', 'Pemeliharaan koleksi tumbuhan', 'Pemanfaatan kawasan kebun raya'];
    const kesekretariatanSubOptions = ['Perencanaan', 'Penganggaran dan keuangan', 'Sumber Daya Manusia (SDM)', 'Teknologi Informasi dan Komunikasi (TIK)', 'Layanan Umum Kantor', 'Monitoring Evaluasi dan Pelaporan (MONEV)'];

    // --- TEAM TOGGLE HANDLERS ---
    const handleTeamToggle = (studentId, team) => {
        setTeamSelections(prev => {
            const current = prev[studentId] || { teams: [], risetTypes: [], enablerTypes: [], inovasiTypes: [], pengelolaankebunrayamangroveTypes: [], kesekretariatanTypes: [], lainnyaCustomText: '' };
            const isSelected = current.teams.includes(team);
            const newTeams = isSelected ? current.teams.filter(t => t !== team) : [...current.teams, team];
            return { ...prev, [studentId]: { teams: newTeams, risetTypes: newTeams.includes('Riset') ? current.risetTypes : [], enablerTypes: newTeams.includes('Enabler / Faktor Pendorong') ? current.enablerTypes : [], inovasiTypes: newTeams.includes('Inovasi') ? current.inovasiTypes : [], pengelolaankebunrayamangroveTypes: newTeams.includes('Pengelolaan Kebun Raya Mangrove') ? current.pengelolaankebunrayamangroveTypes : [], kesekretariatanTypes: newTeams.includes('Kesekretariatan') ? current.kesekretariatanTypes : [], lainnyaCustomText: newTeams.includes('Lainnya') ? (current.lainnyaCustomText || '') : '' } };
        });
    };

    const createSubToggle = (field) => (studentId, type) => {
        setTeamSelections(prev => {
            const current = prev[studentId] || { teams: [], risetTypes: [], enablerTypes: [], inovasiTypes: [], pengelolaankebunrayamangroveTypes: [], kesekretariatanTypes: [] };
            const isSelected = current[field].includes(type);
            return { ...prev, [studentId]: { ...current, [field]: isSelected ? current[field].filter(t => t !== type) : [...current[field], type] } };
        });
    };

    const handleRisetTypeToggle = createSubToggle('risetTypes');
    const handleEnablerTypeToggle = createSubToggle('enablerTypes');
    const handleInovasiTypeToggle = createSubToggle('inovasiTypes');
    const handlePengelolaanKebunRayaTypeToggle = createSubToggle('pengelolaankebunrayamangroveTypes');
    const handleKesekretariatanTypeToggle = createSubToggle('kesekretariatanTypes');

    const handleLainnyaTextChange = (studentId, text) => {
        setTeamSelections(prev => {
            const current = prev[studentId] || { teams: [], risetTypes: [], enablerTypes: [], inovasiTypes: [], pengelolaankebunrayamangroveTypes: [], kesekretariatanTypes: [], lainnyaCustomText: '' };
            return { ...prev, [studentId]: { ...current, lainnyaCustomText: text } };
        });
    };

    const toggleTeamDropdown = (studentId) => { setTeamDropdownOpen(prev => ({ ...prev, [studentId]: !prev[studentId] })); };

    const getTeamSummary = (studentId) => {
        const sel = teamSelections[studentId];
        if (!sel || sel.teams.length === 0) return null;
        return sel.teams.map(t => {
            if (t === 'Riset' && sel.risetTypes.length > 0) return `Riset (${sel.risetTypes.join(', ')})`;
            if (t === 'Enabler / Faktor Pendorong' && sel.enablerTypes.length > 0) return `Enabler (${sel.enablerTypes.join(', ')})`;
            if (t === 'Inovasi' && sel.inovasiTypes.length > 0) return `Inovasi (${sel.inovasiTypes.join(', ')})`;
            if (t === 'Pengelolaan Kebun Raya Mangrove' && sel.pengelolaankebunrayamangroveTypes.length > 0) return `Pengelolaan Kebun Raya Mangrove (${sel.pengelolaankebunrayamangroveTypes.join(', ')})`;
            if (t === 'Kesekretariatan' && sel.kesekretariatanTypes.length > 0) return `Kesekretariatan (${sel.kesekretariatanTypes.join(', ')})`;
            if (t === 'Lainnya' && sel.lainnyaCustomText) return `Lainnya (${sel.lainnyaCustomText})`;
            return t;
        }).join(', ');
    };

    // --- ACTION HANDLERS ---
    const handleAction = (student, type) => {
        const sel = teamSelections[student.id];
        if (type === 'approve') {
            if (!sel || sel.teams.length === 0) { setAlertMessage('Silakan pilih minimal satu Tim BRIGHT terlebih dahulu sebelum menyetujui.'); setIsAlertOpen(true); return; }
            if (sel.teams.includes('Enabler / Faktor Pendorong') && sel.enablerTypes.length === 0) { setAlertMessage('Silakan pilih jenis penugasan Enabler.'); setIsAlertOpen(true); return; }
            if (sel.teams.includes('Riset') && sel.risetTypes.length === 0) { setAlertMessage('Silakan pilih jenis penugasan Riset.'); setIsAlertOpen(true); return; }
            if (sel.teams.includes('Inovasi') && sel.inovasiTypes.length === 0) { setAlertMessage('Silakan pilih jenis penugasan Inovasi.'); setIsAlertOpen(true); return; }
            if (sel.teams.includes('Pengelolaan Kebun Raya Mangrove') && sel.pengelolaankebunrayamangroveTypes.length === 0) { setAlertMessage('Silakan pilih jenis penugasan Kebun Raya Mangrove.'); setIsAlertOpen(true); return; }
            if (sel.teams.includes('Kesekretariatan') && sel.kesekretariatanTypes.length === 0) { setAlertMessage('Silakan pilih jenis penugasan Kesekretariatan.'); setIsAlertOpen(true); return; }
            if (sel.teams.includes('Lainnya') && !sel.lainnyaCustomText?.trim()) { setAlertMessage('Silakan isi jenis penugasan untuk tim Lainnya.'); setIsAlertOpen(true); return; }
        }
        setSelectedStudent(student);
        setActionType(type);
        setFeedback('');
        setIsModalOpen(true);
    };

    const handleSubmitAction = () => {
        setStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, status: actionType === 'approve' ? 'approved' : actionType, team: actionType === 'approve' ? getTeamSummary(s.id) : null } : s));
        setIsModalOpen(false);
    };

    // --- FILTER ---
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.university.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status) => {
        const styles = { pending: 'bg-amber-50 text-amber-700 border-amber-200', approved: 'bg-emerald-50 text-emerald-700 border-emerald-200', rejected: 'bg-blue-50 text-blue-700 border-blue-200', revision: 'bg-blue-50 text-blue-700 border-blue-200' };
        const labels = { pending: 'Menunggu Verifikasi', approved: 'Disetujui', rejected: 'Ditolak', revision: 'Perlu Revisi' };
        return <span className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${styles[status]}`}>{labels[status]}</span>;
    };

    return (
        <>
            <AdminHeader title="Verifikasi Mahasiswa" subtitle="Review dan kelola status penerimaan mahasiswa magang." />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Filters */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
                        <div className="relative w-full md:max-w-xs">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined notranslate text-[20px]">search</span>
                            <input type="text" placeholder="Cari nama atau universitas..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                                value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">Semua Status</option>
                                <option value="pending">Menunggu</option>
                                <option value="approved">Disetujui</option>
                                <option value="revision">Revisi</option>
                                <option value="rejected">Ditolak</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <VerificationTable
                        students={filteredStudents} adminData={adminData}
                        teamSelections={teamSelections} teamDropdownOpen={teamDropdownOpen} teamOptions={teamOptions}
                        enablerSubOptions={enablerSubOptions} risetSubOptions={risetSubOptions}
                        inovasiSubOptions={inovasiSubOptions}
                        pengelolaankebunrayamangroveSubOptions={pengelolaankebunrayamangroveSubOptions}
                        kesekretariatanSubOptions={kesekretariatanSubOptions}
                        onTeamToggle={handleTeamToggle} onRisetTypeToggle={handleRisetTypeToggle}
                        onEnablerTypeToggle={handleEnablerTypeToggle} onInovasiTypeToggle={handleInovasiTypeToggle}
                        onPengelolaanKebunRayaTypeToggle={handlePengelolaanKebunRayaTypeToggle}
                        onKesekretariatanTypeToggle={handleKesekretariatanTypeToggle}
                        onLainnyaTextChange={handleLainnyaTextChange}
                        onToggleTeamDropdown={toggleTeamDropdown} onAction={handleAction}
                        onViewAdmin={(admin) => { setSelectedAdminDetail(admin); setIsAdminDetailOpen(true); }}
                        getStatusBadge={getStatusBadge}
                    />
                </div>
            </main>

            <VerificationActionModal
                isOpen={isModalOpen} selectedStudent={selectedStudent} actionType={actionType}
                feedback={feedback} setFeedback={setFeedback} getTeamSummary={getTeamSummary}
                onClose={() => setIsModalOpen(false)} onSubmit={handleSubmitAction}
            />
            <AdminDetailModal isOpen={isAdminDetailOpen} adminDetail={selectedAdminDetail} onClose={() => setIsAdminDetailOpen(false)} />
            <ValidationAlertModal isOpen={isAlertOpen} message={alertMessage} onClose={() => setIsAlertOpen(false)} />
        </>
    );
};

export default StudentVerification;

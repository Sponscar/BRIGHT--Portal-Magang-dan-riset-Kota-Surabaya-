import { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import VerificationActionModal from '../../components/admin/verification/VerificationActionModal';
import AdminDetailModal from '../../components/admin/verification/AdminDetailModal';
import VerificationTable from '../../components/admin/verification/VerificationTable';
import { wilayahSurabaya } from '../../data/perangkatDaerah';
import Swal from 'sweetalert2';

const StudentVerification = () => {
    // Mock Data
    const [students, setStudents] = useState([
        { id: 1, name: 'Ahmad Rizky', university: 'Institut Teknologi Sepuluh Nopember', major: 'Teknik Informatika', status: 'pending', date: '01 Feb 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: null, opd: 'Badan Riset dan Inovasi Daerah', kelurahanOpd: null },
        { id: 2, name: 'Siti Aminah', university: 'Universitas Airlangga', major: 'Kesehatan Masyarakat', status: 'approved', date: '01 Feb 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: 'Riset', opd: 'Badan Riset dan Inovasi Daerah', kelurahanOpd: null },
        { id: 3, name: 'Dewi Lestari', university: 'UPN Veteran Jawa Timur', major: 'Sistem Informasi', status: 'revision', date: '29 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: null, opd: 'Dinas Komunikasi dan Informatika', kelurahanOpd: null },
        { id: 4, name: 'Eko Prasetyo', university: 'PENS', major: 'Teknik Komputer', status: 'forwarded_to_opd', date: '28 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: null, opd: 'Kecamatan Sukolilo', kelurahanOpd: 'Keputih' },
        { id: 5, name: 'Budi Santoso', university: 'Politeknik Negeri Malang', major: 'Teknik Elektro', status: 'pending', date: '27 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: null, opd: 'Kecamatan Gubeng', kelurahanOpd: 'Mojo' },
        { id: 6, name: 'Rina Wijaya', university: 'Universitas Negeri Surabaya', major: 'Desain Komunikasi Visual', status: 'revision', date: '26 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: null, opd: 'Dinas Pendidikan', kelurahanOpd: null },
        { id: 7, name: 'Dian Pratama', university: 'Universitas Brawijaya', major: 'Ilmu Administrasi Publik', status: 'approved', date: '25 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: 'Kesekretariatan', opd: 'Badan Riset dan Inovasi Daerah', kelurahanOpd: null }
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

    // Filter & Search
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [activeTab, setActiveTab] = useState('brida'); // 'brida' or 'opd'

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
        const showAlert = (message) => {
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan Validasi',
                text: message,
                confirmButtonColor: '#f59e0b',
                customClass: {
                    popup: 'validator-popup'
                }
            });
        };

        if (type === 'approve' && activeTab === 'brida') {
            if (!sel || sel.teams.length === 0) { showAlert('Silakan pilih minimal satu Tim BRIGHT terlebih dahulu sebelum menyetujui.'); return; }
            if (sel.teams.includes('Enabler / Faktor Pendorong') && sel.enablerTypes.length === 0) { showAlert('Silakan pilih jenis penugasan Enabler.'); return; }
            if (sel.teams.includes('Riset') && sel.risetTypes.length === 0) { showAlert('Silakan pilih jenis penugasan Riset.'); return; }
            if (sel.teams.includes('Inovasi') && sel.inovasiTypes.length === 0) { showAlert('Silakan pilih jenis penugasan Inovasi.'); return; }
            if (sel.teams.includes('Pengelolaan Kebun Raya Mangrove') && sel.pengelolaankebunrayamangroveTypes.length === 0) { showAlert('Silakan pilih jenis penugasan Kebun Raya Mangrove.'); return; }
            if (sel.teams.includes('Kesekretariatan') && sel.kesekretariatanTypes.length === 0) { showAlert('Silakan pilih jenis penugasan Kesekretariatan.'); return; }
            if (sel.teams.includes('Lainnya') && !sel.lainnyaCustomText?.trim()) { showAlert('Silakan isi jenis penugasan untuk tim Lainnya.'); return; }
        }
        setSelectedStudent(student);
        setActionType(type);
        setFeedback('');
        setIsModalOpen(true);
    };

    const handleSubmitAction = () => {
        setStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, status: actionType === 'approve' ? 'approved' : actionType, team: actionType === 'approve' ? getTeamSummary(s.id) : null } : s));
        setIsModalOpen(false);
        Swal.fire({
            icon: 'success',
            title: 'Berhasil Tersimpan',
            text: `Data mahasiswa telah berhasil diproses.`,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            backdrop: `
              rgba(0,0,0,0.4)
              backdrop-filter: blur(4px)
            `,
            customClass: { popup: 'validator-popup' }
        });
    };

    // --- FORWARD TO OPD ---
    const handleForwardToOpd = (student) => {
        Swal.fire({
            title: 'Kirim ke OPD?',
            html: `<p>Data mahasiswa <b>${student.name}</b> akan dikirimkan ke:<br/><b>${student.opd}</b>${student.kelurahanOpd ? ` (Kel. ${student.kelurahanOpd})` : ''}</p>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Kirim',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                setStudents(prev => prev.map(s => s.id === student.id ? { ...s, status: 'forwarded_to_opd' } : s));
                Swal.fire({ icon: 'success', title: 'Berhasil!', text: `Data telah dikirim ke ${student.opd}.`, timer: 2500, showConfirmButton: false });
            }
        });
    };

    // --- FILTER ---
    const isBridaStudent = (student) => student.opd === 'Badan Riset dan Inovasi Daerah';

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.university.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
        const matchesTab = activeTab === 'brida' ? isBridaStudent(student) : !isBridaStudent(student);
        return matchesSearch && matchesFilter && matchesTab;
    });

    // Tab counts
    const bridaCount = students.filter(isBridaStudent).length;
    const opdCount = students.filter(s => !isBridaStudent(s)).length;

    const getStatusBadge = (status) => {
        const styles = { pending: 'bg-amber-50 text-amber-700 border-amber-200', approved: 'bg-emerald-50 text-emerald-700 border-emerald-200', rejected: 'bg-blue-50 text-blue-700 border-blue-200', revision: 'bg-blue-50 text-blue-700 border-blue-200', forwarded_to_opd: 'bg-teal-50 text-teal-700 border-teal-200' };
        const labels = { pending: 'Menunggu Verifikasi', approved: 'Disetujui', rejected: 'Ditolak', revision: 'Perlu Revisi', forwarded_to_opd: 'Dikirim ke OPD' };
        return <span className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${styles[status] || ''}`}>{labels[status] || status}</span>;
    };

    return (
        <>
            <AdminHeader title="Verifikasi Mahasiswa" subtitle="Review dan kelola status penerimaan mahasiswa magang." />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Tabs */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex">
                            <button
                                onClick={() => { setActiveTab('brida'); setFilterStatus('all'); }}
                                className={`flex-1 py-3.5 px-4 text-sm font-bold transition-all relative flex items-center justify-center gap-2 ${
                                    activeTab === 'brida'
                                        ? 'text-primary bg-primary/5'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined notranslate text-[18px]">science</span>
                                Verifikasi BRIDA
                                <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                                    activeTab === 'brida' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'
                                }`}>{bridaCount}</span>
                                {activeTab === 'brida' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full"></span>}
                            </button>
                            <button
                                onClick={() => { setActiveTab('opd'); setFilterStatus('all'); }}
                                className={`flex-1 py-3.5 px-4 text-sm font-bold transition-all relative flex items-center justify-center gap-2 ${
                                    activeTab === 'opd'
                                        ? 'text-emerald-700 bg-emerald-50/50'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined notranslate text-[18px]">account_balance</span>
                                Verifikasi OPD
                                <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                                    activeTab === 'opd' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                                }`}>{opdCount}</span>
                                {activeTab === 'opd' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-emerald-600 rounded-t-full"></span>}
                            </button>
                        </div>
                    </div>

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
                                {activeTab === 'opd' && <option value="forwarded_to_opd">Dikirim ke OPD</option>}
                                <option value="revision">Revisi</option>
                                <option value="rejected">Ditolak</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div key={`${activeTab}-${filterStatus}-${searchQuery}`} className="animate-page-enter">
                        <VerificationTable
                            mode={activeTab}
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
                            onForwardToOpd={handleForwardToOpd}
                            onViewAdmin={(admin) => { setSelectedAdminDetail(admin); setIsAdminDetailOpen(true); }}
                            getStatusBadge={getStatusBadge}
                        />
                    </div>
                </div>
            </main>

            <VerificationActionModal
                isOpen={isModalOpen} selectedStudent={selectedStudent} actionType={actionType}
                feedback={feedback} setFeedback={setFeedback} getTeamSummary={getTeamSummary}
                onClose={() => setIsModalOpen(false)} onSubmit={handleSubmitAction}
            />
            <AdminDetailModal isOpen={isAdminDetailOpen} adminDetail={selectedAdminDetail} onClose={() => setIsAdminDetailOpen(false)} />
        </>
    );
};

export default StudentVerification;

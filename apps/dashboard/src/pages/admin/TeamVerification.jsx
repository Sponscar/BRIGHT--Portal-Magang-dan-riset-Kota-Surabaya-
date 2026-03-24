import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTeams } from '../../context/TeamContext';
import AdminHeader from '../../components/admin/AdminHeader';
import Swal from 'sweetalert2';

const TeamVerification = () => {
    const { user } = useAuth();
    const opdName = user?.opd?.nama || 'OPD';
    const { activeTeams } = useTeams();

    // Mock students forwarded to this OPD
    const [students, setStudents] = useState([
        { id: 1, name: 'Dewi Lestari', university: 'UPN Veteran Jawa Timur', major: 'Sistem Informasi', status: 'pending', date: '29 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: null },
        { id: 2, name: 'Eko Prasetyo', university: 'PENS', major: 'Teknik Komputer', status: 'approved', date: '28 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: 'Tim Pengembangan' },
        { id: 3, name: 'Rina Wijaya', university: 'Universitas Negeri Surabaya', major: 'Desain Komunikasi Visual', status: 'pending', date: '26 Jan 2026', documents: { cv: '#', letter: '#', proposal: '#' }, team: null },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [teamDropdownOpen, setTeamDropdownOpen] = useState({});
    const [teamSelections, setTeamSelections] = useState({});

    const teamOptions = activeTeams.map(t => t.name);

    const toggleTeamDropdown = (studentId) => {
        setTeamDropdownOpen(prev => ({ ...prev, [studentId]: !prev[studentId] }));
    };

    const handleTeamSelect = (studentId, teamName) => {
        setTeamSelections(prev => ({ ...prev, [studentId]: teamName }));
        setTeamDropdownOpen(prev => ({ ...prev, [studentId]: false }));
    };

    const handleApprove = (student) => {
        const selectedTeam = teamSelections[student.id];
        if (!selectedTeam) {
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan Validasi',
                text: 'Silahkan pilih Tim Lokus terlebih dahulu sebelum menyetujui.',
                confirmButtonColor: '#f59e0b',
                customClass: {
                    popup: 'validator-popup'
                }
            });
            return;
        }
        Swal.fire({
            title: 'Setujui Mahasiswa?',
            html: `<p>Mahasiswa <b>${student.name}</b> akan ditempatkan di <b>${selectedTeam}</b></p>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Ya, Setujui',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                setStudents(prev => prev.map(s => s.id === student.id ? { ...s, status: 'approved', team: selectedTeam } : s));
                Swal.fire({ icon: 'success', title: 'Berhasil!', text: `${student.name} ditempatkan di ${selectedTeam}.`, timer: 2500, showConfirmButton: false });
            }
        });
    };

    const handleRevision = (student) => {
        Swal.fire({
            title: 'Minta Revisi?',
            input: 'textarea',
            inputLabel: 'Catatan Revisi',
            inputPlaceholder: 'Tuliskan catatan revisi...',
            showCancelButton: true,
            confirmButtonColor: '#d97706',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Kirim Revisi',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                setStudents(prev => prev.map(s => s.id === student.id ? { ...s, status: 'revision' } : s));
                Swal.fire({ icon: 'success', title: 'Revisi Dikirim!', timer: 2000, showConfirmButton: false });
            }
        });
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.university.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (status) => {
        const styles = { pending: 'bg-amber-50 text-amber-700 border-amber-200', approved: 'bg-emerald-50 text-emerald-700 border-emerald-200', revision: 'bg-blue-50 text-blue-700 border-blue-200' };
        const labels = { pending: 'Menunggu Verifikasi', approved: 'Disetujui', revision: 'Perlu Revisi' };
        return <span className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${styles[status] || ''}`}>{labels[status] || status}</span>;
    };

    return (
        <>
            <AdminHeader title="Verifikasi Tim" subtitle={`Plotting mahasiswa ke Tim Lokus ${opdName}.`} />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Info Banner */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                        <span className="material-symbols-outlined notranslate text-blue-600 text-[22px] mt-0.5">info</span>
                        <div>
                            <p className="text-sm font-semibold text-blue-800">Verifikasi Tim — {opdName}</p>
                            <p className="text-xs text-blue-600 mt-0.5">Plotting mahasiswa yang sudah dikirim oleh admin BRIDA ke tim lokus OPD Anda. Tim Lokus yang tersedia berasal dari halaman "Data Tim Lokus".</p>
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
                                <option value="revision">Revisi</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-200">
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Mahasiswa</th>
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Perguruan Tinggi / Prodi</th>
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Dokumen</th>
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Ploting Tim</th>
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right whitespace-nowrap">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredStudents.map((student) => (
                                        <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-sm border border-primary/10">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <span className="block font-semibold text-slate-900">{student.name}</span>
                                                        <span className="text-xs text-slate-500">{student.date}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-slate-900">{student.university}</span>
                                                    <span className="text-xs text-slate-500">{student.major}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex gap-2">
                                                    <a href={student.documents.cv} target="_blank" rel="noopener noreferrer" title="CV" className="p-1.5 text-slate-500 hover:text-primary bg-slate-100 hover:bg-blue-50 rounded-lg transition-colors">
                                                        <span className="material-symbols-outlined notranslate text-[18px]">badge</span>
                                                    </a>
                                                    <a href={student.documents.letter} target="_blank" rel="noopener noreferrer" title="Surat" className="p-1.5 text-slate-500 hover:text-primary bg-slate-100 hover:bg-blue-50 rounded-lg transition-colors">
                                                        <span className="material-symbols-outlined notranslate text-[18px]">article</span>
                                                    </a>
                                                    <a href={student.documents.proposal} target="_blank" rel="noopener noreferrer" title="Proposal" className="p-1.5 text-slate-500 hover:text-primary bg-slate-100 hover:bg-blue-50 rounded-lg transition-colors">
                                                        <span className="material-symbols-outlined notranslate text-[18px]">description</span>
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {student.status === 'pending' || student.status === 'revision' ? (
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => toggleTeamDropdown(student.id)}
                                                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary flex items-center gap-2 min-w-[160px] justify-between"
                                                        >
                                                            <span className="truncate">{teamSelections[student.id] || 'Pilih Tim...'}</span>
                                                            <span className="material-symbols-outlined notranslate text-[16px] text-slate-400">
                                                                {teamDropdownOpen[student.id] ? 'expand_less' : 'expand_more'}
                                                            </span>
                                                        </button>
                                                        {teamDropdownOpen[student.id] && (
                                                            <div className="absolute z-30 top-full left-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg py-2 min-w-[200px] max-h-[200px] overflow-y-auto">
                                                                {teamOptions.map(team => (
                                                                    <button
                                                                        key={team}
                                                                        onClick={() => handleTeamSelect(student.id, team)}
                                                                        className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${teamSelections[student.id] === team ? 'text-primary bg-primary/5' : 'text-slate-700'}`}
                                                                    >
                                                                        {team}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm font-medium text-slate-700">{student.team}</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                {getStatusBadge(student.status)}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                {student.status === 'pending' || student.status === 'revision' ? (
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => handleRevision(student)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Minta Revisi">
                                                            <span className="material-symbols-outlined notranslate text-[20px]">edit_note</span>
                                                        </button>
                                                        <button onClick={() => handleApprove(student)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Setujui">
                                                            <span className="material-symbols-outlined notranslate text-[20px]">check_circle</span>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic">Selesai</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <p className="text-xs text-slate-500">Menampilkan {filteredStudents.length} data</p>
                            <div className="flex gap-1">
                                <button className="p-1 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">Prev</button>
                                <button className="p-1 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default TeamVerification;

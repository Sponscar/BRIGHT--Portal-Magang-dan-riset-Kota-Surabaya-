import { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import ReportConfirmationModal from '../../components/admin/reports/ReportConfirmationModal';
import FinalReportsTable from '../../components/admin/reports/FinalReportsTable';

const FinalReports = () => {
    const [reports, setReports] = useState([
        { id: 1, studentName: 'Siti Aminah', university: 'Universitas Airlangga', title: 'Analisis Dampak Lingkungan Limbah Industri Rumahan', date: '2026-02-12', fileLink: 'https://drive.google.com/file/d/example1', status: 'pending' },
        { id: 2, studentName: 'Eko Prasetyo', university: 'PENS', title: 'Sistem Monitoring Suhu Berbasis IoT', date: '2026-02-11', fileLink: 'https://drive.google.com/file/d/example2', status: 'approved' },
        { id: 3, studentName: 'Rina Wijaya', university: 'ITS', title: 'Perancangan UI/UX Aplikasi E-Learning', date: '2026-02-10', fileLink: 'https://drive.google.com/file/d/example3', status: 'rejected' }
    ]);

    const FILTERS = ['all', 'pending', 'approved', 'rejected'];
    const [filter, setFilter] = useState('all');
    const [animationClass, setAnimationClass] = useState('animate-page-enter');
    const [searchTerm, setSearchTerm] = useState('');

    const handleFilterChange = (newFilter) => {
        if (newFilter === filter) return;
        const currentIndex = FILTERS.indexOf(filter);
        const newIndex = FILTERS.indexOf(newFilter);
        setAnimationClass(`animate-slide-${newIndex > currentIndex ? 'left' : 'right'}`);
        setFilter(newFilter);
    };

    const filteredReports = reports.filter(r => (filter === 'all' || r.status === filter) && (r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.university.toLowerCase().includes(searchTerm.toLowerCase())));
    const stats = { total: reports.length, pending: reports.filter(r => r.status === 'pending').length, approved: reports.filter(r => r.status === 'approved').length, rejected: reports.filter(r => r.status === 'rejected').length };

    const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, type: null, reportId: null, reportName: '', reason: '' });

    const handleActionClick = (id, name, type) => setConfirmationModal({ isOpen: true, type, reportId: id, reportName: name, reason: '' });
    const closeModal = () => setConfirmationModal({ isOpen: false, type: null, reportId: null, reportName: '', reason: '' });
    const confirmAction = () => {
        const { reportId, type, reason } = confirmationModal;
        if (type === 'reject' && reason) console.log(`Rejecting report ${reportId} with reason: ${reason}`);
        setReports(reports.map(r => r.id === reportId ? { ...r, status: type === 'approve' ? 'approved' : 'rejected' } : r));
        closeModal();
    };

    const getStatusColor = (status) => { switch (status) { case 'approved': return 'text-emerald-600 bg-emerald-50 border-emerald-200'; case 'rejected': return 'text-rose-600 bg-rose-50 border-rose-200'; default: return 'text-amber-600 bg-amber-50 border-amber-200'; } };
    const formatDateDisplay = (dateString) => { if (!dateString) return '-'; return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }); };

    return (
        <>
            <AdminHeader title="Laporan Akhir" subtitle="Kelola dan review laporan akhir mahasiswa magang." />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm"><p className="text-xs font-medium text-slate-500 uppercase">Total Laporan</p><p className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</p></div>
                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm"><p className="text-xs font-medium text-amber-600 uppercase">Menunggu Review</p><p className="text-2xl font-bold text-amber-700 mt-1">{stats.pending}</p></div>
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm"><p className="text-xs font-medium text-emerald-600 uppercase">Disetujui</p><p className="text-2xl font-bold text-emerald-700 mt-1">{stats.approved}</p></div>
                        <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 shadow-sm"><p className="text-xs font-medium text-rose-600 uppercase">Perlu Revisi</p><p className="text-2xl font-bold text-rose-700 mt-1">{stats.rejected}</p></div>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <div className="bg-white rounded-xl border border-slate-200 p-1 flex shadow-sm w-fit overflow-x-auto">
                            {FILTERS.map(f => (
                                <button key={f} onClick={() => handleFilterChange(f)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all capitalize ${filter === f ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}>
                                    {f === 'all' ? 'Semua' : f === 'pending' ? 'Menunggu' : f === 'approved' ? 'Disetujui' : 'Ditolak'}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined notranslate text-[20px]">search</span>
                                <input type="text" placeholder="Cari mahasiswa, judul, atau kampus..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setAnimationClass('animate-page-enter'); }} className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div key={`${filter}-${searchTerm}`} className={animationClass}>
                        <FinalReportsTable reports={filteredReports} formatDateDisplay={formatDateDisplay} getStatusColor={getStatusColor} onActionClick={handleActionClick} />
                    </div>
                </div>

                <ReportConfirmationModal
                    isOpen={confirmationModal.isOpen} type={confirmationModal.type} reportName={confirmationModal.reportName}
                    reason={confirmationModal.reason} onReasonChange={(value) => setConfirmationModal({ ...confirmationModal, reason: value })}
                    onClose={closeModal} onConfirm={confirmAction}
                />
            </main>
        </>
    );
};

export default FinalReports;

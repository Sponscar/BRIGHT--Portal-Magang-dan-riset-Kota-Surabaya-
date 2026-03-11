import { useState } from 'react';

const FILTER_LABELS = {
    all: 'Semua',
    pending: 'Menunggu',
    approved: 'Diterima',
    rejected: 'Ditolak',
};

const getStatusBadge = (status) => {
    const styles = {
        pending: 'bg-amber-50 text-amber-700 border-amber-200',
        approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        rejected: 'bg-blue-50 text-blue-700 border-blue-200',
    };
    const labels = {
        pending: 'Menunggu',
        approved: 'Diterima',
        rejected: 'Ditolak',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

const RecentApplicationsTable = ({ applications, onViewDetail, onViewAll, onExport }) => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredApplications = applications.filter(app => {
        if (statusFilter === 'all') return true;
        return app.status === statusFilter;
    });

    return (
        <>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <span className="material-symbols-outlined notranslate text-primary text-xl">history</span>
                            Pendaftar Terbaru
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">Daftar mahasiswa yang baru saja mengajukan permohonan magang.</p>
                    </div>
                    <div className="flex gap-2">
                        {/* Filter Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`px-4 py-2 bg-white border text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 ${statusFilter !== 'all' ? 'border-primary text-primary' : 'border-slate-200 text-slate-600'}`}
                            >
                                <span className="material-symbols-outlined notranslate text-[18px]">filter_list</span>
                                {statusFilter === 'all' ? 'Filter' : FILTER_LABELS[statusFilter]}
                            </button>
                            {isFilterOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-xl z-20 py-1 animate-in fade-in zoom-in-95 duration-150">
                                    {Object.entries(FILTER_LABELS).map(([key, label]) => (
                                        <button
                                            key={key}
                                            onClick={() => { setStatusFilter(key); setIsFilterOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors flex items-center justify-between ${statusFilter === key ? 'text-primary font-bold bg-blue-50/50' : 'text-slate-600'}`}
                                        >
                                            {label}
                                            {statusFilter === key && (
                                                <span className="material-symbols-outlined notranslate text-[16px] text-primary">check</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Export Button */}
                        <button
                            onClick={() => onExport(filteredApplications)}
                            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined notranslate text-[18px]">download</span>
                            Export Data
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Mahasiswa</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Perguruan Tinggi / Prodi</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal Daftar</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredApplications.length > 0 ? filteredApplications.map((app) => (
                                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                                                {app.name.charAt(0)}
                                            </div>
                                            <span className="font-semibold text-slate-900">{app.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-900">{app.university}</span>
                                            <span className="text-xs text-slate-500">{app.major}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm text-slate-600 font-medium">{app.date}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        {getStatusBadge(app.status)}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button
                                            onClick={() => onViewDetail(app)}
                                            className="text-slate-400 hover:text-primary transition-colors p-1 rounded hover:bg-blue-50"
                                            title="Lihat Detail"
                                        >
                                            <span className="material-symbols-outlined notranslate text-[20px]">visibility</span>
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                        Tidak ada data pendaftar dengan filter ini.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-center">
                    <button
                        onClick={onViewAll}
                        className="text-sm font-semibold text-primary hover:text-blue-700 hover:underline transition-colors"
                    >
                        Lihat Semua Pendaftar →
                    </button>
                </div>
            </div>

            {/* Close filter dropdown when clicking outside */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)}></div>
            )}
        </>
    );
};

export default RecentApplicationsTable;

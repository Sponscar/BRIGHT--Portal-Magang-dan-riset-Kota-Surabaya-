const LogbookReviewTab = ({
    entries,
    filteredEntries,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    getStatusBadge,
    onViewDetail,
    onAction,
}) => {
    return (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Menunggu Review</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{entries.filter(e => e.status === 'pending').length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                        <span className="material-symbols-outlined notranslate">pending_actions</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Disetujui Hari Ini</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{entries.filter(e => e.status === 'approved').length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <span className="material-symbols-outlined notranslate">check_circle</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Total Logbook</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{entries.length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <span className="material-symbols-outlined notranslate">article</span>
                    </div>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-full md:w-96">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined notranslate text-[20px]">search</span>
                    <input
                        type="text"
                        placeholder="Cari mahasiswa atau aktivitas..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">Semua Status</option>
                        <option value="pending">Menunggu</option>
                        <option value="approved">Disetujui</option>
                        <option value="rejected">Ditolak</option>
                    </select>
                </div>
            </div>

            {/* Logbook List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Mahasiswa</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal & Tipe</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Jenis Penugasan</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Jenis Aktivitas</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/3">Aktivitas</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredEntries.map((entry) => (
                            <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-6 bg-white">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{entry.studentName}</p>
                                        <p className="text-xs text-slate-500">{entry.university}</p>
                                    </div>
                                </td>
                                <td className="py-4 px-6 bg-white">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-slate-700">{entry.date}</span>
                                        <span className={`text-[10px] w-fit px-2 py-0.5 rounded-full font-medium ${entry.type === 'Laporan Harian' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                                            }`}>
                                            {entry.type}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 bg-white">
                                    {entry.category ? (
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                            ${entry.category === 'Peningkatan Kompetensi SDM' ? 'bg-blue-100 text-blue-800' :
                                                entry.category === 'Kolaborasi' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-amber-100 text-amber-800'}`}>
                                            {entry.category}
                                        </span>
                                    ) : (
                                        <span className="text-slate-400 text-xs">-</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 bg-white">
                                    {entry.activityType !== '-' ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                            {entry.activityType}
                                        </span>
                                    ) : (
                                        <span className="text-slate-400 text-xs">-</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 bg-white">
                                    <p className="text-sm text-slate-600 line-clamp-2">{entry.activity}</p>
                                    {entry.document && (
                                        <a href={entry.document} className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline">
                                            <span className="material-symbols-outlined notranslate text-[14px]">attachment</span>
                                            Lihat Dokumen
                                        </a>
                                    )}
                                </td>
                                <td className="py-4 px-6 bg-white">
                                    {getStatusBadge(entry.status)}
                                </td>
                                <td className="py-4 px-6 text-right bg-white">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onViewDetail(entry)}
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Lihat Detail"
                                        >
                                            <span className="material-symbols-outlined notranslate text-[20px]">visibility</span>
                                        </button>
                                        {entry.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => onAction(entry, 'reject')}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Tolak"
                                                >
                                                    <span className="material-symbols-outlined notranslate text-[20px]">close</span>
                                                </button>
                                                <button
                                                    onClick={() => onAction(entry, 'approve')}
                                                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                    title="Setujui"
                                                >
                                                    <span className="material-symbols-outlined notranslate text-[20px]">check</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredEntries.length === 0 && (
                            <tr>
                                <td colSpan="6" className="py-8 text-center text-slate-500 text-sm">
                                    Tidak ada data logbook yang ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default LogbookReviewTab;

const AttendanceHistoryTable = ({ records, filterDateStart, filterDateEnd, onFilterDateStartChange, onFilterDateEndChange, onResetFilter }) => {
    const filteredRecords = records.filter(r => {
        if (r.status !== 'Hadir') return false;
        if (filterDateStart && r.rawDate < filterDateStart) return false;
        if (filterDateEnd && r.rawDate > filterDateEnd) return false;
        return true;
    });

    return (
        <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h3 className="text-xl font-semibold text-[#1b0d0d]">Riwayat Kehadiran</h3>
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs font-medium text-slate-500 whitespace-nowrap">Dari</label>
                        <input type="date" className="px-3 py-1.5 border border-[#f3e7e7] rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white" value={filterDateStart} onChange={(e) => onFilterDateStartChange(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-1.5">
                        <label className="text-xs font-medium text-slate-500 whitespace-nowrap">Sampai</label>
                        <input type="date" className="px-3 py-1.5 border border-[#f3e7e7] rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white" value={filterDateEnd} onChange={(e) => onFilterDateEndChange(e.target.value)} />
                    </div>
                    {(filterDateStart || filterDateEnd) && (
                        <button onClick={onResetFilter} className="px-3 py-1.5 text-xs font-bold text-primary hover:bg-blue-50 rounded-lg border border-primary/20 transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined notranslate text-[14px]">close</span>Reset
                        </button>
                    )}
                </div>
            </div>
            <div className="bg-white rounded-xl border border-[#f3e7e7] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-[#f3e7e7]">
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary w-16">No</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary">Tanggal</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary">Jam Masuk</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary">Status</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary">Keterangan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f3e7e7]">
                            {filteredRecords.length > 0 ? filteredRecords.map((record, index) => (
                                <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-[#1b0d0d]">{record.date}</td>
                                    <td className="px-6 py-4 text-sm text-emerald-600 font-medium"><span className="bg-emerald-50/50 px-2 py-1 rounded-lg">{record.checkIn}</span></td>
                                    <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">{record.status}</span></td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{record.description}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Belum ada riwayat kehadiran.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AttendanceHistoryTable;

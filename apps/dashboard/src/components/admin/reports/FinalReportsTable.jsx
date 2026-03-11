const FinalReportsTable = ({ reports, formatDateDisplay, getStatusColor, onActionClick }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="font-bold text-slate-900">Daftar Laporan Masuk</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Mahasiswa</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Judul Laporan</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal Upload</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">File</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {reports.length > 0 ? reports.map((report) => (
                            <tr key={report.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-900">{report.studentName}</span>
                                        <span className="text-xs text-slate-500">{report.university}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <p className="text-sm font-medium text-slate-900 max-w-xs truncate" title={report.title}>{report.title}</p>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm text-slate-600">{formatDateDisplay(report.date)}</span>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {report.fileLink ? (
                                        <a href={report.fileLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-primary hover:text-white transition-colors" title="Lihat Dokumen">
                                            <span className="material-symbols-outlined notranslate text-[18px]">description</span>
                                        </a>
                                    ) : (
                                        <span className="text-slate-300 text-xs">-</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <span className={`text-xs font-semibold px-2 py-1 rounded border inline-block ${getStatusColor(report.status)}`}>
                                        {report.status === 'pending' ? 'Menunggu' : report.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    {report.status === 'pending' ? (
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => onActionClick(report.id, report.studentName, 'reject')} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">Tolak</button>
                                            <button onClick={() => onActionClick(report.id, report.studentName, 'approve')} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors">Setujui</button>
                                        </div>
                                    ) : (
                                        <span className="text-slate-400 text-xs italic">Selesai</span>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" className="px-6 py-8 text-center text-slate-500">Tidak ada laporan ditemukan.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FinalReportsTable;

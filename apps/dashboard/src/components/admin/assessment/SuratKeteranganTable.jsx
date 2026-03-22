const SuratKeteranganTable = ({ suratList, formatDate, onPreview }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="font-bold text-slate-900">Daftar Surat Keterangan Diterbitkan</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Mahasiswa</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Nomor Surat</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Periode Magang</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal Terbit</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {suratList.length > 0 ? suratList.map((surat) => (
                            <tr key={surat.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm border border-blue-200">
                                            <span className="material-symbols-outlined notranslate text-[20px]">description</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900">{surat.studentName}</span>
                                            <span className="text-xs text-slate-500">{surat.university}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm font-mono font-medium text-slate-900">{surat.nomor_surat}</span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm text-slate-600">
                                        {formatDate(surat.tanggal_mulai)} — {formatDate(surat.tanggal_selesai)}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm text-slate-600">{formatDate(surat.tanggal_terbit)}</span>
                                </td>
                                <td className="py-4 px-6">
                                    <button
                                        onClick={() => onPreview(surat)}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm font-semibold transition-colors">
                                        <span className="material-symbols-outlined notranslate text-[18px]">visibility</span>
                                        Preview
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Belum ada surat keterangan diterbitkan.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuratKeteranganTable;

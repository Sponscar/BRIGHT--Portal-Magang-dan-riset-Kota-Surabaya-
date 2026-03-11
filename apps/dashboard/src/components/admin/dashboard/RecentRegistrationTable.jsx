const RecentRegistrationTable = ({ applications, getStatusBadge }) => {
    return (
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
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined notranslate text-[18px]">filter_list</span>
                        Filter
                    </button>
                    <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                        <span className="material-symbols-outlined notranslate text-[18px]">add</span>
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
                        {applications.map((app) => (
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
                                    <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded hover:bg-blue-50">
                                        <span className="material-symbols-outlined notranslate text-[20px]">visibility</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-center">
                <button className="text-sm font-semibold text-primary hover:text-primary-hover hover:underline transition-colors">
                    Lihat Semua Pendaftar
                </button>
            </div>
        </div>
    );
};

export default RecentRegistrationTable;

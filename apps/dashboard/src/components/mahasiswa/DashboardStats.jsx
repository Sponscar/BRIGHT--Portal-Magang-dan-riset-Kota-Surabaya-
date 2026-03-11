import { Link } from 'react-router-dom';

const DashboardStats = ({ proposalStatus }) => {
    return (
        <div className="grid gap-4 md:grid-cols-3 shrink-0">
            {/* Proposal Status Card */}
            <div className="flex flex-col justify-between rounded-xl bg-white p-5 h-44 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow border border-slate-100">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#4c739a] mb-2">Status Proposal</p>
                        <h3 className="text-xl font-bold text-[#0d141b] leading-tight">Proposal<br />Magang</h3>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-lg text-primary">
                        <span className="material-symbols-outlined notranslate text-[24px]">upload_file</span>
                    </div>
                </div>
                <div className="mt-auto">
                    {proposalStatus === 'upload_required' && (
                        <span className="inline-flex items-center rounded-md bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 gap-1.5 border border-blue-200 animate-pulse">
                            <span className="material-symbols-outlined notranslate text-[16px]">error</span>
                            Silahkan Upload
                        </span>
                    )}
                    {proposalStatus === 'pending_verification' && (
                        <span className="inline-flex items-center rounded-md bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700 gap-1.5 border border-yellow-200">
                            <span className="material-symbols-outlined notranslate text-[16px]">hourglass_empty</span>
                            Menunggu Verifikasi
                        </span>
                    )}
                    {proposalStatus === 'revision' && (
                        <span className="inline-flex items-center rounded-md bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 gap-1.5 border border-orange-200">
                            <span className="material-symbols-outlined notranslate text-[16px]">edit_document</span>
                            Perlu Revisi
                        </span>
                    )}
                    {proposalStatus === 'approved' && (
                        <span className="inline-flex items-center rounded-md bg-green-100 px-3 py-1 text-xs font-bold text-green-700 gap-1.5 border border-green-200">
                            <span className="material-symbols-outlined notranslate text-[16px]">check_circle</span>
                            Disetujui
                        </span>
                    )}
                </div>
            </div>

            {/* Logbook Card */}
            {proposalStatus === 'approved' ? (
                <Link to="/student/logbook" className="flex flex-col justify-between rounded-xl bg-white p-5 h-44 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow border border-slate-100 cursor-pointer ring-2 ring-transparent hover:ring-primary/20">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-[#4c739a] mb-2">Logbook</p>
                            <h3 className="text-xl font-bold leading-tight text-[#0d141b]">
                                Terbuka
                            </h3>
                        </div>
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <span className="material-symbols-outlined notranslate text-[24px]">
                                menu_book
                            </span>
                        </div>
                    </div>
                    <div className="mt-auto flex items-center gap-2 p-2 rounded-lg bg-green-50">
                        <span className="material-symbols-outlined notranslate text-sm text-green-600">
                            check_circle
                        </span>
                        <p className="text-[10px] font-medium text-green-700">
                            Logbook dapat diisi
                        </p>
                    </div>
                </Link>
            ) : (
                <div className="flex flex-col justify-between rounded-xl bg-white p-5 h-44 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-[#4c739a] mb-2">Logbook</p>
                            <h3 className="text-xl font-bold leading-tight text-slate-400">
                                Terkunci
                            </h3>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100 text-slate-400">
                            <span className="material-symbols-outlined notranslate text-[24px]">
                                lock
                            </span>
                        </div>
                    </div>
                    <div className="mt-auto flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                        <span className="material-symbols-outlined notranslate text-sm text-slate-400">
                            lock
                        </span>
                        <p className="text-[10px] font-medium text-slate-500">
                            Lengkapi proposal untuk membuka
                        </p>
                    </div>
                </div>
            )}

            {/* Sertifikat Card */}
            <div className="flex flex-col justify-between rounded-xl bg-white p-5 h-44 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow opacity-90 border border-slate-100">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#4c739a] mb-2">Sertifikat</p>
                        <h3 className="text-xl font-bold text-slate-400">Belum<br />Tersedia</h3>
                    </div>
                    <div className="bg-slate-100 p-2 rounded-lg text-slate-400">
                        <span className="material-symbols-outlined notranslate text-[24px]">lock</span>
                    </div>
                </div>
                <div className="mt-auto flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                    <span className="material-symbols-outlined notranslate text-slate-400 text-sm">lock_clock</span>
                    <p className="text-[10px] font-medium text-slate-500">Selesaikan magang untuk membuka</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;

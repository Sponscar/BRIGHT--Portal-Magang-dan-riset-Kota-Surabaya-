const ProposalNotifications = ({ proposalStatus, handleUpload }) => {
    return (
        <div className="w-full rounded-xl bg-white p-5 shadow-sm border border-slate-100 flex flex-col h-full overflow-hidden">
            <div className="mb-4 flex items-center justify-between shrink-0">
                <h3 className="text-lg font-bold text-[#0d141b]">Notifikasi Terbaru</h3>
                <button className="text-xs font-semibold text-primary hover:underline">Tandai dibaca</button>
            </div>
            <div className="relative flex flex-col gap-6 pl-2 overflow-y-auto pr-2 flex-1">

                {/* Upload Required Notification */}
                {proposalStatus === 'upload_required' && (
                    <div className="relative flex gap-4">
                        <div className="absolute left-[16px] top-8 h-full w-px bg-slate-200 -z-10"></div>
                        <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-primary ring-4 ring-white">
                            <span className="material-symbols-outlined notranslate fill text-[18px]">priority_high</span>
                        </div>
                        <div className="flex flex-col gap-1 w-full bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-bold text-primary">Unggah Proposal Segera</p>
                                <span className="text-[10px] font-medium text-slate-500">Baru saja</span>
                            </div>
                            <p className="text-xs text-[#4c739a] leading-relaxed">Anda belum mengunggah dokumen proposal magang. Harap segera unggah untuk memulai proses verifikasi.</p>
                            <button
                                onClick={handleUpload}
                                className="self-start mt-2 rounded-md bg-primary px-3 py-1.5 text-[11px] font-bold text-white hover:bg-primary-hover transition-colors"
                            >
                                Upload Sekarang
                            </button>
                        </div>
                    </div>
                )}

                {/* Revision Notification */}
                {proposalStatus === 'revision' && (
                    <div className="relative flex gap-4">
                        <div className="absolute left-[16px] top-8 h-full w-px bg-slate-200 -z-10"></div>
                        <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 ring-4 ring-white">
                            <span className="material-symbols-outlined notranslate fill text-[18px]">edit_document</span>
                        </div>
                        <div className="flex flex-col gap-1 w-full bg-orange-50 p-3 rounded-lg border border-orange-100">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-bold text-orange-700">Revisi Proposal Diperlukan</p>
                                <span className="text-[10px] font-medium text-slate-500">Baru saja</span>
                            </div>
                            <p className="text-xs text-[#4c739a] leading-relaxed">Admin meminta revisi pada proposal Anda. Silakan periksa catatan dan unggah kembali.</p>
                            <button
                                onClick={handleUpload}
                                className="self-start mt-2 rounded-md bg-orange-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-orange-700 transition-colors"
                            >
                                Upload Revisi
                            </button>
                        </div>
                    </div>
                )}

                {/* Approved Notification */}
                {proposalStatus === 'approved' && (
                    <div className="relative flex gap-4">
                        <div className="absolute left-[16px] top-8 h-full w-px bg-slate-200 -z-10"></div>
                        <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 ring-4 ring-white">
                            <span className="material-symbols-outlined notranslate fill text-[18px]">check_circle</span>
                        </div>
                        <div className="flex flex-col gap-1 w-full bg-green-50 p-3 rounded-lg border border-green-100">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-bold text-green-700">Proposal Disetujui</p>
                                <span className="text-[10px] font-medium text-slate-500">Baru saja</span>
                            </div>
                            <p className="text-xs text-[#4c739a] leading-relaxed">Selamat! Proposal Anda telah disetujui. Anda sekarang dapat mengakses Logbook.</p>
                        </div>
                    </div>
                )}

                {/* Account Acceptance Notification - Always visible for context */}
                <div className="relative flex gap-4">
                    <div className="absolute left-[16px] top-8 h-full w-px bg-slate-200 -z-10"></div>
                    <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 ring-4 ring-white">
                        <span className="material-symbols-outlined notranslate fill text-[18px]">info</span>
                    </div>
                    <div className="flex flex-col gap-1 w-full p-2">
                        <div className="flex justify-between items-start">
                            <p className="text-sm font-bold text-[#0d141b]">Pendaftaran Diterima</p>
                            <span className="text-[10px] font-medium text-slate-400">Kemarin</span>
                        </div>
                        <p className="text-xs text-[#4c739a] leading-relaxed">Pendaftaran akun magang Anda telah diterima. Langkah selanjutnya adalah mengunggah proposal.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProposalNotifications;

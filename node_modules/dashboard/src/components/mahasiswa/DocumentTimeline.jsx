const DocumentTimeline = () => {
    return (
        <div className="w-full overflow-x-auto pb-6 custom-scrollbar">
            <div className="relative min-w-[950px] pt-2">
                {/* Garis Dasar: Presisi dengan left/right di tengah kolom Grid */}
                {/* Ada 7 kolom, garis mulai dari 1/14 lebar s.d 13/14 lebar (total grid) */}
                <div className="absolute top-[28px] left-[7.14%] right-[7.14%] h-1 z-0 flex items-center">
                    {/* Progress warna primary di stage ke-2 (1/6 = 16.666%) */}
                    <div className="w-[16.666%] h-1 border-t-2 border-dashed border-primary"></div>
                    <div className="w-[83.333%] h-1 border-t-2 border-dashed border-slate-300"></div>
                </div>

                {/* Item Grid (Proporsional dan sejajar) */}
                <div className="grid grid-cols-7 relative z-10 w-full text-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white ring-[6px] ring-[#f6f7f8] shadow-sm">
                            <span className="material-symbols-outlined notranslate text-[20px] font-bold">check</span>
                        </div>
                        <span className="text-xs font-bold text-green-600">Daftar Magang</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white ring-[6px] ring-blue-50 shadow-lg shadow-blue-200">
                            <span className="material-symbols-outlined notranslate text-[20px]">description</span>
                        </div>
                        <span className="text-xs font-bold text-primary">Dokumen Magang</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 ring-[6px] ring-[#f6f7f8] border border-slate-200">
                            <span className="material-symbols-outlined notranslate text-[20px]">fact_check</span>
                        </div>
                        <span className="text-xs font-medium text-slate-500">Verifikasi</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 ring-[6px] ring-[#f6f7f8] border border-slate-200">
                            <span className="material-symbols-outlined notranslate text-[20px]">how_to_reg</span>
                        </div>
                        <span className="text-xs font-medium text-slate-500">Penerimaan</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 ring-[6px] ring-[#f6f7f8] border border-slate-200">
                            <span className="material-symbols-outlined notranslate text-[20px]">flag</span>
                        </div>
                        <span className="text-xs font-medium text-slate-500">Pelaksanaan</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 ring-[6px] ring-[#f6f7f8] border border-slate-200">
                            <span className="material-symbols-outlined notranslate text-[20px]">document_scanner</span>
                        </div>
                        <span className="text-xs font-medium text-slate-500">Pelaporan</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 ring-[6px] ring-[#f6f7f8] border border-slate-200">
                            <span className="material-symbols-outlined notranslate text-[20px]">workspace_premium</span>
                        </div>
                        <span className="text-xs font-medium text-slate-500">Sertifikat</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentTimeline;

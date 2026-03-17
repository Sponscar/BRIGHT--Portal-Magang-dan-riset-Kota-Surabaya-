const TopHeader = ({ title, subtitle, children }) => {
    return (
        <header className="hidden lg:flex bg-white border-b border-[#f3e7e7] px-8 py-5 items-center justify-between shrink-0">
            <div>
                <h1 className="text-2xl font-bold text-[#1b0d0d] tracking-tight">{title}</h1>
                {subtitle && <p className="text-sm text-slate-800 mt-1">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-4">
                {children}
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-[#1b0d0d] leading-none">Mahasiswa</p>
                        <p className="text-xs text-slate-500 mt-1">Peserta Magang</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100">
                        <span className="material-symbols-outlined notranslate text-[20px]">person</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopHeader;

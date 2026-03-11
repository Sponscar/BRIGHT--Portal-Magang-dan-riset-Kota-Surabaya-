const MobileHeader = ({ title }) => {
    return (
        <header className="flex h-12 w-full items-center justify-between lg:hidden border-b border-slate-200 bg-white px-4 lg:px-6">
            <div className="flex items-center gap-3">
                <button className="flex items-center justify-center text-[#4c739a] lg:hidden">
                    <span className="material-symbols-outlined notranslate">menu</span>
                </button>
                <h2 className="text-base font-bold text-[#0d141b]">{title}</h2>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative text-[#4c739a] transition-colors hover:text-primary">
                    <span className="material-symbols-outlined notranslate">notifications</span>
                    <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white"></span>
                </button>
            </div>
        </header>
    );
};

export default MobileHeader;

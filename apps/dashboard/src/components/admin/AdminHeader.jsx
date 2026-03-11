const AdminHeader = ({ title, subtitle, children }) => {
    return (
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shrink-0">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
                {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-4">
                {children}
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900 leading-none">Admin Utama</p>
                        <p className="text-xs text-slate-500 mt-1">Administrator</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;

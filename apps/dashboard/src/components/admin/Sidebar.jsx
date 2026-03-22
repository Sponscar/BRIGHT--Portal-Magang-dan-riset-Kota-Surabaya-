import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        setIsLogoutModalOpen(false);
        logout();
        navigate('/login');
    };

    const getLinkClass = ({ isActive }) => {
        const baseClass = "flex items-center gap-3 rounded-lg px-3 py-2 transition-all";
        const activeClass = "bg-white text-primary font-bold shadow-sm";
        const inactiveClass = "text-white/80 hover:bg-white/10 hover:text-white";

        return isActive ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
    };

    const getIconClass = ({ isActive }) => {
        return isActive ? "material-symbols-outlined notranslate fill text-[20px]" : "material-symbols-outlined notranslate text-[20px]";
    };

    return (
        <>
            <aside className="hidden w-64 flex-col border-r border-blue-800 bg-primary lg:flex justify-between relative overflow-hidden">
                {/* Elegant Background Motif - Batik Kawung */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    <div
                        className="absolute inset-0 z-0 overflow-hidden"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='kawungReal' patternUnits='userSpaceOnUse' width='60' height='60'%3E%3Crect width='60' height='60' fill='none'/%3E%3Cg transform='rotate(45 30 30)' fill='rgba(255,255,255,0.08)' stroke='rgba(255,255,255,0.4)' stroke-width='1'%3E%3Cellipse cx='30' cy='10' rx='10' ry='20'/%3E%3Cellipse cx='30' cy='50' rx='10' ry='20'/%3E%3Cellipse cx='10' cy='30' rx='20' ry='10'/%3E%3Cellipse cx='50' cy='30' rx='20' ry='10'/%3E%3Ccircle cx='30' cy='30' r='4' fill='rgba(255,255,255,0.6)' stroke='none'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23kawungReal)'/%3E%3C/svg%3E")`,
                            backgroundSize: '100px 100px'
                        }}
                    ></div>
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-primary/90 to-transparent"></div>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto relative z-10">
                    <div className="p-4 pb-2">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 bg-white p-1.5 items-center justify-center rounded-xl overflow-hidden shadow-sm">
                                <img src="/logo1.png" alt="Logo 1" className="h-full w-full object-contain" />
                            </div>
                            <div className="flex h-10 w-10 bg-white p-1.5 items-center justify-center rounded-xl overflow-hidden shadow-sm">
                                <img src="/logo.png" alt="BRIDA Logo" className="h-full w-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-base font-bold leading-tight tracking-tight text-white">BRIGHT</h1>
                                <p className="text-[11px] font-medium text-white/80">Admin Portal</p>
                            </div>
                        </div>
                    </div>
                    <nav className="px-2 py-1">
                        <ul className="flex flex-col gap-0.5">
                            <li>
                                <NavLink to="/admin" end className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>dashboard</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Dashboard</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/mahasiswa" className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>group</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Mahasiswa</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/teams" className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>groups</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Data Tim Lokus</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/verification" className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>folder</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Verifikasi Mahasiswa</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/logbook" className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>rate_review</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Review Logbook</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/reports" className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>description</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Laporan Akhir / Jurnal</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin/results" className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>workspace_premium</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Penilaian & Sertifikat</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="mt-auto relative z-10 border-t border-white/10 bg-black/10 transition-colors hover:bg-black/20">
                    <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-full border border-white/50 bg-white/10 shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
                                <span className="material-symbols-outlined notranslate text-white text-[20px]">admin_panel_settings</span>
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-sm font-bold text-white truncate">{user?.name || 'Admin'}</p>
                                <p className="text-[11px] text-white/70 truncate">{user?.email || 'admin@brida.surabaya.go.id'}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="group flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 py-2 text-white transition-all hover:bg-white hover:text-blue-600 hover:shadow-md">
                            <span className="material-symbols-outlined notranslate text-[18px] group-hover:scale-110 transition-transform">logout</span>
                            <span className="text-xs font-bold uppercase tracking-wider">Keluar</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined notranslate text-blue-500 text-3xl">logout</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Konfirmasi Keluar</h3>
                            <p className="text-sm text-slate-500 mb-6">
                                Apakah Anda yakin ingin keluar dari sesi Admin?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsLogoutModalOpen(false)}
                                    className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmLogout}
                                    className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                >
                                    Ya, Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;

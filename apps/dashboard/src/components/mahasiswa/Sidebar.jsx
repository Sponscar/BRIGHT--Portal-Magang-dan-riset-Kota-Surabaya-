import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ devControls }) => {
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
                        className="absolute inset-0 opacity-15"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 40c-11-11-25-11-35 0-11 11-11 25 0 35 11 11 25 11 35 0 11-11 11-25 0-35zm0 25c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zM10 10c11 11 25 11 35 0 11-11 11-25 0-35-11-11-25-11-35 0-11 11-11 25 0 35zm25-15c0 5.5-4.5 10-10 10S15-4.5 15-10s4.5-10 10-10 10 4.5 10 10zM70 70c11 11 25 11 35 0 11-11 11-25 0-35-11-11-25-11-35 0-11 11-11 25 0 35zm25-15c0 5.5-4.5 10-10 10S75 55.5 75 50s4.5-10 10-10 10 4.5 10 10zM10 70c-11-11-11-25 0-35 11-11 25-11 35 0 11 11 11 25 0 35-11 11-25 11-35 0zm15-25c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zM70 10c-11 11-11 25 0 35 11 11 25 11 35 0 11-11 11-25 0-35-11-11-25-11-35 0zm15 25c-5.5 0-10-4.5-10-10S85-4.5 85-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z' fill='%23ffffff' fill-opacity='0.6' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                            backgroundSize: '40px 40px'
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
                                <p className="text-[11px] font-medium text-white/80">Student Portal</p>
                            </div>
                        </div>
                    </div>
                    <nav className="px-2 py-1">
                        <ul className="flex flex-col gap-0.5">
                            <li>
                                <NavLink to="/student" end className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>home</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Beranda</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/student/documents" className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>description</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Dokumen</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/student/attendance" className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>calendar_month</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Presensi</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={
                                        user?.timKerja === 'Kesekertariatan' ? '/student/team/secretariat' :
                                            user?.timKerja === 'Riset' ? '/student/team/research' :
                                                user?.timKerja === 'Inovasi' ? '/student/team/innovation' :
                                                    '/student/profile'
                                    }
                                    className={getLinkClass}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>groups</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Tim BRIDA</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/student/logbook" className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>menu_book</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Logbook</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/student/results" className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>workspace_premium</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Hasil & Sertifikat</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/student/profile" className={getLinkClass}>
                                    {({ isActive }) => (
                                        <>
                                            <span className={getIconClass({ isActive })}>person</span>
                                            <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Profil</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="px-3 pb-6 mt-auto mb-12 relative z-10">
                    {devControls && (
                        <div className="mb-4 p-3 bg-white/10 rounded-xl border border-white/20 text-white text-xs backdrop-blur-sm shadow-sm">
                            <p className="font-bold mb-2 opacity-90 border-b border-white/20 pb-1">Dev Controls (Demo):</p>
                            <div className="opacity-90">{devControls}</div>
                        </div>
                    )}
                    <div className="bg-white/10 rounded-2xl border border-white/20 p-4 shadow-sm backdrop-blur-sm mt-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-11 w-11 rounded-full border-2 border-white bg-white shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
                                {localStorage.getItem('user_profile_image') ? (
                                    <img src={localStorage.getItem('user_profile_image')} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="material-symbols-outlined notranslate text-primary text-[24px]">person</span>
                                )}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                                <p className="text-[11px] text-white/70 truncate">{user?.email || 'nana.a@student.com'}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 py-2.5 text-white transition-all hover:bg-white hover:text-blue-600 hover:shadow-md">
                            <span className="material-symbols-outlined notranslate text-[20px] group-hover:scale-110 transition-transform">logout</span>
                            <span className="text-sm font-bold">Keluar</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined notranslate text-blue-500 text-3xl">logout</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Konfirmasi Keluar</h3>
                            <p className="text-sm text-slate-500 mb-6">
                                Apakah Anda yakin ingin keluar dari aplikasi? Sesi Anda akan diakhiri.
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

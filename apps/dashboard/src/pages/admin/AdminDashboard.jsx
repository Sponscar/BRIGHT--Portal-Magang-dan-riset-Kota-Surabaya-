import Sidebar from '../../components/admin/Sidebar.jsx';
import RecentRegistrationTable from '../../components/admin/dashboard/RecentRegistrationTable';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Pendaftar', value: 156, icon: 'groups', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', neon: 'shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]' },
        { label: 'Menunggu Verifikasi', value: 23, icon: 'hourglass_top', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', neon: 'shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]' },
        { label: 'Diterima', value: 98, icon: 'check_circle', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', neon: 'shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]' },
        { label: 'Ditolak', value: 35, icon: 'cancel', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', neon: 'shadow-[0_0_15px_rgba(225,29,72,0.2)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)]' },
    ];

    const recentApplications = [
        { id: 1, name: 'Ahmad Rizky', university: 'Institut Teknologi Sepuluh Nopember', major: 'Teknik Informatika', status: 'pending', date: '01 Feb 2026' },
        { id: 2, name: 'Siti Aminah', university: 'Universitas Airlangga', major: 'Kesehatan Masyarakat', status: 'approved', date: '01 Feb 2026' },
        { id: 3, name: 'Budi Santoso', university: 'Universitas Brawijaya', major: 'Ilmu Komunikasi', status: 'rejected', date: '30 Jan 2026' },
        { id: 4, name: 'Dewi Lestari', university: 'UPN Veteran Jawa Timur', major: 'Sistem Informasi', status: 'pending', date: '29 Jan 2026' },
        { id: 5, name: 'Eko Prasetyo', university: 'PENS', major: 'Teknik Komputer', status: 'approved', date: '28 Jan 2026' },
    ];

    const getStatusBadge = (status) => {
        const styles = { pending: 'bg-amber-50 text-amber-700 border-amber-200', approved: 'bg-emerald-50 text-emerald-700 border-emerald-200', rejected: 'bg-blue-50 text-blue-700 border-blue-200' };
        const labels = { pending: 'Menunggu', approved: 'Diterima', rejected: 'Ditolak' };
        return <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>{labels[status]}</span>;
    };

    return (
        <div className="flex h-screen w-full bg-[#f8f9fa] text-slate-800 font-display overflow-hidden">
            <Sidebar role="admin" />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
                        <p className="text-sm text-slate-500 mt-1">Pantau aktivitas pendaftaran magang terkini.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 leading-none">Admin Utama</p>
                                <p className="text-xs text-slate-500 mt-1">Administrator</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">A</div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className={`bg-white rounded-2xl p-6 border ${stat.border} ${stat.neon} transition-all duration-300 relative overflow-hidden group hover:-translate-y-1`}>
                                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
                                        <span className="material-symbols-outlined notranslate text-6xl">{stat.icon}</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
                                            <span className="material-symbols-outlined notranslate text-2xl">{stat.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{stat.value}</h3>
                                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Applications Table */}
                        <RecentRegistrationTable applications={recentApplications} getStatusBadge={getStatusBadge} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;

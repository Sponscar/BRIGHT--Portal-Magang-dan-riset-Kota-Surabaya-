import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import StatsGrid from '../../components/admin/dashboard/StatsGrid';
import RecentApplicationsTable from '../../components/admin/dashboard/RecentApplicationsTable';
import ApplicantDetailModal from '../../components/admin/dashboard/ApplicantDetailModal';

const DashboardOverview = () => {
    const navigate = useNavigate();

    // Mock data
    const stats = [
        { label: 'Total Pendaftar', value: 156, icon: 'groups', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', darkText: 'text-blue-900' },
        { label: 'Menunggu Verifikasi', value: 23, icon: 'hourglass_top', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', darkText: 'text-amber-900' },
        { label: 'Diterima', value: 98, icon: 'check_circle', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', darkText: 'text-emerald-900' },
        { label: 'Ditolak', value: 35, icon: 'cancel', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', darkText: 'text-red-900' },
    ];

    const recentApplications = [
        { id: 1, name: 'Ahmad Rizky', university: 'Institut Teknologi Sepuluh Nopember', major: 'Teknik Informatika', status: 'pending', date: '01 Feb 2026', email: 'ahmad.rizky@its.ac.id', phone: '081234567890', team: 'Riset' },
        { id: 2, name: 'Siti Aminah', university: 'Universitas Airlangga', major: 'Kesehatan Masyarakat', status: 'approved', date: '01 Feb 2026', email: 'siti.aminah@unair.ac.id', phone: '081234567891', team: 'Riset' },
        { id: 3, name: 'Budi Santoso', university: 'Universitas Brawijaya', major: 'Ilmu Komunikasi', status: 'pending', date: '30 Jan 2026', email: 'budi.santoso@ub.ac.id', phone: '081234567892', team: 'Kesekretariatan' },
        { id: 4, name: 'Dewi Lestari', university: 'UPN Veteran Jawa Timur', major: 'Sistem Informasi', status: 'pending', date: '29 Jan 2026', email: 'dewi.lestari@upnvjt.ac.id', phone: '081234567893', team: 'Inovasi' },
        { id: 5, name: 'Eko Prasetyo', university: 'PENS', major: 'Teknik Komputer', status: 'approved', date: '28 Jan 2026', email: 'eko.prasetyo@pens.ac.id', phone: '081234567894', team: 'Inovasi' },
    ];

    const [viewDetail, setViewDetail] = useState(null);

    const handleExport = (appsToExport = recentApplications) => {
        const headers = ['No', 'Nama', 'Perguruan Tinggi', 'Prodi', 'Status', 'Tanggal Daftar'];
        const rows = appsToExport.map((app, i) => [
            i + 1,
            app.name,
            app.university,
            app.major,
            app.status === 'pending' ? 'Menunggu' : app.status === 'approved' ? 'Diterima' : 'Ditolak',
            app.date
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `pendaftar_magang_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    return (
        <>
            <AdminHeader title="Dashboard Overview" subtitle="Pantau aktivitas pendaftaran magang terkini." />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <StatsGrid stats={stats} />

                    <RecentApplicationsTable
                        applications={recentApplications}
                        onViewDetail={setViewDetail}
                        onViewAll={() => navigate('/admin/verification')}
                        onExport={handleExport}
                    />
                </div>
            </main>

            <ApplicantDetailModal
                applicant={viewDetail}
                onClose={() => setViewDetail(null)}
                onNavigate={() => { setViewDetail(null); navigate('/admin/verification'); }}
            />
        </>
    );
};

export default DashboardOverview;

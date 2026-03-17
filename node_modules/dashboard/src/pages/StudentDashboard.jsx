import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MobileHeader from '../components/mahasiswa/MobileHeader';
import TopHeader from '../components/mahasiswa/TopHeader';
import DashboardStats from '../components/mahasiswa/DashboardStats';
import ProposalNotifications from '../components/mahasiswa/ProposalNotifications';


const StudentDashboard = () => {
    const { user } = useAuth();
    const [proposalStatus, setProposalStatus] = useState('upload_required');

    const handleUpload = () => {
        setProposalStatus('pending_verification');
    };

    const simulateAdminAction = (action) => {
        setProposalStatus(action);
    };

    return (
        <>
                <MobileHeader title="Dashboard Magang" />
                <TopHeader title="Dashboard Magang" subtitle={`Selamat datang ${user?.name || ''}`} />

                <main className="flex-1 overflow-y-auto bg-[#f6f7f8] p-3 lg:p-4">
                    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 h-full">
                        <div className="flex flex-row items-center justify-between gap-2 px-1 shrink-0 lg:hidden">
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold text-[#0d141b]">Selamat Datang, {user?.name}!</h1>
                                <p className="text-xs text-[#4c739a] hidden sm:block">Ringkasan kemajuan magang Anda.</p>
                            </div>
                        </div>

                        <DashboardStats proposalStatus={proposalStatus} />

                        <div className="flex flex-col flex-1 min-h-0">
                            <ProposalNotifications
                                proposalStatus={proposalStatus}
                                handleUpload={handleUpload}
                            />
                        </div>

                        {proposalStatus !== 'approved' && (
                            <div className="w-full mt-auto">
                                <div className="rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1e40af] p-6 text-white shadow-md relative overflow-hidden flex flex-row items-center justify-between min-h-[100px]">
                                    <span className="material-symbols-outlined notranslate absolute -right-8 -bottom-16 text-[180px] text-white/10 rotate-12 pointer-events-none">emoji_events</span>
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 w-full">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="material-symbols-outlined notranslate fill text-[24px]">flag</span>
                                                <h3 className="text-lg font-bold">Lengkapi Berkas Proposal</h3>
                                            </div>
                                            <p className="text-sm text-white/90 leading-relaxed max-w-2xl">Akses fitur Logbook dan Sertifikat hanya dapat dilakukan setelah proposal Anda diverifikasi. Segera unggah berkas Anda.</p>
                                        </div>
                                        <div className="flex items-center gap-3 bg-white/20 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/10 shrink-0">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                <span className="material-symbols-outlined notranslate fill text-white text-[24px]">priority_high</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-bold text-white/70">Status Tindakan</span>
                                                <span className="font-bold text-xl">Wajib Unggah</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
        </>
    );
};

export default StudentDashboard;

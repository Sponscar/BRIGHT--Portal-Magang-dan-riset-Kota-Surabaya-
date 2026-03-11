import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/mahasiswa/Sidebar';
import MobileHeader from '../../components/mahasiswa/MobileHeader';
import TeamInfo from '../../components/mahasiswa/teams/TeamInfo';
import TeamResponsibilities from '../../components/mahasiswa/teams/TeamResponsibilities';
import TeamRequirements from '../../components/mahasiswa/teams/TeamRequirements';

// Mock data - Nanti akan diganti dengan fetch dari API/database
const MOCK_TEAMS_DATA = {
    secretariat: {
        id: '1',
        name: 'Kesekretariatan',
        slug: 'secretariat',
        icon: 'folder_shared',
        short_description: 'Tim yang menangani administrasi dan dokumentasi BRIDA',
        full_description: 'Tim Kesekretariatan bertanggung jawab atas pengelolaan administrasi, dokumentasi kegiatan, dan koordinasi internal BRIGHT. Tim ini menjadi tulang punggung operasional yang memastikan semua proses berjalan lancar dan terdokumentasi dengan baik.',
        image_url: null,
        responsibilities: [
            'Mengelola arsip dan dokumen administrasi',
            'Membuat laporan kegiatan berkala',
            'Koordinasi jadwal dan agenda',
            'Mengelola surat menyurat',
            'Dokumentasi rapat dan kegiatan'
        ],
        requirements: [
            'Teliti dan rapi dalam bekerja',
            'Mahir Microsoft Office (Word, Excel, PowerPoint)',
            'Kemampuan komunikasi yang baik',
            'Mampu bekerja dalam tim',
            'Memiliki manajemen waktu yang baik'
        ],
        is_active: true
    },
    research: {
        id: '2',
        name: 'Riset',
        slug: 'research',
        icon: 'science',
        short_description: 'Tim yang fokus pada penelitian dan pengembangan',
        full_description: 'Tim Riset BRIGHT bertugas melakukan kajian, penelitian, dan analisis data untuk mendukung pengambilan keputusan berbasis bukti. Tim ini bekerja sama dengan berbagai stakeholder untuk menghasilkan rekomendasi strategis.',
        image_url: null,
        responsibilities: [
            'Melakukan penelitian dan kajian',
            'Mengumpulkan dan menganalisis data',
            'Menyusun laporan hasil penelitian',
            'Memberikan rekomendasi berbasis data',
            'Kolaborasi dengan instansi terkait'
        ],
        requirements: [
            'Kemampuan analisis data yang kuat',
            'Familiar dengan metodologi penelitian',
            'Mampu menulis laporan ilmiah',
            'Kritis dan detail oriented',
            'Mahir menggunakan tools analisis (Excel, SPSS, dll)'
        ],
        is_active: true
    },
    innovation: {
        id: '3',
        name: 'Inovasi',
        slug: 'innovation',
        icon: 'lightbulb',
        short_description: 'Tim yang mengembangkan solusi inovatif',
        full_description: 'Tim Inovasi BRIGHT berfokus pada pengembangan ide-ide kreatif dan solusi inovatif untuk tantangan pembangunan daerah. Tim ini menjadi motor penggerak transformasi digital dan inovasi di lingkungan pemerintah kota.',
        image_url: null,
        responsibilities: [
            'Mengembangkan ide dan konsep inovatif',
            'Prototyping solusi digital',
            'Mengelola program inovasi daerah',
            'Fasilitasi workshop dan hackathon',
            'Kolaborasi dengan startup dan komunitas tech'
        ],
        requirements: [
            'Kreatif dan open-minded',
            'Familiar dengan design thinking',
            'Kemampuan presentasi yang baik',
            'Tertarik dengan teknologi dan digital',
            'Mampu bekerja dalam tim multidisiplin'
        ],
        is_active: true
    }
};

const TeamDetail = () => {
    const { teamSlug } = useParams();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulasi fetch dari API
        // TODO: Ganti dengan actual API call ke backend
        // const fetchTeam = async () => {
        //     try {
        //         const response = await fetch(`/api/teams/${teamSlug}`);
        //         const data = await response.json();
        //         setTeam(data);
        //     } catch (err) {
        //         setError('Gagal memuat data tim');
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        // fetchTeam();

        // Untuk sekarang, gunakan mock data
        setLoading(true);
        setTimeout(() => {
            const teamData = MOCK_TEAMS_DATA[teamSlug];
            if (teamData) {
                setTeam(teamData);
                setError(null);
            } else {
                setError('Tim tidak ditemukan');
            }
            setLoading(false);
        }, 300); // Simulasi network delay
    }, [teamSlug]);

    if (loading) {
        return (
            <div className="flex h-screen w-full bg-[#fafafa] text-[#1b0d0d] font-display overflow-hidden">
                <Sidebar />
                <div className="flex h-full flex-1 flex-col overflow-hidden">
                    <MobileHeader title="Memuat..." />
                    <main className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-8">
                        <div className="max-w-4xl mx-auto flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    if (error || !team) {
        return (
            <div className="flex h-screen w-full bg-[#fafafa] text-[#1b0d0d] font-display overflow-hidden">
                <Sidebar />
                <div className="flex h-full flex-1 flex-col overflow-hidden">
                    <MobileHeader title="Error" />
                    <main className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-8 text-center">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined notranslate text-blue-500 text-3xl">error</span>
                                </div>
                                <h2 className="text-lg font-bold text-[#1b0d0d] mb-2">{error || 'Tim tidak ditemukan'}</h2>
                                <p className="text-gray-500">Silakan coba lagi atau hubungi administrator.</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-[#fafafa] text-[#1b0d0d] font-display overflow-hidden">
            <Sidebar />
            <div className="flex h-full flex-1 flex-col overflow-hidden">
                <MobileHeader title={`Tim ${team.name}`} />
                <main className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Team Info Component */}
                        <TeamInfo team={team} />

                        {/* Responsibilities Component */}
                        <TeamResponsibilities responsibilities={team.responsibilities} />

                        {/* Requirements Component */}
                        <TeamRequirements requirements={team.requirements} />

                        {/* Info Card */}
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined notranslate text-primary text-2xl">tips_and_updates</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#1b0d0d] mb-1">Informasi</h3>
                                    <p className="text-gray-600 text-sm">
                                        Anda telah di-assign ke Tim {team.name} oleh Admin. Silakan ikuti arahan dari pembimbing tim untuk memulai kegiatan magang Anda.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TeamDetail;

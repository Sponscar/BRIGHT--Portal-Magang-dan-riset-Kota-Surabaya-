import { useState } from 'react';
import Sidebar from '../components/mahasiswa/Sidebar';
import MobileHeader from '../components/mahasiswa/MobileHeader';
import ResultsCard from '../components/mahasiswa/results/ResultsCard';
import CertificateCard from '../components/mahasiswa/results/CertificateCard';
import PerformanceAssessment from '../components/mahasiswa/results/PerformanceAssessment';
import SelfAssessmentForm from '../components/mahasiswa/results/SelfAssessmentForm';
import PeerAssessmentForm from '../components/mahasiswa/results/PeerAssessmentForm';
import Swal from 'sweetalert2';

const Results = () => {
    const [uploadedReport, setUploadedReport] = useState(null);

    // ─── Mock Data: Penilaian ───
    // Data ini nanti diganti dengan API call ke GET /api/penilaian/me

    const behaviorCriteria = [
        { id: 'c1', name: 'Kedisiplinan (Discipline)' },
        { id: 'c2', name: 'Tanggung Jawab (Responsibility)' },
        { id: 'c3', name: 'Kerja Sama (Teamwork)' },
        { id: 'c4', name: 'Sikap & Etika (Attitude)' },
    ];

    // Rata-rata nilai dari semua penilai per kriteria
    const behaviorData = [
        { id: 1, name: 'Kedisiplinan (Discipline)', nilai: '85', keterangan: 'Sangat disiplin' },
        { id: 2, name: 'Tanggung Jawab (Responsibility)', nilai: '82', keterangan: 'Bertanggung jawab' },
        { id: 3, name: 'Kerja Sama (Teamwork)', nilai: '88', keterangan: 'Kerja sama baik' },
        { id: 4, name: 'Sikap & Etika (Attitude)', nilai: '80', keterangan: 'Sopan dan beretika' },
    ];

    const performanceData = [
        { id: 1, name: 'Kualitas Hasil Kerja (Quality of Work)', nilai: '86', keterangan: 'Hasil kerja berkualitas' },
        { id: 2, name: 'Ketepatan Waktu (Timeliness)', nilai: '78', keterangan: 'Kadang sedikit terlambat' },
        { id: 3, name: 'Kemampuan Teknis (Technical Skill)', nilai: '84', keterangan: 'Skill teknis baik' },
        { id: 4, name: 'Pemahaman Tugas (Task Understanding)', nilai: '82', keterangan: 'Paham tugas dengan baik' },
    ];

    // Mock: Nilai Akhir — dihitung dari formula:
    // NP = ((85+82+88+80)/4) × 0.4 = 83.75 × 0.4 = 33.50
    // NK = ((86+78+84+82)/4) × 0.6 = 82.50 × 0.6 = 49.50
    // NA = 33.50 + 49.50 = 83.00 → Grade B (Baik)
    const nilaiAkhir = {
        nilaiPerilaku: 83.75,
        nilaiPerilakuFinal: 33.50,
        nilaiKinerja: 82.50,
        nilaiKinerjaFinal: 49.50,
        nilaiAkhir: 83.00,
        grade: 'B',
    };

    // Mock: Self assessment state — sudah menilai diri sendiri
    const [hasSelfAssessment, setHasSelfAssessment] = useState(true);

    // Mock: Peers sesama tusi — dari GET /api/penilaian/peers
    const peers = [
        { id: 'p1', fullName: 'Ahmad Rizky', university: 'ITS', major: 'Teknik Informatika', alreadyAssessed: true },
        { id: 'p2', fullName: 'Rina Wijaya', university: 'ITS', major: 'Desain Produk', alreadyAssessed: false },
        { id: 'p3', fullName: 'Dewi Lestari', university: 'UPN Veteran Jawa Timur', major: 'Sistem Informasi', alreadyAssessed: false },
    ];

    // ─── Handlers ───

    const handleSelfAssessment = async (data) => {
        console.log('Self assessment submitted:', data);
        // API call: POST /api/penilaian/self-assessment
        setHasSelfAssessment(true);
        Swal.fire({
            icon: 'success',
            title: 'Tersimpan!',
            text: 'Penilaian diri sendiri berhasil disimpan.',
            confirmButtonColor: '#2563eb'
        });
    };

    const handlePeerAssessment = async (data) => {
        console.log('Peer assessment submitted:', data);
        // API call: POST /api/penilaian/peer-assessment
        Swal.fire({
            icon: 'success',
            title: 'Tersimpan!',
            text: 'Penilaian teman berhasil disimpan.',
            confirmButtonColor: '#2563eb'
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                Swal.fire({
                    icon: 'error',
                    title: 'Format Tidak Didukung',
                    text: 'Gunakan file dengan format PDF.',
                    confirmButtonColor: '#2563eb'
                });
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ukuran Terlalu Besar',
                    text: 'Ukuran file maksimal 5MB.',
                    confirmButtonColor: '#2563eb'
                });
                return;
            }
            setUploadedReport(file);
        }
    };

    const handleRemoveFile = () => {
        setUploadedReport(null);
    };

    const handleSubmit = () => {
        if (!uploadedReport) {
            Swal.fire({
                icon: 'warning',
                title: 'File Belum Diunggah',
                text: 'Silakan unggah laporan akhir terlebih dahulu.',
                confirmButtonColor: '#2563eb'
            });
            return;
        }
        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Laporan akhir berhasil disimpan (simulasi).',
            confirmButtonColor: '#2563eb'
        });
    };

    const handleCancel = () => {
        setUploadedReport(null);
    };

    return (
        <div className="flex h-screen w-full bg-[#f8f6f6] text-[#1b0d0d] font-display overflow-hidden">
            <Sidebar />

            <div className="flex h-full flex-1 flex-col overflow-hidden">
                <MobileHeader title="Hasil & Sertifikat" />

                <main className="flex-1 overflow-y-auto bg-[#f8f6f6] p-4 lg:p-8">
                    <div className="w-full max-w-6xl mx-auto space-y-6 pb-10">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Hasil & Sertifikat</h1>
                            <p className="text-sm text-gray-500 mt-1">Review penilaian magang dan unduh sertifikat kelulusan Anda secara resmi.</p>
                        </div>

                        {/* Main Grid: Penilaian + Sertifikat */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                            {/* Performance Assessment Component */}
                            <div className="lg:col-span-2">
                                <PerformanceAssessment
                                    behaviorData={behaviorData}
                                    performanceData={performanceData}
                                    nilaiAkhir={nilaiAkhir}
                                />
                            </div>

                            {/* Sertifikat Component */}
                            <div className="lg:col-span-1">
                                <CertificateCard />
                            </div>
                        </div>

                        {/* Self Assessment Form */}
                        <SelfAssessmentForm
                            criteria={behaviorCriteria}
                            hasSelfAssessment={hasSelfAssessment}
                            existingScores={null}
                            onSubmit={handleSelfAssessment}
                        />

                        {/* Peer Assessment Form */}
                        <PeerAssessmentForm
                            peers={peers}
                            criteria={behaviorCriteria}
                            onSubmit={handlePeerAssessment}
                        />

                        {/* Laporan Akhir Component */}
                        <ResultsCard
                            uploadedReport={uploadedReport}
                            onFileChange={handleFileChange}
                            onRemoveFile={handleRemoveFile}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                        />

                        {/* Footer */}
                        <footer className="mt-10 py-6 border-t border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-xs text-gray-500">© 2023 BRIGHT - Badan Riset dan Inovasi Daerah Kota Surabaya. All rights reserved.</p>
                                <div className="flex space-x-6">
                                    <a className="text-gray-400 hover:text-primary transition-colors text-xs" href="#">Privacy Policy</a>
                                    <a className="text-gray-400 hover:text-primary transition-colors text-xs" href="#">Terms of Service</a>
                                    <a className="text-gray-400 hover:text-primary transition-colors text-xs" href="#">Help Center</a>
                                </div>
                            </div>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Results;

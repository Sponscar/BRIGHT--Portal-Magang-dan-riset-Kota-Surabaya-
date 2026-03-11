import { useState } from 'react';
import Sidebar from '../components/mahasiswa/Sidebar';
import MobileHeader from '../components/mahasiswa/MobileHeader';
import DocumentTimeline from '../components/mahasiswa/DocumentTimeline';
import DocumentUploadSection from '../components/mahasiswa/DocumentUploadSection';
import AdministrationForm from '../components/mahasiswa/AdministrationForm';
import SuccessNotification from '../components/mahasiswa/SuccessNotification';

const Documents = () => {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSave = () => {
        // Mock save functionality
        setShowSuccess(true);
        // Hide notification after 3 seconds
        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    return (
        <div className="flex h-screen w-full bg-background-light text-[#0d141b] font-display overflow-hidden">
            <Sidebar />

            <div className="flex h-full flex-1 flex-col overflow-hidden">
                <MobileHeader title="Dokumen Magang" />

                <main className="flex-1 overflow-y-auto bg-[#f6f7f8] p-4 lg:p-8">
                    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 pb-10">
                        <div className="flex flex-col gap-1 px-1">
                            <h1 className="text-2xl font-bold text-[#0d141b]">Lengkapi Dokumen Magang</h1>
                            <p className="text-sm text-[#4c739a] font-medium max-w-3xl">Untuk melanjutkan proses pengajuan, silahkan unggah dokumen persyaratan berikut. Pastikan dokumen dalam format PDF dan tidak melebihi ukuran maksimal.</p>
                        </div>

                        <DocumentTimeline />

                        <SuccessNotification
                            message="Berhasil! Semua dokumen telah disimpan."
                            show={showSuccess}
                        />

                        <DocumentUploadSection onSave={handleSave} />

                        <AdministrationForm />

                        <div className="bg-primary p-6 flex items-start gap-4 rounded-xl shadow-sm mt-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                                <span className="material-symbols-outlined notranslate text-[24px]">info</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider">LENGKAPI DOKUMEN PROPOSAL</h4>
                                <p className="text-sm font-medium text-white/90 leading-relaxed max-w-4xl">Akses fitur Logbook dan Sertifikat hanya dapat dilakukan setelah proposal Anda diverifikasi. Segera unggah berkas Anda.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Documents;

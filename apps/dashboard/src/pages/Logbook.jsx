import { useState } from 'react';
import Sidebar from '../components/mahasiswa/Sidebar';
import MobileHeader from '../components/mahasiswa/MobileHeader';
import LogbookTable from '../components/mahasiswa/logbook/LogbookTable';
import LogbookForm from '../components/mahasiswa/logbook/LogbookForm';
import LogbookModal from '../components/mahasiswa/logbook/LogbookModal';
import LogbookPreview from '../components/mahasiswa/logbook/LogbookPreview';
import KurikulumMagangForm from '../components/mahasiswa/logbook/KurikulumMagangForm';
import KurikulumMagangTable from '../components/mahasiswa/logbook/KurikulumMagangTable';

const Logbook = () => {
    const [entries, setEntries] = useState([
        {
            id: 1,
            tanggal: '12 Februari 2026',
            rawTanggal: '2026-02-12',
            type: 'Laporan Harian',
            kegiatan: 'Mengembangkan fitur login...',
            deskripsi: 'Mengembangkan fitur login menggunakan React.js dan Tailwind CSS.',
            jenisKegiatan: 'Pelaksanaan Magang',
            pembelajaran: 'Dari tugas hari ini saya memahami alur data dari frontend React.js ke backend API, serta bagaimana menyimpan state otentikasi menggunakan JWT.',
            jamMulai: '08:00',
            jamSelesai: '16:00',
            lokasiId: 'kantor_brida',
            lokasiNama: 'Kantor BRIGHT',
            lokasiLat: -7.2576937,
            lokasiLng: 112.7474810,
            file: null,
            status: 'pending'
        },
        {
            id: 2,
            tanggal: '11 Februari 2026',
            rawTanggal: '2026-02-11',
            type: 'Laporan Harian',
            kegiatan: 'Rapat koordinasi tim...',
            deskripsi: 'Rapat koordinasi dengan tim riset mengenai metodologi penelitian.',
            jenisKegiatan: 'Sinkronisasi',
            pembelajaran: 'Saya belajar bagaimana menyelaraskan metode riset yang digunakan oleh berbagai universitas agar menjadi satu standar yang sama.',
            jamMulai: '09:00',
            jamSelesai: '17:00',
            file: null,
            status: 'approved'
        },
        {
            id: 3,
            tanggal: '10 Februari 2026',
            rawTanggal: '2026-02-10',
            type: 'Laporan Harian',
            kegiatan: 'Analisis data survei...',
            deskripsi: 'Melakukan analisis data survei lapangan.',
            jenisKegiatan: 'Pelaksanaan Magang',
            pembelajaran: 'Mempelajari cara menggunakan software SPSS untuk membersihkan data hasil survei sebelum lanjut ke tahap regresi.',
            jamMulai: '08:30',
            jamSelesai: '16:30',
            file: null,
            status: 'rejected'
        }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [entryType, setEntryType] = useState('Laporan Harian');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState(null);
    const [activeLogbookTab, setActiveLogbookTab] = useState('logbook');

    // Kurikulum Magang State
    const [kurikulumEntries, setKurikulumEntries] = useState([
        { id: 1, materi: 'Pengolahan data statistik menggunakan SPSS', tanggalInput: '12 Februari 2026' },
        { id: 2, materi: 'Teknik penulisan laporan ilmiah sesuai standar BRIGHT', tanggalInput: '11 Februari 2026' },
    ]);

    const handleOpenModal = (type) => {
        setEntryType(type);
        setEditingEntry(null);
        setIsModalOpen(true);
    };

    const handleFormSubmit = (formData, uploadedFile) => {
        if (editingEntry) {
            // Update existing entry
            setEntries(prev => prev.map(entry => {
                if (entry.id === editingEntry.id) {
                    return {
                        ...entry,
                        tanggal: new Date(formData.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                        rawTanggal: formData.tanggal,
                        kegiatan: formData.uraian.substring(0, 50) + (formData.uraian.length > 50 ? '...' : ''),
                        pembelajaran: formData.pembelajaran,
                        jenisKegiatan: formData.jenisKegiatan,
                        kategori: formData.kategori || editingEntry.kategori, // Save category
                        jamMulai: formData.jamMulai,
                        jamSelesai: formData.jamSelesai,
                        lokasiId: formData.lokasiId,
                        lokasiNama: formData.lokasiNama,
                        lokasiLat: formData.lokasiLat,
                        lokasiLng: formData.lokasiLng,
                        file: uploadedFile
                    };
                }
                return entry;
            }));
        } else {
            // Create new entry
            const newEntry = {
                id: entries.length + 1,
                tanggal: new Date(formData.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                rawTanggal: formData.tanggal,
                type: entryType,
                kegiatan: formData.uraian.substring(0, 50) + (formData.uraian.length > 50 ? '...' : ''),
                pembelajaran: formData.pembelajaran,
                jenisKegiatan: formData.jenisKegiatan,
                kategori: formData.kategori, // Save category
                jamMulai: formData.jamMulai,
                jamSelesai: formData.jamSelesai,
                lokasiId: formData.lokasiId,
                lokasiNama: formData.lokasiNama,
                lokasiLat: formData.lokasiLat,
                lokasiLng: formData.lokasiLng,
                file: uploadedFile,
                status: 'pending'
            };
            setEntries(prev => [newEntry, ...prev]);
        }
        closeModal();
    };


    const handleDelete = (id) => {
        setEntryToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (entryToDelete) {
            setEntries(prev => prev.filter(entry => entry.id !== entryToDelete));
            setIsDeleteModalOpen(false);
            setEntryToDelete(null);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setEntryToDelete(null);
    };

    const handleEdit = (entry) => {
        setEditingEntry(entry);
        setEntryType(entry.type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEntry(null);
        setEntryType('Laporan Harian');
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-amber-50 text-amber-700 border-amber-200',
            approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            rejected: 'bg-blue-50 text-blue-700 border-blue-200',
        };
        const labels = {
            pending: 'Menunggu Review',
            approved: 'Disetujui',
            rejected: 'Ditolak',
        };
        const currentStatus = status || 'pending';
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${styles[currentStatus]}`}>
                {labels[currentStatus]}
            </span>
        );
    };

    return (
        <div className="flex h-screen w-full bg-[#fafafa] text-[#1b0d0d] font-display overflow-hidden">
            <Sidebar />

            <div className="flex h-full flex-1 flex-col overflow-hidden">
                <MobileHeader title="Logbook" />

                <main className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-8">
                    <div className="w-full max-w-6xl mx-auto space-y-8">
                        {/* Page Header */}
                        <div className="border-b border-[#f3e7e7] pb-6">
                            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#1b0d0d]">Logbook</h2>
                            <p className="text-[#9a4c4c] text-sm font-medium mt-1">Catat dan kelola kegiatan magang harian Anda di sini.</p>
                        </div>

                        {/* Cards Section */}
                        <div className="flex flex-col gap-6">
                            {/* Card 1 - Laporan Harian */}
                            <div
                                onClick={() => handleOpenModal('Laporan Harian')}
                                className="bg-white p-6 rounded-xl border border-[#f3e7e7] shadow-sm flex items-center gap-6 hover:border-primary/30 transition-colors cursor-pointer group"
                            >
                                <div className="size-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined notranslate text-primary group-hover:text-white text-2xl font-variation-fill">assignment</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-lg font-medium text-[#1b0d0d]">Laporan Harian</p>
                                    <p className="text-xs text-slate-500 mt-1">Klik untuk mengisi laporan harian</p>
                                </div>
                                <span className="material-symbols-outlined notranslate text-gray-300 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                            </div>

                            {/* Card 2 - Jurnal */}
                            <div
                                onClick={() => handleOpenModal('Jurnal')}
                                className="bg-white p-6 rounded-xl border border-[#f3e7e7] shadow-sm flex items-center gap-6 hover:border-primary/30 transition-colors cursor-pointer group"
                            >
                                <div className="size-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined notranslate text-primary group-hover:text-white text-2xl font-variation-fill">verified</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-lg font-medium text-[#1b0d0d]">Jurnal</p>
                                    <p className="text-xs text-slate-500 mt-1">Klik untuk mencatat jurnal</p>
                                </div>
                                <span className="material-symbols-outlined notranslate text-gray-300 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                            </div>

                            {/* Card 3 - Draft Jurnal */}
                            <div
                                onClick={() => handleOpenModal('Draft Jurnal')}
                                className="bg-white p-6 rounded-xl border border-[#f3e7e7] shadow-sm flex items-center gap-6 hover:border-primary/30 transition-colors cursor-pointer group"
                            >
                                <div className="size-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined notranslate text-primary group-hover:text-white text-2xl font-variation-fill">pending_actions</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-lg font-medium text-[#1b0d0d]">Draft Jurnal</p>
                                    <p className="text-xs text-slate-500 mt-1">Klik untuk mencatat draft jurnal</p>
                                </div>
                                <span className="material-symbols-outlined notranslate text-gray-300 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                            </div>
                        </div>

                        {/* Tab Switcher */}
                        <div className="border-b border-[#f3e7e7]">
                            <nav className="-mb-px flex space-x-8">
                                <button
                                    onClick={() => setActiveLogbookTab('logbook')}
                                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeLogbookTab === 'logbook'
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined notranslate text-[18px]">history</span>
                                        Riwayat Logbook
                                    </span>
                                </button>
                                <button
                                    onClick={() => setActiveLogbookTab('kurikulum')}
                                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeLogbookTab === 'kurikulum'
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined notranslate text-[18px]">menu_book</span>
                                        Kurikulum Magang
                                    </span>
                                </button>
                            </nav>
                        </div>

                        {/* Conditional Content */}
                        {activeLogbookTab === 'logbook' ? (
                            <LogbookTable
                                entries={entries}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onPreview={() => setIsPreviewOpen(true)}
                            />
                        ) : (
                            <div className="space-y-6">
                                <KurikulumMagangForm
                                    onSubmit={(materiList) => {
                                        const newEntries = materiList.map((materi, i) => ({
                                            id: Date.now() + i,
                                            materi,
                                            tanggalInput: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                                        }));
                                        setKurikulumEntries(prev => [...newEntries, ...prev]);
                                    }}
                                />
                                <KurikulumMagangTable
                                    entries={kurikulumEntries}
                                    onDelete={(id) => setKurikulumEntries(prev => prev.filter(e => e.id !== id))}
                                />
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Modal using Component */}
            <LogbookModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingEntry ? `Edit ${entryType}` : `Form ${entryType}`}
            >
                <LogbookForm
                    entryType={entryType}
                    initialData={editingEntry}
                    onSubmit={handleFormSubmit}
                    onCancel={closeModal}
                />
            </LogbookModal>

            <LogbookPreview
                isOpen={isPreviewOpen}
                entries={entries}
                onClose={() => setIsPreviewOpen(false)}
            />

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined notranslate text-blue-600 text-3xl">delete_forever</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Hapus Logbook</h3>
                            <p className="text-slate-500 mb-6">
                                Apakah Anda yakin ingin menghapus entri logbook ini? Data yang sudah dihapus tidak dapat dikembalikan.
                            </p>
                            <div className="flex w-full gap-3">
                                <button
                                    onClick={cancelDelete}
                                    className="flex-1 py-2.5 px-4 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 py-2.5 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-200/50"
                                >
                                    Ya, Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Inject custom styles for this page specifically for the filled icons if needed */}
            <style>{`
                .font-variation-fill {
                    font-variation-settings: 'FILL' 1;
                }
            `}</style>
        </div>
    );
};

export default Logbook;

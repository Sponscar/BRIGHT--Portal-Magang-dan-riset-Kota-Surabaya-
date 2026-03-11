import React, { useState } from 'react';

const KurikulumMagangTable = ({ entries, onDelete }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDeleteClick = (entry) => {
        setItemToDelete(entry);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            onDelete(itemToDelete.id);
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
    };

    return (
        <section className="space-y-4">
            <h3 className="text-xl font-semibold text-[#1b0d0d]">Riwayat Kurikulum Magang</h3>
            <div className="bg-white rounded-xl border border-[#f3e7e7] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-[#f3e7e7]">
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary w-16">No</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary">Materi</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary w-48">Tanggal Input</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary text-center w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f3e7e7]">
                            {entries.map((entry, index) => (
                                <tr key={entry.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-[#1b0d0d]">{entry.materi}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{entry.tanggalInput}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => handleDeleteClick(entry)}
                                                className="p-1.5 text-primary hover:text-blue-700 transition-colors"
                                                title="Hapus"
                                            >
                                                <span className="material-symbols-outlined notranslate text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {entries.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-12 text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="material-symbols-outlined notranslate text-4xl text-gray-300">menu_book</span>
                                            <p>Belum ada data kurikulum magang.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined notranslate text-blue-600 text-3xl">delete_forever</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Hapus Materi</h3>
                            <p className="text-gray-500 mb-6">
                                Apakah Anda yakin ingin menghapus materi <span className="font-semibold text-gray-700">"{itemToDelete?.materi}"</span>? Tindakan ini tidak dapat dibatalkan.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={cancelDelete}
                                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                >
                                    Ya, Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default KurikulumMagangTable;

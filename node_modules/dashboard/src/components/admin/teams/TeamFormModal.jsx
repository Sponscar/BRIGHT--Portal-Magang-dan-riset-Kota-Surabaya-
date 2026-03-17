import { useState } from 'react';
import ModalPortal from '../ModalPortal';

const TeamFormModal = ({ isOpen, currentTeam, formData, setFormData, onClose, onSave }) => {
    const [isClosing, setIsClosing] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    };

    return (
        <ModalPortal>
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 ${isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter'}`}>
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-bold text-slate-900">
                        {currentTeam ? 'Edit Tim' : 'Tambah Tim Baru'}
                    </h3>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>
                <form onSubmit={onSave} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-1">Nama Tim</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="Contoh: Kesekretariatan"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-1">Slug URL</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-mono text-sm"
                                    placeholder="Contoh: secretariat"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-1">Icon (Material Symbols)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-mono text-sm"
                                        placeholder="Contoh: folder_shared"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    />
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 border border-slate-200">
                                        <span className="material-symbols-outlined notranslate text-primary">{formData.icon || 'help'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-1">Deskripsi Singkat</label>
                                <textarea
                                    required
                                    rows="2"
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                                    placeholder="Ringkasan tugas tim..."
                                    value={formData.short_description}
                                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-1">Deskripsi Lengkap</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                                    placeholder="Penjelasan detail tentang tim..."
                                    value={formData.full_description}
                                    onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-1">Tugas & Tanggung Jawab (Satu per baris)</label>
                            <textarea
                                rows="4"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-mono text-sm"
                                placeholder={"- Mengelola dokumen\n- Membuat laporan"}
                                value={formData.responsibilities}
                                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-1">Kualifikasi / Persyaratan (Satu per baris)</label>
                            <textarea
                                rows="4"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-mono text-sm"
                                placeholder={"- Teliti\n- Bisa Excel"}
                                value={formData.requirements}
                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 transition-all duration-300 hover:bg-slate-50 hover:text-slate-800 hover:-translate-y-0.5 active:scale-95"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold transition-all duration-300 hover:bg-blue-600 shadow-[0_4px_10px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_15px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 active:scale-95"
                        >
                            Simpan Data
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </ModalPortal>
    );
};

export default TeamFormModal;

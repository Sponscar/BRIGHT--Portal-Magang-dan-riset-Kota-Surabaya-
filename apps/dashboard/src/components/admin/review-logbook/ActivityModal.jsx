import { useState } from 'react';
import ModalPortal from '../ModalPortal';

const ActivityModal = ({ isOpen, editingActivityId, currentActivity, setCurrentActivity, onClose, onSave }) => {
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
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900">
                        {editingActivityId ? 'Edit Aktivitas' : 'Tambah Aktivitas'}
                    </h3>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>

                <form onSubmit={onSave}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-1">Nama Aktivitas</label>
                            <input
                                type="text"
                                required
                                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="Contoh: Apel Pagi"
                                value={currentActivity.name}
                                onChange={(e) => setCurrentActivity(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-1">Deskripsi</label>
                            <textarea
                                rows="3"
                                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                placeholder="Jelaskan secara singkat..."
                                value={currentActivity.description}
                                onChange={(e) => setCurrentActivity(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-[0_4px_10px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_15px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 active:scale-95"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </ModalPortal>
    );
};

export default ActivityModal;

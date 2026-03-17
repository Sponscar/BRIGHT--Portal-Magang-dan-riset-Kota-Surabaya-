import { useState } from 'react';
import ModalPortal from '../ModalPortal';

const DeleteActivityModal = ({ isOpen, activityToDelete, onClose, onConfirm }) => {
    const [isClosing, setIsClosing] = useState(false);

    if (!isOpen || !activityToDelete) return null;

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
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>
                <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined notranslate text-3xl text-blue-600">warning</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Hapus Kegiatan?</h3>
                    <p className="text-sm text-slate-500 mb-6">
                        Apakah Anda yakin ingin menghapus kegiatan <strong>"{activityToDelete.name}"</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </ModalPortal>
    );
};

export default DeleteActivityModal;

import { useState } from 'react';
import ModalPortal from '../ModalPortal';

const LogbookActionModal = ({ isOpen, selectedEntry, actionType, feedback, setFeedback, onClose, onSubmit }) => {
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
                        {actionType === 'approve' ? 'Setujui Logbook' : 'Tolak Logbook'}
                    </h3>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <p className="text-sm text-slate-600">
                        Anda akan {actionType === 'approve' ? 'menyetujui' : 'menolak'} logbook dari <strong>{selectedEntry?.studentName}</strong> pada tanggal <strong>{selectedEntry?.date}</strong>.
                    </p>

                    {actionType === 'reject' && (
                        <textarea
                            className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                            rows="3"
                            placeholder="Alasan penolakan (opsional)..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onSubmit}
                        className={`px-4 py-2 rounded-lg text-sm font-medium text-white shadow-lg ${actionType === 'approve'
                            ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                            }`}
                    >
                        Konfirmasi
                    </button>
                </div>
            </div>
        </div>
        </ModalPortal>
    );
};

export default LogbookActionModal;

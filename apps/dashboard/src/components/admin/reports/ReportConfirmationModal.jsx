import { useState } from 'react';
import ModalPortal from '../ModalPortal';

const ReportConfirmationModal = ({ isOpen, type, reportName, reason, onReasonChange, onClose, onConfirm }) => {
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
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>
                <div className="p-6 text-center">
                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-4 ${type === 'approve' ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                        <span className={`material-symbols-outlined text-3xl ${type === 'approve' ? 'text-emerald-600' : 'text-blue-600'}`}>
                            {type === 'approve' ? 'check_circle' : 'cancel'}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                        {type === 'approve' ? 'Setujui Laporan?' : 'Tolak Laporan?'}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2">
                        Anda akan {type === 'approve' ? 'menyetujui' : 'menolak'} laporan milik <strong>{reportName}</strong>. Tindakan ini tidak dapat dibatalkan.
                    </p>

                    {type === 'reject' && (
                        <div className="mt-4 text-left">
                            <label className="block text-xs font-bold text-slate-700 mb-1">Alasan Penolakan <span className="text-blue-500">*</span></label>
                            <textarea
                                value={reason}
                                onChange={(e) => onReasonChange(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none resize-none"
                                rows="3"
                                placeholder="Tuliskan alasan penolakan laporan ini..."
                                autoFocus
                            ></textarea>
                        </div>
                    )}
                </div>
                <div className="p-6 border-t border-slate-100 flex gap-3 bg-slate-50/50">
                    <button
                        onClick={handleClose}
                        className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={type === 'reject' && !reason.trim()}
                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors shadow-lg ${type === 'approve'
                            ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed'
                            }`}
                    >
                        Ya, {type === 'approve' ? 'Setujui' : 'Tolak'}
                    </button>
                </div>
            </div>
        </div>
        </ModalPortal>
    );
};

export default ReportConfirmationModal;

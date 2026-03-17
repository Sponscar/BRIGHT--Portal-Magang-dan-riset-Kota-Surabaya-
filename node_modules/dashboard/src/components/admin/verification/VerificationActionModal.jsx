import { useState } from 'react';
import ModalPortal from '../ModalPortal';

const VerificationActionModal = ({ isOpen, selectedStudent, actionType, feedback, setFeedback, getTeamSummary, onClose, onSubmit }) => {
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
                        {actionType === 'approve' && 'Konfirmasi Persetujuan'}
                        {actionType === 'reject' && 'Tolak Pendaftaran'}
                        {actionType === 'revision' && 'Minta Revisi Dokumen'}
                    </h3>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <p className="text-sm text-slate-600">
                        Anda akan memproses <strong>{selectedStudent?.name}</strong> dari <strong>{selectedStudent?.university}</strong>.
                    </p>

                    {actionType === 'approve' && (
                        <div className="space-y-2">
                            <p className="text-sm text-slate-700">
                                Mahasiswa ini akan ditempatkan di tim: <br />
                                <span className="font-bold text-primary">{getTeamSummary(selectedStudent.id)}</span>
                            </p>
                            <p className="text-xs text-slate-500">Pastikan pilihan tim sudah benar sebelum melanjutkan.</p>
                        </div>
                    )}

                    {(actionType === 'revision' || actionType === 'reject') && (
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-800">
                                {actionType === 'revision' ? 'Catatan Revisi' : 'Alasan Penolakan'}
                            </label>
                            <textarea
                                className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                rows="3"
                                placeholder={actionType === 'revision' ? "Contoh: Proposal kurang detail pada bagian metode..." : "Contoh: Kuota magang sudah penuh..."}
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            ></textarea>
                        </div>
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
                        className={`px-4 py-2 rounded-lg text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all ${actionType === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' :
                            actionType === 'reject' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' :
                                'bg-amber-600 hover:bg-amber-700 shadow-amber-200'
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

export default VerificationActionModal;

import { useState } from 'react';
import ModalPortal from '../ModalPortal';

const getStatusBadge = (status) => {
    const styles = {
        pending: 'bg-amber-50 text-amber-700 border-amber-200',
        approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        rejected: 'bg-blue-50 text-blue-700 border-blue-200',
    };
    const labels = {
        pending: 'Menunggu',
        approved: 'Diterima',
        rejected: 'Ditolak',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

const ApplicantDetailModal = ({ applicant, onClose, onNavigate }) => {
    const [isClosing, setIsClosing] = useState(false);

    if (!applicant) return null;

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
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-900">Detail Pendaftar</h3>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    {/* Profile Header */}
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl border border-primary/20">
                            {applicant.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-900">{applicant.name}</h4>
                            <p className="text-sm text-slate-500">{applicant.university}</p>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Prodi</p>
                            <p className="text-sm font-medium text-slate-900">{applicant.major}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tim</p>
                            <p className="text-sm font-medium text-slate-900">{applicant.team || '-'}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tanggal Daftar</p>
                            <p className="text-sm font-medium text-slate-900">{applicant.date}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                            <div className="mt-0.5">{getStatusBadge(applicant.status)}</div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kontak</h5>
                        <div className="flex items-center gap-3 text-sm text-slate-700">
                            <span className="material-symbols-outlined notranslate text-slate-400 text-[18px]">mail</span>
                            {applicant.email || '-'}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-700">
                            <span className="material-symbols-outlined notranslate text-slate-400 text-[18px]">phone</span>
                            {applicant.phone || '-'}
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                    <button
                        onClick={handleClose}
                        className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                    >
                        Tutup
                    </button>
                    <button
                        onClick={onNavigate}
                        className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                    >
                        Kelola di Verifikasi
                    </button>
                </div>
            </div>
        </div>
        </ModalPortal>
    );
};

export default ApplicantDetailModal;

import { useState } from 'react';
import ModalPortal from '../ModalPortal';

const getExpectedResultLabel = (value) => {
    const map = {
        laporan_akhir: 'Laporan Akhir',
        jurnal: 'Jurnal',
        draft_jurnal: 'Draft Jurnal',
        seminar_kampus: 'Seminar di Kampus (Tes)'
    };
    return map[value] || value;
};

const AdminDetailModal = ({ isOpen, adminDetail, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    if (!isOpen || !adminDetail) return null;

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
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                            {adminDetail.studentName.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Detail Administrasi Magang</h3>
                            <p className="text-xs text-slate-500">{adminDetail.studentName} — {adminDetail.university}</p>
                        </div>
                    </div>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>

                <div className="p-6 space-y-5 overflow-y-auto flex-1">
                    {/* Surat Balasan */}
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Surat Balasan Resmi dari BRIDA</span>
                        <span className={`text-sm font-semibold w-fit px-3 py-1 rounded-full border ${adminDetail.needsReplyLetter === 'Iya' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                            {adminDetail.needsReplyLetter === 'Iya' ? '✓ Dibutuhkan' : '✗ Tidak Dibutuhkan'}
                        </span>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Deskripsi Proposal */}
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deskripsi Singkat Proposal</span>
                        <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100">
                            {adminDetail.proposalDescription}
                        </p>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Topik */}
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Topik yang Dibahas</span>
                        <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100">
                            {adminDetail.topic}
                        </p>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Hasil yang Diharapkan */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hasil yang Diharapkan</span>
                        <div className="flex flex-wrap gap-2">
                            {adminDetail.expectedResults.map(result => (
                                <span key={result} className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-bold rounded-lg border border-primary/15">
                                    {getExpectedResultLabel(result)}
                                </span>
                            ))}
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Mata Kuliah Konversi */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mata Kuliah yang Dikonversi</span>
                        {Array.isArray(adminDetail.courseConversion) ? (
                            adminDetail.courseConversion.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {adminDetail.courseConversion.map(course => (
                                        <span key={course} className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-bold rounded-lg border border-primary/15">
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 italic">Tidak ada mata kuliah yang dikonversi</p>
                            )
                        ) : (
                            <p className="text-sm text-slate-700 font-medium bg-slate-50 rounded-xl p-4 border border-slate-100">
                                {adminDetail.courseConversion}
                            </p>
                        )}
                    </div>

                    <hr className="border-slate-100" />

                    {/* Pernyataan */}
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pernyataan</span>
                        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${adminDetail.declaration ? 'bg-emerald-50 border-emerald-200' : 'bg-blue-50 border-blue-200'}`}>
                            <span className={`material-symbols-outlined notranslate text-[18px] ${adminDetail.declaration ? 'text-emerald-600' : 'text-blue-600'}`}>
                                {adminDetail.declaration ? 'check_circle' : 'cancel'}
                            </span>
                            <span className={`text-sm font-medium ${adminDetail.declaration ? 'text-emerald-700' : 'text-blue-700'}`}>
                                {adminDetail.declaration
                                    ? 'Menyatakan bahwa informasi yang diisi adalah benar dan dapat dipertanggungjawabkan.'
                                    : 'Belum menyetujui pernyataan.'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50/50 shrink-0">
                    <button
                        onClick={handleClose}
                        className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-[0_4px_10px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_15px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 active:scale-95"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
        </ModalPortal>
    );
};

export default AdminDetailModal;

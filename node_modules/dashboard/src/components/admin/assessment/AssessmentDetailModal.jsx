const AssessmentDetailModal = ({ assessment, criteria, onClose, getScoreColor, getScoreLabel, formatDate }) => {
    if (!assessment) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Detail Penilaian</h3>
                        <p className="text-sm text-slate-500 mt-0.5">{assessment.studentName} — {assessment.university}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    {/* Score Summary */}
                    <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="text-center">
                            <p className="text-xs text-slate-500 uppercase font-medium">Nilai Akhir</p>
                            <p className="text-3xl font-bold text-primary mt-1">{assessment.final_score}</p>
                            <span className={`text-xs font-semibold mt-1 px-2 py-0.5 rounded-full border inline-block ${getScoreColor(assessment.final_score)}`}>
                                {getScoreLabel(assessment.final_score)}
                            </span>
                        </div>
                        <div className="flex-1 border-l border-slate-200 pl-4 ml-2">
                            <p className="text-xs text-slate-500 uppercase font-medium mb-1">Feedback</p>
                            <p className="text-sm text-slate-700">{assessment.feedback || '-'}</p>
                            <p className="text-xs text-slate-400 mt-2">Dinilai oleh: {assessment.assessed_by} • {formatDate(assessment.created_at)}</p>
                        </div>
                    </div>

                    {/* Perilaku Kerja */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined notranslate text-blue-500 text-[18px]">psychology</span>
                            Perilaku Kerja
                        </h4>
                        <div className="space-y-2">
                            {assessment.scores.filter(s => criteria.find(c => c.id === s.kriteria_id)?.category === 'behavior').map(s => {
                                const crit = criteria.find(c => c.id === s.kriteria_id);
                                return (
                                    <div key={s.kriteria_id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-slate-100">
                                        <span className="text-sm text-slate-700">{crit?.name}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-slate-400 max-w-[200px] truncate">{s.keterangan}</span>
                                            <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full border ${getScoreColor(s.score)}`}>{s.score}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Kinerja */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined notranslate text-emerald-500 text-[18px]">trending_up</span>
                            Kinerja
                        </h4>
                        <div className="space-y-2">
                            {assessment.scores.filter(s => criteria.find(c => c.id === s.kriteria_id)?.category === 'performance').map(s => {
                                const crit = criteria.find(c => c.id === s.kriteria_id);
                                return (
                                    <div key={s.kriteria_id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-slate-100">
                                        <span className="text-sm text-slate-700">{crit?.name}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-slate-400 max-w-[200px] truncate">{s.keterangan}</span>
                                            <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full border ${getScoreColor(s.score)}`}>{s.score}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-slate-100 flex justify-end bg-slate-50/50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssessmentDetailModal;

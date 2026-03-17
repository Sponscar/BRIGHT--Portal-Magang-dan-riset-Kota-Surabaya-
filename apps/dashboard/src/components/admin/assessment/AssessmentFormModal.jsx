import { useState } from 'react';
import ModalPortal from '../ModalPortal';

const AssessmentFormModal = ({
    isOpen, onClose,
    assessmentForm, setAssessmentForm,
    criteria, studentList, assessments,
    handleScoreChange, calculateFinalScore,
    handleSaveAssessment, getScoreColor, getScoreLabel
}) => {
    const [isClosing, setIsClosing] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    };

    const behaviorCriteria = criteria.filter(c => c.category === 'behavior');
    const performanceCriteria = criteria.filter(c => c.category === 'performance');

    const getBehaviorAvg = () => {
        const behaviorScores = assessmentForm.scores.filter(s => {
            const crit = criteria.find(c => c.id === s.kriteria_id);
            return crit?.category === 'behavior' && s.score !== '' && s.score > 0;
        });
        if (behaviorScores.length === 0) return 0;
        return (behaviorScores.reduce((sum, s) => sum + Number(s.score), 0) / behaviorScores.length).toFixed(1);
    };

    const getPerformanceAvg = () => {
        const perfScores = assessmentForm.scores.filter(s => {
            const crit = criteria.find(c => c.id === s.kriteria_id);
            return crit?.category === 'performance' && s.score !== '' && s.score > 0;
        });
        if (perfScores.length === 0) return 0;
        return (perfScores.reduce((sum, s) => sum + Number(s.score), 0) / perfScores.length).toFixed(1);
    };

    const getGradeInfo = (score) => {
        const s = parseFloat(score);
        if (s >= 86) return { grade: 'A', label: 'Sangat Baik', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
        if (s >= 71) return { grade: 'B', label: 'Baik', color: 'text-blue-600 bg-blue-50 border-blue-200' };
        if (s >= 51) return { grade: 'C', label: 'Cukup Baik', color: 'text-amber-600 bg-amber-50 border-amber-200' };
        return { grade: 'D', label: 'Perlu Perbaikan', color: 'text-blue-600 bg-blue-50 border-blue-200' };
    };

    const renderCriteriaSection = (title, icon, iconColor, criteriaList) => (
        <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className={`material-symbols-outlined notranslate ${iconColor} text-[18px]`}>{icon}</span>
                {title}
            </h4>
            <div className="space-y-3">
                {criteriaList.map(crit => {
                    const scoreObj = assessmentForm.scores.find(s => s.kriteria_id === crit.id);
                    return (
                        <div key={crit.id} className="grid grid-cols-12 gap-3 items-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <div className="col-span-5">
                                <span className="text-sm font-medium text-slate-700">{crit.name}</span>
                            </div>
                            <div className="col-span-2">
                                <input
                                    type="number" min="1" max="100" required placeholder="0-100"
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    value={scoreObj?.score ?? ''}
                                    onChange={(e) => handleScoreChange(crit.id, 'score', e.target.value)}
                                />
                            </div>
                            <div className="col-span-5">
                                <input
                                    type="text" placeholder="Keterangan..."
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    value={scoreObj?.keterangan ?? ''}
                                    onChange={(e) => handleScoreChange(crit.id, 'keterangan', e.target.value)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const finalScore = calculateFinalScore();
    const gradeInfo = getGradeInfo(finalScore);

    return (
        <ModalPortal>
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 ${isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter'}`}>
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-bold text-slate-900">Beri Penilaian</h3>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>
                <form onSubmit={handleSaveAssessment} className="p-6 space-y-6">
                    {/* Pilih Mahasiswa */}
                    <div>
                        <label className="block text-sm font-bold text-slate-900 mb-1">Pilih Mahasiswa</label>
                        <select
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                            value={assessmentForm.mahasiswa_id}
                            onChange={(e) => setAssessmentForm({ ...assessmentForm, mahasiswa_id: e.target.value })}
                        >
                            <option value="">-- Pilih Mahasiswa --</option>
                            {studentList.filter(s => !assessments.some(a => a.mahasiswa_id === s.id)).map(s => (
                                <option key={s.id} value={s.id}>{s.name} — {s.university}</option>
                            ))}
                        </select>
                    </div>

                    {/* Perilaku Kerja */}
                    {renderCriteriaSection(
                        'A. Perilaku Kerja (Behavior) — Bobot 40%',
                        'psychology', 'text-blue-500',
                        behaviorCriteria
                    )}

                    {/* Rata-rata Perilaku */}
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                        <span className="text-sm font-bold text-blue-700">Rata-rata Perilaku:</span>
                        <span className="text-lg font-bold text-blue-600">{getBehaviorAvg()}</span>
                    </div>

                    {/* Kinerja */}
                    {renderCriteriaSection(
                        'B. Kinerja (Performance) — Bobot 60%',
                        'trending_up', 'text-emerald-500',
                        performanceCriteria
                    )}

                    {/* Rata-rata Kinerja */}
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                        <span className="text-sm font-bold text-emerald-700">Rata-rata Kinerja:</span>
                        <span className="text-lg font-bold text-emerald-600">{getPerformanceAvg()}</span>
                    </div>

                    {/* Feedback & Final Score */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-900 mb-1">Feedback Umum</label>
                            <textarea
                                rows="3"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                                placeholder="Catatan umum untuk mahasiswa..."
                                value={assessmentForm.feedback}
                                onChange={(e) => setAssessmentForm({ ...assessmentForm, feedback: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-slate-200 p-4">
                            <span className="text-xs font-medium text-slate-500 uppercase mb-1">Nilai Akhir</span>
                            <span className="text-3xl font-bold text-primary">{finalScore}</span>
                            <span className={`text-xs font-semibold mt-1 px-2 py-0.5 rounded-full border ${gradeInfo.color}`}>
                                {gradeInfo.grade} — {gradeInfo.label}
                            </span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-4">
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
                            Simpan Penilaian
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </ModalPortal>
    );
};

export default AssessmentFormModal;

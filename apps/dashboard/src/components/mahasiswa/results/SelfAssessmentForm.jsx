import { useState } from 'react';

const SelfAssessmentForm = ({ criteria, hasSelfAssessment, existingScores, onSubmit }) => {
    const [scores, setScores] = useState(
        existingScores || criteria.map(c => ({ kriteriaId: c.id, kriteriaName: c.name, score: '', keterangan: '' }))
    );
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isExpanded, setIsExpanded] = useState(!hasSelfAssessment);

    const handleScoreChange = (kriteriaId, field, value) => {
        setScores(prev =>
            prev.map(s =>
                s.kriteriaId === kriteriaId
                    ? { ...s, [field]: field === 'score' ? Math.min(100, Math.max(0, Number(value) || '')) : value }
                    : s
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasEmpty = scores.some(s => s.score === '' || s.score === 0);
        if (hasEmpty) { alert('Harap isi semua nilai kriteria.'); return; }
        setIsSubmitting(true);
        try {
            await onSubmit({ scores: scores.map(s => ({ ...s, score: Number(s.score) })), feedback });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getAvgScore = () => {
        const valid = scores.filter(s => s.score !== '' && s.score > 0);
        if (valid.length === 0) return 0;
        return (valid.reduce((sum, s) => sum + Number(s.score), 0) / valid.length).toFixed(1);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined notranslate text-blue-500 text-[22px]">person</span>
                    <div className="text-left">
                        <h3 className="text-base font-bold text-gray-800">Penilaian Diri Sendiri</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Nilai perilaku kerja Anda selama magang</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {hasSelfAssessment && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-200">
                            <span className="material-symbols-outlined notranslate text-[14px]">check_circle</span>
                            Sudah Dinilai
                        </span>
                    )}
                    <span className={`material-symbols-outlined notranslate text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        expand_more
                    </span>
                </div>
            </button>

            {/* Form Content */}
            {isExpanded && (
                <form onSubmit={handleSubmit} className="px-6 pb-6 border-t border-gray-100">
                    <div className="space-y-3 mt-4">
                        {scores.map(s => (
                            <div key={s.kriteriaId} className="grid grid-cols-12 gap-3 items-center bg-gray-50 rounded-xl p-3 border border-gray-100">
                                <div className="col-span-5 sm:col-span-5">
                                    <span className="text-sm font-medium text-gray-700">{s.kriteriaName || s.name}</span>
                                </div>
                                <div className="col-span-3 sm:col-span-2">
                                    <input
                                        type="number" min="1" max="100" placeholder="0-100"
                                        disabled={hasSelfAssessment}
                                        className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none disabled:bg-gray-100 disabled:text-gray-500"
                                        value={s.score}
                                        onChange={(e) => handleScoreChange(s.kriteriaId, 'score', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-4 sm:col-span-5">
                                    <input
                                        type="text" placeholder="Keterangan..."
                                        disabled={hasSelfAssessment}
                                        className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none disabled:bg-gray-100 disabled:text-gray-500"
                                        value={s.keterangan}
                                        onChange={(e) => handleScoreChange(s.kriteriaId, 'keterangan', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Feedback + Average */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="md:col-span-2">
                            <textarea
                                rows="2" placeholder="Catatan / refleksi diri (opsional)..."
                                disabled={hasSelfAssessment}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none resize-none disabled:bg-gray-100"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center bg-blue-50 rounded-xl border border-blue-200 p-3">
                            <span className="text-xs font-medium text-blue-500 uppercase">Rata-rata</span>
                            <span className="text-2xl font-bold text-blue-600">{getAvgScore()}</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    {!hasSelfAssessment && (
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit" disabled={isSubmitting}
                                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined notranslate text-[18px]">save</span>
                                {isSubmitting ? 'Menyimpan...' : 'Simpan Penilaian'}
                            </button>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
};

export default SelfAssessmentForm;

const AssessmentTable = ({ assessments, onViewDetail, formatDate, getScoreColor, getScoreLabel }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="font-bold text-slate-900">Daftar Penilaian Mahasiswa</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Mahasiswa</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Tim</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Nilai Akhir</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Predikat</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {assessments.length > 0 ? assessments.map((assessment) => (
                            <tr key={assessment.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-sm border border-primary/10">
                                            {assessment.studentName.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900">{assessment.studentName}</span>
                                            <span className="text-xs text-slate-500">{assessment.university}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm text-slate-700">{assessment.team}</span>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <span className="text-lg font-bold text-slate-900">{assessment.final_score}</span>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getScoreColor(assessment.final_score)}`}>
                                        {getScoreLabel(assessment.final_score)}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm text-slate-600">{formatDate(assessment.created_at)}</span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => onViewDetail(assessment)}
                                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                        title="Lihat Detail"
                                    >
                                        <span className="material-symbols-outlined notranslate text-[20px]">visibility</span>
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" className="px-6 py-8 text-center text-slate-500">Belum ada data penilaian.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssessmentTable;

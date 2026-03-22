const AssessmentTable = ({ assessments, onViewDetail, formatDate, getScoreColor, getScoreLabel }) => {

    const StatusBadge = ({ label, done }) => (
        <span
            className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold border transition-all ${
                done
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
            title={`${label}: ${done ? 'Sudah menilai' : 'Belum menilai'}`}
        >
            {label}
        </span>
    );

    const KinerjaStatusBadge = ({ assessment }) => {
        const adminDone = assessment.assessmentStatus?.admin_kinerja;
        const koordinatorDone = assessment.assessmentStatus?.koordinator_kinerja || assessment.assessmentStatus?.sekretaris_kinerja;
        const assessedBy = adminDone ? 'Admin' : koordinatorDone ? 'Koordinator' : null;

        return (
            <div className="flex items-center gap-1.5">
                {assessedBy ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                        <span className="material-symbols-outlined notranslate text-[12px]">check_circle</span>
                        {assessedBy}
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-400 border border-slate-200">
                        <span className="material-symbols-outlined notranslate text-[12px]">pending</span>
                        Belum
                    </span>
                )}
            </div>
        );
    };

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
                            <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Penilai Perilaku</th>
                            <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Penilai Kinerja</th>
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
                                {/* Status Penilai Perilaku */}
                                <td className="py-4 px-4 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <StatusBadge label="S" done={assessment.assessmentStatus?.self_perilaku} />
                                        <StatusBadge label="P" done={assessment.assessmentStatus?.peer_perilaku} />
                                        <StatusBadge label="K" done={assessment.assessmentStatus?.koordinator_perilaku || assessment.assessmentStatus?.sekretaris_perilaku} />
                                        <StatusBadge label="A" done={assessment.assessmentStatus?.admin_perilaku} />
                                    </div>
                                    <div className="text-[9px] text-slate-400 mt-1 flex justify-center gap-1">
                                        <span>Self</span>·<span>Peer</span>·<span>Koord</span>·<span>Admin</span>
                                    </div>
                                </td>
                                {/* Status Penilai Kinerja */}
                                <td className="py-4 px-4 text-center">
                                    <KinerjaStatusBadge assessment={assessment} />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {assessment.final_score != null ? (
                                        <span className="text-lg font-bold text-slate-900">{assessment.final_score}</span>
                                    ) : (
                                        <span className="text-xs text-slate-400 italic">Menunggu</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {assessment.final_score != null ? (
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getScoreColor(assessment.final_score)}`}>
                                            {getScoreLabel(assessment.final_score)}
                                        </span>
                                    ) : (
                                        <span className="text-xs text-slate-400">-</span>
                                    )}
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
                            <tr><td colSpan="8" className="px-6 py-8 text-center text-slate-500">Belum ada data penilaian.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssessmentTable;

import React from 'react';

const getGradeInfo = (score) => {
    if (score >= 86) return { grade: 'A', label: 'Sangat Baik', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    if (score >= 71) return { grade: 'B', label: 'Baik', color: 'text-blue-600 bg-blue-50 border-blue-200' };
    if (score >= 51) return { grade: 'C', label: 'Cukup Baik', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    return { grade: 'D', label: 'Perlu Perbaikan', color: 'text-blue-600 bg-blue-50 border-blue-200' };
};

const PerformanceAssessment = ({ behaviorData, performanceData, nilaiAkhir }) => {
    const renderTable = (title, data) => (
        <div className="mb-8 last:mb-0">
            <h3 className="text-lg font-bold text-gray-800 mb-4 pl-1">{title}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="py-3 px-2 text-sm font-bold text-gray-400 uppercase tracking-wider w-1/2">Aspek Penilaian</th>
                            <th className="py-3 px-2 text-sm font-bold text-gray-400 uppercase tracking-wider text-center w-1/4">Nilai</th>
                            <th className="py-3 px-2 text-sm font-bold text-gray-400 uppercase tracking-wider w-1/4">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-2">
                                    <p className="font-medium text-gray-800">{item.name}</p>
                                </td>
                                <td className="py-3 px-2 text-center">
                                    <span className={`font-medium ${item.nilai !== '-' ? 'text-gray-800' : 'text-gray-400'}`}>
                                        {item.nilai}
                                    </span>
                                </td>
                                <td className="py-3 px-2">
                                    <span className="text-sm font-medium text-gray-400">{item.keterangan}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const hasNilaiAkhir = nilaiAkhir && nilaiAkhir.nilaiAkhir != null;
    const gradeInfo = hasNilaiAkhir ? getGradeInfo(nilaiAkhir.nilaiAkhir) : null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="material-symbols-outlined notranslate text-primary">assessment</span>
                    PENILAIAN MAGANG
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${hasNilaiAkhir
                    ? `${gradeInfo.color} border`
                    : 'bg-gray-100 text-gray-600'
                    }`}>
                    {hasNilaiAkhir ? `Predikat: ${gradeInfo.grade} (${gradeInfo.label})` : 'Status: Menunggu Penilaian'}
                </span>
            </div>

            {renderTable('A. Perilaku Kerja (Work Behavior)', behaviorData)}
            {renderTable('B. Kinerja (Performance)', performanceData)}

            {/* Nilai Akhir Section */}
            {hasNilaiAkhir ? (
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-6 flex-wrap">
                        <div className="text-center">
                            <p className="text-xs font-medium text-gray-400 uppercase mb-1">Nilai Akhir</p>
                            <p className="text-4xl font-bold text-gray-900">{Number(nilaiAkhir.nilaiAkhir).toFixed(2)}</p>
                        </div>
                        <div className={`flex flex-col items-center px-6 py-3 rounded-xl border ${gradeInfo.color}`}>
                            <span className="text-3xl font-bold">{gradeInfo.grade}</span>
                            <span className="text-xs font-semibold mt-0.5">{gradeInfo.label}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-400 italic">Penilaian belum selesai. Nilai akhir akan tampil setelah semua penilai memberikan penilaian.</p>
                </div>
            )}
        </div>
    );
};

export default PerformanceAssessment;

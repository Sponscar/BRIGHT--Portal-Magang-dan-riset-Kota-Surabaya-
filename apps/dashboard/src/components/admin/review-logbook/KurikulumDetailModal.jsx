import React from 'react';

const KurikulumDetailModal = ({ isOpen, student, onClose }) => {
    if (!isOpen || !student) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-primary px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="material-symbols-outlined notranslate text-white text-xl">menu_book</span>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Kurikulum Magang</h3>
                            <p className="text-white/70 text-xs">{student.name} — {student.university}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>

                {/* Student Info */}
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-slate-500">Universitas / Prodi</span>
                            <p className="font-medium text-slate-900">{student.university} / {student.major}</p>
                        </div>
                        <div>
                            <span className="text-slate-500">Tim</span>
                            <p className="font-medium text-slate-900">{student.team || '-'}</p>
                        </div>
                    </div>
                </div>

                {/* Curriculum List */}
                <div className="p-6 max-h-[400px] overflow-y-auto">
                    <h4 className="text-sm font-semibold text-slate-700 mb-4">Materi yang Diperoleh / Diterapkan</h4>
                    {student.kurikulum && student.kurikulum.length > 0 ? (
                        <div className="space-y-3">
                            {student.kurikulum.map((item, index) => (
                                <div key={item.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-primary text-sm font-bold">{index + 1}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-slate-900 font-medium">{item.materi}</p>
                                        <p className="text-xs text-slate-500 mt-1">{item.tanggalInput}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-400">
                            <span className="material-symbols-outlined notranslate text-4xl mb-2">inbox</span>
                            <p>Belum ada data kurikulum magang.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 transition-colors"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KurikulumDetailModal;

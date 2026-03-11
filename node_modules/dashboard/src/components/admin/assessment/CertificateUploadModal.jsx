const CertificateUploadModal = ({
    isOpen, onClose,
    certForm, setCertForm,
    studentList, certificates,
    handleCertFileChange, handleSaveCert, formatFileSize
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-900">Terbitkan Sertifikat</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>
                <form onSubmit={handleSaveCert} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-900 mb-1">Pilih Mahasiswa</label>
                        <select
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                            value={certForm.mahasiswa_id}
                            onChange={(e) => setCertForm({ ...certForm, mahasiswa_id: e.target.value })}
                        >
                            <option value="">-- Pilih Mahasiswa --</option>
                            {studentList.filter(s => !certificates.some(c => c.mahasiswa_id === s.id)).map(s => (
                                <option key={s.id} value={s.id}>{s.name} — {s.university}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-900 mb-1">Nomor Sertifikat</label>
                        <input
                            type="text" required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-mono"
                            placeholder="BRIDA/CERT/2026/xxx"
                            value={certForm.nomor_sertifikat}
                            onChange={(e) => setCertForm({ ...certForm, nomor_sertifikat: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-900 mb-1">Tanggal Terbit</label>
                        <input
                            type="date" required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                            value={certForm.tanggal_terbit}
                            onChange={(e) => setCertForm({ ...certForm, tanggal_terbit: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-900 mb-1">Upload File Sertifikat <span className="text-blue-500">*</span></label>
                        {!certForm.file ? (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-primary hover:bg-blue-50/30 transition-all group">
                                <span className="material-symbols-outlined notranslate text-slate-400 group-hover:text-primary text-3xl mb-1">cloud_upload</span>
                                <span className="text-sm text-slate-500 group-hover:text-primary font-medium">Klik untuk upload file</span>
                                <span className="text-xs text-slate-400 mt-0.5">PDF, maksimal 5MB</span>
                                <input type="file" accept=".pdf" className="hidden" onChange={handleCertFileChange} />
                            </label>
                        ) : (
                            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 shrink-0">
                                    <span className="material-symbols-outlined notranslate text-[20px]">picture_as_pdf</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-900 truncate">{certForm.file.name}</p>
                                    <p className="text-xs text-slate-500">{formatFileSize(certForm.file.size)}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setCertForm(prev => ({ ...prev, file: null }))}
                                    className="p-1.5 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                                    title="Hapus file"
                                >
                                    <span className="material-symbols-outlined notranslate text-[18px]">close</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                        <button
                            type="button" onClick={onClose}
                            className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            Terbitkan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CertificateUploadModal;

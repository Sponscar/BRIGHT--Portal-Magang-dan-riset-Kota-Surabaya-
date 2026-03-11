const PermissionModal = ({ isOpen, permissionType, permissionDescription, permissionLink, onTypeChange, onDescriptionChange, onLinkChange, onClose, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900">Ajukan Izin</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-2">Jenis Izin</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="permissionType" value="izin" checked={permissionType === 'izin'} onChange={(e) => onTypeChange(e.target.value)} className="accent-primary w-4 h-4" />
                                    <span className="text-sm text-slate-700">Izin</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="permissionType" value="sakit" checked={permissionType === 'sakit'} onChange={(e) => onTypeChange(e.target.value)} className="accent-primary w-4 h-4" />
                                    <span className="text-sm text-slate-700">Sakit</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-1">Keterangan</label>
                            <textarea required placeholder="Jelaskan alasan izin/sakit..." className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-24 resize-none" value={permissionDescription} onChange={(e) => onDescriptionChange(e.target.value)}></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-1">Link Bukti</label>
                            <input type="url" required placeholder="https://..." className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" value={permissionLink} onChange={(e) => onLinkChange(e.target.value)} />
                            <p className="text-xs text-slate-500 mt-1">Masukkan link Google Drive atau bukti lainnya (Surat Dokter / Surat Izin).</p>
                        </div>
                    </div>
                    <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-[#d41111] transition-colors shadow-lg shadow-blue-200">Kirim Pengajuan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PermissionModal;

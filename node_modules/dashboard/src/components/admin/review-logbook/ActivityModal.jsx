const ActivityModal = ({ isOpen, editingActivityId, currentActivity, setCurrentActivity, onClose, onSave }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900">
                        {editingActivityId ? 'Edit Aktivitas' : 'Tambah Aktivitas'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>

                <form onSubmit={onSave}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-1">Nama Aktivitas</label>
                            <input
                                type="text"
                                required
                                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="Contoh: Apel Pagi"
                                value={currentActivity.name}
                                onChange={(e) => setCurrentActivity(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-1">Deskripsi</label>
                            <textarea
                                rows="3"
                                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                placeholder="Jelaskan secara singkat..."
                                value={currentActivity.description}
                                onChange={(e) => setCurrentActivity(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-[#d41111] transition-colors shadow-lg shadow-blue-200"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ActivityModal;

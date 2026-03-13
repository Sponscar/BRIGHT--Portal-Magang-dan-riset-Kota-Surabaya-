const CriteriaManagementModal = ({
    isOpen,
    criteria,
    editingCriteria,
    criteriaForm,
    setCriteriaForm,
    getBobotByCategory,
    onClose,
    onSave,
    onEdit,
    onDelete,
    onCancelEdit
}) => {
    if (!isOpen) return null;

    const behaviorBobot = getBobotByCategory('behavior');
    const performanceBobot = getBobotByCategory('performance');
    const isBehaviorOver = behaviorBobot > 40;
    const isPerformanceOver = performanceBobot > 60;
    const canSave = !isBehaviorOver && !isPerformanceOver;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Kelola Kriteria Penilaian</h3>
                        <p className="text-sm text-slate-500 mt-0.5">Tambah, ubah, atau hapus kriteria penilaian.</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                    {/* Alert Cards - Bobot Perilaku */}
                    <BobotAlertCard
                        label="Perilaku Kerja"
                        current={behaviorBobot}
                        max={40}
                        icon="psychology"
                        color="blue"
                    />

                    {/* Alert Cards - Bobot Kinerja */}
                    <BobotAlertCard
                        label="Kinerja"
                        current={performanceBobot}
                        max={60}
                        icon="trending_up"
                        color="emerald"
                    />

                    {/* Form Tambah/Edit */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
                        <h4 className="text-sm font-bold text-slate-900 mb-3">{editingCriteria ? 'Edit Kriteria' : 'Tambah Kriteria Baru'}</h4>
                        <form onSubmit={onSave} className="space-y-3">
                            <div className="flex gap-3 items-end">
                                <div className="flex-1">
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Nama Kriteria</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: Kedisiplinan"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={criteriaForm.name}
                                        onChange={(e) => setCriteriaForm({ ...criteriaForm, name: e.target.value })}
                                    />
                                </div>
                                <div className="w-1/4">
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Kategori</label>
                                    <select
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={criteriaForm.category}
                                        onChange={(e) => setCriteriaForm({ ...criteriaForm, category: e.target.value })}
                                    >
                                        <option value="behavior">Perilaku Kerja</option>
                                        <option value="performance">Kinerja</option>
                                    </select>
                                </div>
                                <div className="w-24">
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Bobot (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        required
                                        placeholder="0-100"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        value={criteriaForm.bobot}
                                        onChange={(e) => setCriteriaForm({ ...criteriaForm, bobot: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end">
                                <div className="flex gap-2">
                                    {editingCriteria && (
                                        <button
                                            type="button"
                                            onClick={onCancelEdit}
                                            className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                                        >
                                            Batal
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-hover transition-colors shadow-md shadow-primary/20"
                                    >
                                        {editingCriteria ? 'Simpan' : 'Tambah'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* List Kriteria */}
                    <div className="space-y-6">
                        {/* Behavior List */}
                        <CriteriaList
                            title="Perilaku Kerja (Behavior)"
                            subtitle={`Total bobot: ${behaviorBobot}% / 40%`}
                            icon="psychology"
                            iconColor="text-blue-500"
                            hoverBorderColor="hover:border-blue-200"
                            badgeColor="text-blue-600 bg-blue-50 border-blue-200"
                            items={criteria.filter(c => c.category === 'behavior')}
                            emptyMessage="Belum ada kriteria perilaku."
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />

                        {/* Performance List */}
                        <CriteriaList
                            title="Kinerja (Performance)"
                            subtitle={`Total bobot: ${performanceBobot}% / 60%`}
                            icon="trending_up"
                            iconColor="text-emerald-500"
                            hoverBorderColor="hover:border-emerald-200"
                            badgeColor="text-emerald-600 bg-emerald-50 border-emerald-200"
                            items={criteria.filter(c => c.category === 'performance')}
                            emptyMessage="Belum ada kriteria kinerja."
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    {(!canSave) && (
                        <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined notranslate text-[16px]">error</span>
                            Bobot melebihi batas. Perbaiki sebelum menutup.
                        </p>
                    )}
                    <div className="ml-auto">
                        <button
                            onClick={onClose}
                            disabled={!canSave}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-colors ${
                                canSave
                                    ? 'bg-slate-800 text-white hover:bg-slate-900'
                                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            }`}
                        >
                            Selesai
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Alert Card component for bobot limits
const BobotAlertCard = ({ label, current, max, icon, color }) => {
    const isOver = current > max;
    const isExact = current === max;
    const percentage = Math.min((current / max) * 100, 100);

    if (isOver) {
        return (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-in slide-in-from-top duration-300">
                <span className="material-symbols-outlined notranslate text-red-500 text-[24px] mt-0.5">warning</span>
                <div className="flex-1">
                    <p className="text-sm font-bold text-red-700">
                        Bobot {label} Melebihi Batas!
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                        Total bobot saat ini: <strong>{current}%</strong> dari maksimal <strong>{max}%</strong>.
                        Anda perlu mengurangi <strong>{current - max}%</strong> agar bisa menyimpan.
                    </p>
                    <div className="mt-2 w-full bg-red-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`mb-4 p-4 rounded-xl flex items-start gap-3 border transition-all ${
            isExact
                ? `bg-emerald-50 border-emerald-200`
                : `bg-${color}-50/50 border-${color}-100`
        }`}>
            <span className={`material-symbols-outlined notranslate text-[24px] mt-0.5 ${
                isExact ? 'text-emerald-500' : `text-${color}-400`
            }`}>{isExact ? 'check_circle' : icon}</span>
            <div className="flex-1">
                <p className={`text-sm font-bold ${isExact ? 'text-emerald-700' : 'text-slate-700'}`}>
                    {label}: {current}% / {max}%
                    {isExact && ' ✓ Lengkap'}
                </p>
                <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                            isExact ? 'bg-emerald-500' : `bg-${color}-400`
                        }`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                {!isExact && (
                    <p className="text-xs text-slate-500 mt-1">Sisa tersedia: {max - current}%</p>
                )}
            </div>
        </div>
    );
};

const CriteriaList = ({ title, subtitle, icon, iconColor, hoverBorderColor, badgeColor, items, emptyMessage, onEdit, onDelete }) => (
    <div>
        <div className="mb-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className={`material-symbols-outlined notranslate ${iconColor} text-[18px]`}>{icon}</span>
                {title}
            </h4>
            {subtitle && <p className="text-xs text-slate-500 ml-7 mt-0.5">{subtitle}</p>}
        </div>
        <div className="space-y-2">
            {items.length > 0 ? (
                items.map(c => (
                    <div key={c.id} className={`flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 group ${hoverBorderColor} transition-colors`}>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-700">{c.name}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>{c.bobot}%</span>
                        </div>
                        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onEdit(c)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit"
                            >
                                <span className="material-symbols-outlined notranslate text-[18px]">edit</span>
                            </button>
                            <button
                                onClick={() => onDelete(c.id)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Hapus"
                            >
                                <span className="material-symbols-outlined notranslate text-[18px]">delete</span>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-xs text-slate-400 italic text-center py-2">{emptyMessage}</p>
            )}
        </div>
    </div>
);

export default CriteriaManagementModal;

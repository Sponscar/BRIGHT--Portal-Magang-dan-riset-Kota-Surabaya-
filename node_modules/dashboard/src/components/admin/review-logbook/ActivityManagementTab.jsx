import { useState } from 'react';

const ActivityTable = ({ title, description, category, activityTypes, onAdd, onEdit, onDelete }) => {
    const filtered = activityTypes.filter(t => t.category === category);

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-500">{description}</p>
                </div>
                <button
                    onClick={() => onAdd(category)}
                    className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-[#d41111] transition-all shadow-md shadow-blue-200/50 flex items-center gap-2"
                >
                    <span className="material-symbols-outlined notranslate text-[20px]">add</span>
                    Tambah Aktivitas
                </button>
            </div>

            <div className="overflow-hidden border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-16 text-center">No</th>
                            <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Jenis Aktivitas</th>
                            <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Deskripsi</th>
                            <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right w-32">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filtered.map((type, index) => (
                            <tr key={type.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-3 px-4 text-sm text-slate-500 text-center">{index + 1}</td>
                                <td className="py-3 px-4 text-sm font-semibold text-slate-900">{type.name}</td>
                                <td className="py-3 px-4 text-sm text-slate-600">{type.description}</td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(type)}
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <span className="material-symbols-outlined notranslate text-[18px]">edit</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(type.id)}
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Hapus"
                                        >
                                            <span className="material-symbols-outlined notranslate text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const FILTER_TABS = [
    { id: 'enabler', label: 'Enabler / Faktor Pendorong' },
    { id: 'riset', label: 'Riset' },
    { id: 'inovasi', label: 'Inovasi' },
    { id: 'kebun_raya', label: 'Pengelolaan Kebun Raya Mangrove' },
    { id: 'kesekretariatan', label: 'Kesekretariatan' },
];

const CATEGORY_CONFIG = {
    enabler: [
        { category: 'sdm', title: 'Peningkatan Kompetensi SDM', description: 'Kelola jenis aktivitas peningkatan kompetensi SDM.' },
        { category: 'kolaborasi', title: 'Kolaborasi', description: 'Kelola jenis aktivitas kolaborasi riset dan inovasi.' },
        { category: 'pemantauan', title: 'Pemantauan dan Evaluasi', description: 'Kelola jenis aktivitas pemantauan dan evaluasi riset dan inovasi.' },
    ],
    riset: [
        { category: 'penelitian', title: 'Penelitian', description: 'Kelola jenis aktivitas penelitian.' },
        { category: 'pengembangan', title: 'Pengembangan dan Pengkajian', description: 'Kelola jenis aktivitas pengembangan dan pengkajian.' },
        { category: 'penerapan', title: 'Penerapan', description: 'Kelola jenis aktivitas penerapan teknologi.' },
    ],
    inovasi: [
        { category: 'inovasi', title: 'Invensi dan Inovasi', description: 'Kelola jenis aktivitas invensi dan inovasi.' },
    ],
    kebun_raya: [
        { category: 'pemeliharaan_kebun', title: 'Pemeliharaan Kawasan Kebun Raya', description: 'Kelola jenis aktivitas pemeliharaan kawasan.' },
        { category: 'koleksi_tumbuhan', title: 'Pengelolaan Koleksi Tumbuhan', description: 'Kelola jenis aktivitas koleksi tumbuhan.' },
        { category: 'pemanfaatan_kebun', title: 'Pemanfaatan Kawasan Kebun Raya', description: 'Kelola jenis aktivitas pemanfaatan kawasan.' },
    ],
    kesekretariatan: [
        { category: 'perencanaan', title: 'Perencanaan', description: 'Kelola jenis aktivitas perencanaan.' },
        { category: 'keuangan', title: 'Penganggaran dan Keuangan', description: 'Kelola jenis aktivitas keuangan.' },
        { category: 'sdm_sekretariat', title: 'Sumber Daya Manusia (SDM)', description: 'Kelola jenis aktivitas SDM kesekretariatan.' },
        { category: 'umum', title: 'Layanan Umum Kantor', description: 'Kelola jenis aktivitas layanan umum.' },
        { category: 'tik', title: 'Teknologi Informasi dan Komunikasi (TIK)', description: 'Kelola jenis aktivitas TIK.' },
        { category: 'monev_sekretariat', title: 'Monitoring Evaluasi dan Laporan (MONEV)', description: 'Kelola jenis aktivitas monitoring evaluasi.' },
    ],
};

const ActivityManagementTab = ({ activityTypes, onAdd, onEdit, onDelete }) => {
    const [selectedFilter, setSelectedFilter] = useState('enabler');
    const tables = CATEGORY_CONFIG[selectedFilter] || [];

    return (
        <div className="space-y-6">
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {FILTER_TABS.map(filter => (
                    <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedFilter === filter.id
                            ? 'bg-primary text-white shadow-lg shadow-blue-200'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Activity Tables */}
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {tables.map(config => (
                    <ActivityTable
                        key={config.category}
                        title={config.title}
                        description={config.description}
                        category={config.category}
                        activityTypes={activityTypes}
                        onAdd={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default ActivityManagementTab;

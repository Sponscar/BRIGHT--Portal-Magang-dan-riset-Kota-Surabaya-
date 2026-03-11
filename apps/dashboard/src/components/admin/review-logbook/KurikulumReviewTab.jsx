import { useState } from 'react';

const KurikulumReviewTab = ({ students, onViewDetail }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.university.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
                <div className="relative w-full md:max-w-xs">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined notranslate text-[20px]">search</span>
                    <input
                        type="text"
                        placeholder="Cari nama atau universitas..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="text-sm text-slate-500">
                    Total: <span className="font-semibold text-primary">{filteredStudents.length}</span> mahasiswa
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-slate-500 w-16">No</th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-slate-500">Nama</th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-slate-500">Universitas / Prodi</th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-slate-500">Tim</th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-slate-500 w-24">Jumlah</th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-slate-500 text-center w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredStudents.map((student, index) => (
                                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-slate-600">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-900">{student.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {student.university} / {student.major}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-blue-50 text-primary text-xs font-medium rounded-full border border-blue-100">
                                            {student.team || '-'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                                        {student.kurikulum ? student.kurikulum.length : 0} materi
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => onViewDetail(student)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-semibold transition-all border border-primary/20 hover:border-primary"
                                            >
                                                <span className="material-symbols-outlined notranslate text-[16px]">visibility</span>
                                                View
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredStudents.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-12 text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="material-symbols-outlined notranslate text-4xl text-slate-300">search_off</span>
                                            <p>Tidak ada data kurikulum magang ditemukan.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default KurikulumReviewTab;

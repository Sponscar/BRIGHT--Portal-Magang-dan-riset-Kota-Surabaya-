import React from 'react';
import { initialActivityTypes, categoryLabels } from '../../../data/activityTypes';

const LogbookTable = ({ entries, onEdit, onDelete, onPreview }) => {
    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-amber-50 text-amber-700 border-amber-200',
            approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            rejected: 'bg-blue-50 text-blue-700 border-blue-200',
        };
        const labels = {
            pending: 'Menunggu Review',
            approved: 'Disetujui',
            rejected: 'Ditolak',
        };
        const currentStatus = status || 'pending';
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${styles[currentStatus]}`}>
                {labels[currentStatus]}
            </span>
        );
    };

    const getAssignmentType = (activityName) => {
        const activity = initialActivityTypes.find(a => a.name === activityName);
        return activity && categoryLabels[activity.category] ? categoryLabels[activity.category] : '-';
    };

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#1b0d0d]">Riwayat Logbook</h3>
                {onPreview && (
                    <button
                        onClick={onPreview}
                        className="px-4 py-2.5 bg-gradient-to-r from-primary to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined notranslate text-[18px]">preview</span>
                        Preview & Download
                    </button>
                )}
            </div>
            <div className="bg-white rounded-xl border border-[#f3e7e7] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-[#f3e7e7]">
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary w-16">No</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary w-40">Tanggal</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary w-48">Tipe Laporan</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary">Jenis Penugasan</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary">Jenis Aktivitas</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary w-48">Lokasi</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary w-32">Status</th>
                                <th className="px-6 py-4 text-xs uppercase font-medium text-primary text-center w-32">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f3e7e7]">
                            {entries.map((entry, index) => (
                                <tr key={entry.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-[#1b0d0d]">{entry.tanggal}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${entry.type === 'Laporan Harian' ? 'bg-blue-100 text-blue-800' :
                                            entry.type === 'Jurnal Telah Diajukan' ? 'bg-green-100 text-green-800' :
                                                'bg-orange-100 text-orange-800'
                                            }`}>
                                            {entry.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {entry.type === 'Laporan Harian' ? getAssignmentType(entry.jenisKegiatan) : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {entry.type === 'Laporan Harian' ? entry.jenisKegiatan : entry.kegiatan}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-[200px]" title={entry.lokasiNama}>
                                        {entry.type === 'Laporan Harian' && entry.lokasiNama ? entry.lokasiNama : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(entry.status)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">

                                            {onEdit && entry.status !== 'approved' && (
                                                <button
                                                    onClick={() => onEdit(entry)}
                                                    className="p-1.5 text-amber-500 hover:text-amber-700 transition-colors"
                                                    title="Edit"
                                                >
                                                    <span className="material-symbols-outlined notranslate text-[20px]">edit</span>
                                                </button>
                                            )}
                                            {entry.status !== 'approved' && (
                                                <button
                                                    onClick={() => onDelete(entry.id)}
                                                    className="p-1.5 text-primary hover:text-blue-700 transition-colors"
                                                    title="Delete"
                                                >
                                                    <span className="material-symbols-outlined notranslate text-[20px]">delete</span>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {entries.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center py-8 text-gray-500">
                                        Belum ada logbook yang dicatat.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default LogbookTable;

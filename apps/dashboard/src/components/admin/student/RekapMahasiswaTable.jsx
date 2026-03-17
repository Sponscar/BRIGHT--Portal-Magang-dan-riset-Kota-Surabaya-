const RekapMahasiswaTable = ({ students, visibleColumns }) => {
    if (!students || students.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                <span className="material-symbols-outlined notranslate text-[48px] text-slate-300 mb-3 block">search_off</span>
                <p className="text-slate-500 font-medium">Tidak ada data mahasiswa ditemukan.</p>
                <p className="text-slate-400 text-sm mt-1">Coba ubah kata kunci pencarian Anda.</p>
            </div>
        );
    }

    // Master list of all available columns
    const AVAILABLE_COLUMNS = [
        { key: 'nik', label: 'NIK' },
        { key: 'nim', label: 'NIM' },
        { key: 'university', label: 'Perguruan Tinggi' },
        { key: 'major', label: 'Prodi' },
        { key: 'team', label: 'Tim' },
        { key: 'internshipType', label: 'Jenis Pengajuan' },
        { key: 'dosenPembimbing', label: 'Dosen Pembimbing' },
        { key: 'dosenPhone', label: 'No. HP Dosen' },
        { key: 'dosenWhatsapp', label: 'WhatsApp Dosen' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'No. HP' },
        { key: 'whatsapp', label: 'WhatsApp' },
        { key: 'year', label: 'Tahun' },
    ];

    // Always show No and Nama Lengkap, then append only the visible columns
    const columns = [
        { key: 'no', label: 'No' },
        { key: 'fullName', label: 'Nama Lengkap' },
        ...AVAILABLE_COLUMNS.filter(col => visibleColumns.includes(col.key))
    ];

    const renderCell = (col, student, index) => {
        if (col.key === 'no') return <td key={col.key} className="px-4 py-3 text-slate-500 font-medium">{index + 1}</td>;
        if (col.key === 'fullName') return <td key={col.key} className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{student.fullName}</td>;
        if (col.key === 'nik') return <td key={col.key} className="px-4 py-3 text-slate-600 whitespace-nowrap font-mono text-xs">{student.nik}</td>;
        if (col.key === 'nim') return <td key={col.key} className="px-4 py-3 text-slate-600 whitespace-nowrap font-mono text-xs">{student.nim}</td>;
        if (col.key === 'team') {
            return (
                <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${student.team && student.team !== '-' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-400'}`}>
                        {student.team || '-'}
                    </span>
                </td>
            );
        }
        if (col.key === 'internshipType') {
            const isRiset = student.internshipType && (student.internshipType.includes('Penelitian') || student.internshipType.includes('Riset'));
            const isMagang = student.internshipType && student.internshipType.includes('Magang');
            
            return (
                <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${isRiset ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                            isMagang ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                        {student.internshipType}
                    </span>
                </td>
            );
        }
        return <td key={col.key} className="px-4 py-3 text-slate-600 whitespace-nowrap">{student[col.key]}</td>;
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            {columns.map(col => (
                                <th key={col.key} className="text-left px-4 py-3 font-bold text-slate-600 whitespace-nowrap">{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s, i) => (
                            <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                {columns.map(col => renderCell(col, s, i))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <p className="text-sm text-slate-500">Menampilkan <span className="font-bold text-slate-700">{students.length}</span> data mahasiswa</p>
            </div>
        </div>
    );
};

export const REKAP_AVAILABLE_COLUMNS = [
    { key: 'nik', label: 'NIK' },
    { key: 'nim', label: 'NIM' },
    { key: 'university', label: 'Perguruan Tinggi' },
    { key: 'major', label: 'Prodi' },
    { key: 'team', label: 'Tim Kerja' },
    { key: 'internshipType', label: 'Jenis Pengajuan' },
    { key: 'dosenPembimbing', label: 'Dosen Pembimbing' },
    { key: 'dosenPhone', label: 'No HP Dosen' },
    { key: 'dosenWhatsapp', label: 'WhatsApp Dosen' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'No HP' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'year', label: 'Tahun' },
];

// Export column config for CSV export
export const getRekapColumns = (visibleColumns) => {
    return [
        'No', 
        'Nama Lengkap', 
        ...REKAP_AVAILABLE_COLUMNS.filter(col => visibleColumns.includes(col.key)).map(col => col.label)
    ];
};

export const getRekapRowKeys = (visibleColumns) => {
    return [
        'fullName',
        ...REKAP_AVAILABLE_COLUMNS.filter(col => visibleColumns.includes(col.key)).map(col => col.key)
    ];
};

export default RekapMahasiswaTable;

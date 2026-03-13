const RekapMahasiswaTable = ({ students, filterMode }) => {
    if (!students || students.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                <span className="material-symbols-outlined notranslate text-[48px] text-slate-300 mb-3 block">search_off</span>
                <p className="text-slate-500 font-medium">Tidak ada data mahasiswa ditemukan.</p>
                <p className="text-slate-400 text-sm mt-1">Coba ubah filter atau kata kunci pencarian Anda.</p>
            </div>
        );
    }

    // Define columns based on filter mode
    const columnConfig = {
        semua: [
            { key: 'no', label: 'No' },
            { key: 'fullName', label: 'Nama Lengkap' },
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
        ],
        perguruan_tinggi: [
            { key: 'no', label: 'No' },
            { key: 'fullName', label: 'Nama' },
            { key: 'university', label: 'Perguruan Tinggi' },
            { key: 'nim', label: 'NIM' },
            { key: 'major', label: 'Prodi' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'No. HP' },
            { key: 'whatsapp', label: 'WhatsApp' },
        ],
        jenis_pengajuan: [
            { key: 'no', label: 'No' },
            { key: 'fullName', label: 'Nama' },
            { key: 'nik', label: 'NIK' },
            { key: 'team', label: 'Tim' },
            { key: 'internshipType', label: 'Jenis Pengajuan' },
            { key: 'dosenPembimbing', label: 'Dosen Pembimbing' },
            { key: 'dosenPhone', label: 'No. HP Dosen' },
            { key: 'dosenWhatsapp', label: 'WhatsApp Dosen' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'No. HP' },
            { key: 'whatsapp', label: 'WhatsApp' },
        ],
        tahun: [
            { key: 'no', label: 'No' },
            { key: 'fullName', label: 'Nama' },
            { key: 'nik', label: 'NIK' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'No. HP' },
            { key: 'whatsapp', label: 'WhatsApp' },
            { key: 'year', label: 'Tahun' },
        ],
    };

    const columns = columnConfig[filterMode] || columnConfig.semua;

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

// Export column config for CSV export
export const getRekapColumns = (filterMode) => {
    const map = {
        semua: ['No', 'Nama Lengkap', 'NIK', 'NIM', 'Perguruan Tinggi', 'Prodi', 'Tim', 'Jenis Pengajuan', 'Dosen Pembimbing', 'No HP Dosen', 'WhatsApp Dosen', 'Email', 'No HP', 'WhatsApp', 'Tahun'],
        perguruan_tinggi: ['No', 'Nama', 'Perguruan Tinggi', 'NIM', 'Prodi', 'Email', 'No HP', 'WhatsApp'],
        jenis_pengajuan: ['No', 'Nama', 'NIK', 'Tim', 'Jenis Pengajuan', 'Dosen Pembimbing', 'No HP Dosen', 'WhatsApp Dosen', 'Email', 'No HP', 'WhatsApp'],
        tahun: ['No', 'Nama', 'NIK', 'Email', 'No HP', 'WhatsApp', 'Tahun'],
    };
    return map[filterMode] || map.semua;
};

export const getRekapRowKeys = (filterMode) => {
    const map = {
        semua: ['fullName', 'nik', 'nim', 'university', 'major', 'team', 'internshipType', 'dosenPembimbing', 'dosenPhone', 'dosenWhatsapp', 'email', 'phone', 'whatsapp', 'year'],
        perguruan_tinggi: ['fullName', 'university', 'nim', 'major', 'email', 'phone', 'whatsapp'],
        jenis_pengajuan: ['fullName', 'nik', 'team', 'internshipType', 'dosenPembimbing', 'dosenPhone', 'dosenWhatsapp', 'email', 'phone', 'whatsapp'],
        tahun: ['fullName', 'nik', 'email', 'phone', 'whatsapp', 'year'],
    };
    return map[filterMode] || map.semua;
};

export default RekapMahasiswaTable;

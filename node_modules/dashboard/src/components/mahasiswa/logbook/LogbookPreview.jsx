import { useRef } from 'react';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType, HeadingLevel, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { initialActivityTypes, categoryLabels } from '../../../data/activityTypes';

const LogbookPreview = ({ isOpen, entries, onClose }) => {
    const printRef = useRef(null);

    if (!isOpen) return null;

    // Only show Laporan Harian entries
    const dailyEntries = entries.filter(e => e.type === 'Laporan Harian');
    const latestEntry = dailyEntries.length > 0 ? dailyEntries[0] : null;

    const getAssignmentType = (entry) => {
        if (!entry) return '-';
        if (entry.kategori && categoryLabels[entry.kategori]) {
            return categoryLabels[entry.kategori];
        }
        const activity = initialActivityTypes.find(a => a.name === entry.jenisKegiatan);
        return activity && categoryLabels[activity.category] ? categoryLabels[activity.category] : '-';
    };

    // Mock student info (replace with real data from context later)
    const studentInfo = {
        nama: 'Muhammad Rizki Pratama',
        universitas: 'Politeknik Elektronika Negeri Surabaya',
        programStudi: 'Teknik Informatika',
        tanggal: '10 Februari 2026',
        lokasi: 'Kantor BRIGHT',
        jenisPenugasan: getAssignmentType(latestEntry),
        jenisAktivitas: latestEntry ? latestEntry.jenisKegiatan : '-',
    };

    const calculateTotalHours = (jamMulai, jamSelesai) => {
        if (!jamMulai || !jamSelesai) return '-';
        const [h1, m1] = jamMulai.split(':').map(Number);
        const [h2, m2] = jamSelesai.split(':').map(Number);
        const diff = (h2 * 60 + m2) - (h1 * 60 + m1);
        if (diff <= 0) return '-';
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return `${hours} jam${minutes > 0 ? ` ${minutes} mnt` : ''}`;
    };

    const getStatusLabel = (status) => {
        if (status === 'approved') return '✓';
        if (status === 'rejected') return '✗';
        return '-';
    };



    // ─── Word Export ───
    const handleExportWord = async () => {
        const headerRow = new TableRow({
            tableHeader: true,
            children: [
                'Hari/Tanggal', 'Jam Datang', 'Jam Pulang', 'Total Jam Kerja',
                'Uraian Kegiatan Magang', 'Output Kegiatan (didapat/dipahami/dikerjakan)',
                'Bukti Foto', 'Validasi Dosen Lapangan', 'Validasi Dosen Pembimbing'
            ].map(text => new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 20 })], alignment: AlignmentType.CENTER })],
                width: { size: text.length > 15 ? 15 : 10, type: WidthType.PERCENTAGE },
            })),
        });

        const dataRows = dailyEntries.map(entry => new TableRow({
            children: [
                entry.tanggal || '-',
                entry.jamMulai || '08:00',
                entry.jamSelesai || '17:00',
                calculateTotalHours(entry.jamMulai, entry.jamSelesai),
                entry.deskripsi || '-',
                entry.pembelajaran || '-',
                entry.file ? 'Ada' : '-',
                '-',
                '-',
            ].map(text => new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: String(text), size: 18 })], alignment: AlignmentType.LEFT })],
            })),
        }));

        const doc = new Document({
            sections: [{
                properties: { page: { size: { orientation: 'landscape' } } },
                children: [
                    new Paragraph({ children: [new TextRun({ text: 'LAPORAN LOGBOOK MAHASISWA', bold: true, size: 28 })], alignment: AlignmentType.CENTER, spacing: { after: 200 } }),
                    new Paragraph({ children: [new TextRun({ text: `Nama\t\t\t\t\t: ${studentInfo.nama}`, size: 22 })] }),
                    new Paragraph({ children: [new TextRun({ text: `Universitas\t\t\t\t: ${studentInfo.universitas}`, size: 22 })] }),
                    new Paragraph({ children: [new TextRun({ text: `Program Studi\t\t\t: ${studentInfo.programStudi}`, size: 22 })] }),
                    new Paragraph({ children: [new TextRun({ text: `Tanggal\t\t\t\t\t: ${studentInfo.tanggal}`, size: 22 })] }),
                    new Paragraph({ children: [new TextRun({ text: `Lokasi\t\t\t\t\t: ${studentInfo.lokasi}`, size: 22 })] }),
                    new Paragraph({ children: [new TextRun({ text: `Jenis Penugasan\t\t\t: ${studentInfo.jenisPenugasan}`, size: 22 })] }),
                    new Paragraph({ children: [new TextRun({ text: `Jenis Aktivitas\t\t\t: ${studentInfo.jenisAktivitas}`, size: 22 })], spacing: { after: 300 } }),
                    new Table({ rows: [headerRow, ...dataRows], width: { size: 100, type: WidthType.PERCENTAGE } }),
                ],
            }],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `Logbook_${studentInfo.nama.replace(/\s/g, '_')}.docx`);
    };

    // ─── Excel Export ───
    const handleExportExcel = () => {
        const headers = ['Hari/Tanggal', 'Jam Datang', 'Jam Pulang', 'Total Jam Kerja', 'Uraian Kegiatan Magang', 'Output Kegiatan', 'Bukti Foto', 'Validasi Dosen Lapangan', 'Validasi Dosen Pembimbing'];
        const data = dailyEntries.map(entry => [
            entry.tanggal || '-',
            entry.jamMulai || '08:00',
            entry.jamSelesai || '17:00',
            calculateTotalHours(entry.jamMulai, entry.jamSelesai),
            entry.deskripsi || '-',
            entry.pembelajaran || '-',
            entry.file ? 'Ada' : '-',
            '-',
            '-',
        ]);

        const wsData = [
            ['LAPORAN LOGBOOK MAHASISWA'],
            [],
            [`Nama: ${studentInfo.nama}`],
            [`Universitas: ${studentInfo.universitas}`],
            [`Program Studi: ${studentInfo.programStudi}`],
            [`Tanggal: ${studentInfo.tanggal}`],
            [`Lokasi: ${studentInfo.lokasi}`],
            [`Jenis Penugasan: ${studentInfo.jenisPenugasan}`],
            [`Jenis Aktivitas: ${studentInfo.jenisAktivitas}`],
            [],
            headers,
            ...data,
        ];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        ws['!cols'] = headers.map((_, i) => ({ wch: i === 4 || i === 5 ? 40 : 18 }));
        XLSX.utils.book_append_sheet(wb, ws, 'Logbook');
        XLSX.writeFile(wb, `Logbook_${studentInfo.nama.replace(/\s/g, '_')}.xlsx`);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 pt-8 pb-8">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[1400px] animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Toolbar */}
                <div className="sticky top-0 z-10 bg-white border-b border-slate-200 rounded-t-2xl px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined notranslate text-primary text-xl">preview</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Preview Logbook</h3>
                            <p className="text-xs text-slate-500">{dailyEntries.length} entri laporan harian</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">

                        <button
                            onClick={handleExportWord}
                            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined notranslate text-[18px]">description</span>
                            Word
                        </button>
                        <button
                            onClick={handleExportExcel}
                            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-200 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined notranslate text-[18px]">table_chart</span>
                            Excel
                        </button>
                        <div className="w-px h-8 bg-slate-200 mx-1"></div>
                        <button
                            onClick={onClose}
                            className="p-2.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                        >
                            <span className="material-symbols-outlined notranslate text-xl">close</span>
                        </button>
                    </div>
                </div>

                {/* Print Area */}
                <div className="p-6 overflow-x-auto">
                    <div
                        ref={printRef}
                        className="bg-white p-8 min-w-[1100px]"
                        style={{ fontFamily: "'Times New Roman', serif" }}
                    >
                        {/* Title */}
                        <h1 className="text-center text-[18px] font-bold tracking-wide mb-6" style={{ fontFamily: "'Times New Roman', serif" }}>
                            LAPORAN LOGBOOK MAHASISWA
                        </h1>

                        {/* Student Info */}
                        <div className="mb-6 text-[13px] leading-relaxed" style={{ fontFamily: "'Times New Roman', serif" }}>
                            <div className="grid grid-cols-[220px_20px_1fr] gap-y-1">
                                <span className="font-medium">Nama</span><span>:</span><span>{studentInfo.nama}</span>
                                <span className="font-medium">Universitas</span><span>:</span><span>{studentInfo.universitas}</span>
                                <span className="font-medium">Program Studi</span><span>:</span><span>{studentInfo.programStudi}</span>
                                <span className="font-medium">Tanggal</span><span>:</span><span>{studentInfo.tanggal}</span>
                                <span className="font-medium">Lokasi</span><span>:</span><span>{studentInfo.lokasi}</span>
                                <span className="font-medium">Jenis Penugasan</span><span>:</span><span>{studentInfo.jenisPenugasan}</span>
                                <span className="font-medium">Jenis Aktivitas</span><span>:</span><span>{studentInfo.jenisAktivitas}</span>
                            </div>
                        </div>

                        {/* Table */}
                        <table className="w-full border-collapse text-[11px]" style={{ fontFamily: "'Times New Roman', serif" }}>
                            <thead>
                                <tr>
                                    {['Hari/\nTanggal', 'Jam\nDatang', 'Jam\nPulang', 'Total\nJam Kerja', 'Uraian Kegiatan\nMagang', 'Output Kegiatan\n(didapat/dipahami/\ndikerjakan)', 'Bukti\nFoto', 'Validasi\nDosen Lapangan', 'Validasi\nDosen Pembimbing'].map((header, i) => (
                                        <th
                                            key={i}
                                            className="border border-black px-2 py-2 text-center font-bold whitespace-pre-line align-middle bg-slate-50"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dailyEntries.length > 0 ? (
                                    dailyEntries.map((entry, idx) => (
                                        <tr key={idx} className="align-top">
                                            <td className="border border-black px-2 py-2 text-center w-[100px]">
                                                {entry.tanggal || '-'}
                                            </td>
                                            <td className="border border-black px-2 py-2 text-center w-[70px]">
                                                {entry.jamMulai || '08:00'}
                                            </td>
                                            <td className="border border-black px-2 py-2 text-center w-[70px]">
                                                {entry.jamSelesai || '17:00'}
                                            </td>
                                            <td className="border border-black px-2 py-2 text-center w-[70px]">
                                                {calculateTotalHours(entry.jamMulai, entry.jamSelesai)}
                                            </td>
                                            <td className="border border-black px-2 py-2 w-[200px]">
                                                {entry.deskripsi || '-'}
                                            </td>
                                            <td className="border border-black px-2 py-2 w-[200px]">
                                                {entry.pembelajaran || '-'}
                                            </td>
                                            <td className="border border-black px-2 py-2 text-center w-[120px]">
                                                {entry.file ? (
                                                    (typeof entry.file === 'string' || entry.file.type?.startsWith('image/')) ? (
                                                        <img
                                                            src={typeof entry.file === 'string' ? entry.file : URL.createObjectURL(entry.file)}
                                                            alt="Bukti Foto"
                                                            className="max-w-[100px] max-h-[100px] object-contain mx-auto"
                                                            onError={(e) => { e.target.style.display = 'none'; }}
                                                        />
                                                    ) : (
                                                        <span className="text-emerald-600 font-semibold text-[10px] break-all">File terlampir</span>
                                                    )
                                                ) : (
                                                    <span className="text-slate-400">-</span>
                                                )}
                                            </td>
                                            <td className="border border-black px-2 py-2 text-center w-[100px]">
                                                <span className="text-slate-400">-</span>
                                            </td>
                                            <td className="border border-black px-2 py-2 text-center w-[100px]">
                                                <span className="text-slate-400">-</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={9} className="border border-black px-4 py-12 text-center text-slate-400 italic">
                                            Belum ada entri laporan harian.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogbookPreview;

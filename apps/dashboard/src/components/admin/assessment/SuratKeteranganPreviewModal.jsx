import { useState, useRef, useCallback } from 'react';
import SuratKeteranganTemplate from './SuratKeteranganTemplate';
import ModalPortal from '../ModalPortal';
import { createRoot } from 'react-dom/client';
import { perangkatDaerahData } from '../../../data/perangkatDaerah';

const SuratKeteranganPreviewModal = ({ isOpen, onClose, surat }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);
    const suratRef = useRef(null);

    if (!isOpen || !surat) return null;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    };

    const handlePrintPdf = () => {
        setIsPrinting(true);
        const printWindow = window.open('', '_blank', 'width=794,height=1123');
        if (!printWindow) {
            setIsPrinting(false);
            alert('Popup diblokir oleh browser. Harap izinkan popup untuk mencetak.');
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html><head>
                <title>Surat Keterangan - ${surat.studentName}</title>
                <style>
                    @page { size: A4 portrait; margin: 0; }
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { font-family: Arial, sans-serif; }
                    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
                </style>
            </head><body><div id="print-root"></div></body></html>
        `);
        printWindow.document.close();

        const container = printWindow.document.getElementById('print-root');
        const root = createRoot(container);
        root.render(
            <SuratKeteranganTemplate
                studentName={surat.studentName}
                nomorSurat={surat.nomor_surat}
                university={surat.university}
                major={surat.major || '-'}
                nim={surat.nim || '-'}
                perangkatDaerah={surat.perangkat_daerah || '-'}
                startDate={surat.tanggal_mulai}
                endDate={surat.tanggal_selesai}
                kepalaName={surat.kepala_name}
                kepalaNip={surat.kepala_nip}
                instansi={surat.instansi}
                jabatanKepala={surat.jabatan_kepala}
                headerNamaInstansi={(() => { const pd = perangkatDaerahData.find(p => p.nama === surat.perangkat_daerah); return pd ? pd.nama.toUpperCase() : (surat.instansi || 'BADAN RISET DAN INOVASI DAERAH').toUpperCase(); })()}
                headerAlamat={(() => { const pd = perangkatDaerahData.find(p => p.nama === surat.perangkat_daerah); return pd ? pd.alamat : 'Jl. Jimerto No. 25-27 Surabaya 60272'; })()}
                headerTelp={(() => { const pd = perangkatDaerahData.find(p => p.nama === surat.perangkat_daerah); return pd ? pd.telp : '(031) 5347182'; })()}
                headerEmail={(() => { const pd = perangkatDaerahData.find(p => p.nama === surat.perangkat_daerah); return pd ? pd.email : 'brida@surabaya.go.id'; })()}
                bidang={surat.bidang || ''}
                fokusKegiatan={surat.fokus_kegiatan || []}
            />
        );

        setTimeout(() => {
            printWindow.focus();
            printWindow.print();
            setIsPrinting(false);
        }, 500);
    };

    return (
        <ModalPortal>
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 ${isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter'}`}>
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>
                {/* Header */}
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Preview Surat Keterangan</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{surat.studentName} — {surat.nomor_surat}</p>
                    </div>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>

                {/* Preview */}
                <div className="flex-1 overflow-y-auto bg-slate-100 p-6 flex items-start justify-center">
                    <div className="shadow-xl bg-white" style={{
                        width: `${794 * 0.65}px`,
                        height: `${1123 * 0.65}px`,
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: '794px', height: '1123px',
                            transform: 'scale(0.65)',
                            transformOrigin: 'top left'
                        }}>
                            <SuratKeteranganTemplate
                                ref={suratRef}
                                studentName={surat.studentName}
                                nomorSurat={surat.nomor_surat}
                                university={surat.university}
                                major={surat.major || '-'}
                                nim={surat.nim || '-'}
                                perangkatDaerah={surat.perangkat_daerah || '-'}
                                startDate={surat.tanggal_mulai}
                                endDate={surat.tanggal_selesai}
                                kepalaName={surat.kepala_name}
                                kepalaNip={surat.kepala_nip}
                                instansi={surat.instansi}
                                jabatanKepala={surat.jabatan_kepala}
                                headerNamaInstansi={(() => { const pd = perangkatDaerahData.find(p => p.nama === surat.perangkat_daerah); return pd ? pd.nama.toUpperCase() : (surat.instansi || 'BADAN RISET DAN INOVASI DAERAH').toUpperCase(); })()}
                                headerAlamat={(() => { const pd = perangkatDaerahData.find(p => p.nama === surat.perangkat_daerah); return pd ? pd.alamat : 'Jl. Jaksa Agung Suprapto No. 6 – 8 Surabaya 60272'; })()}
                                headerTelp={(() => { const pd = perangkatDaerahData.find(p => p.nama === surat.perangkat_daerah); return pd ? pd.telp : '(031) 5347182'; })()}
                                headerEmail={(() => { const pd = perangkatDaerahData.find(p => p.nama === surat.perangkat_daerah); return pd ? pd.email : 'brida@surabaya.go.id'; })()}
                                bidang={surat.bidang || ''}
                                fokusKegiatan={surat.fokus_kegiatan || []}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-100 flex justify-end gap-3">
                    <button onClick={handleClose}
                        className="px-5 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        Tutup
                    </button>
                    <button onClick={handlePrintPdf} disabled={isPrinting}
                        className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-600 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span className="material-symbols-outlined notranslate text-[18px]">{isPrinting ? 'hourglass_empty' : 'print'}</span>
                        {isPrinting ? 'Memproses...' : 'Cetak / Simpan PDF'}
                    </button>
                </div>
            </div>
        </div>
        </ModalPortal>
    );
};

export default SuratKeteranganPreviewModal;

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ModalPortal from '../ModalPortal';
import CertificateTemplate from './CertificateTemplate';
import Swal from 'sweetalert2';

const CertificatePreviewModal = ({ isOpen, onClose, certificate }) => {
    const certificateRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    if (!isOpen || !certificate) return null;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    };

    const handleDownloadPdf = async () => {
        setIsDownloading(true);
        const studentName = certificate?.studentName || 'Mahasiswa';
        const fileName = `Sertifikat_${studentName.replace(/\s+/g, '_')}_${certificate.nomor_sertifikat.replace(/\//g, '-')}`;

        try {
            // Get the source element HTML with all inline styles
            const sourceElement = certificateRef.current;
            if (!sourceElement) {
                Swal.fire({
                    icon: 'error',
                    title: 'Kesalahan',
                    text: 'Element sertifikat tidak ditemukan.',
                    confirmButtonColor: '#2563eb'
                });
                setIsDownloading(false);
                return;
            }

            // Get all images and convert to base64 data URIs for the print window
            const images = sourceElement.querySelectorAll('img');
            const imageDataMap = new Map();

            for (const img of images) {
                if (img.src && img.complete && img.naturalWidth > 0) {
                    try {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.naturalWidth;
                        canvas.height = img.naturalHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        imageDataMap.set(img.src, canvas.toDataURL('image/png'));
                    } catch (e) {
                        // CORS issue, keep original src
                        console.warn('Could not inline image:', img.src);
                    }
                }
            }

            // Clone and replace image srcs with base64
            const clone = sourceElement.cloneNode(true);
            const cloneImages = clone.querySelectorAll('img');
            for (const img of cloneImages) {
                const dataUri = imageDataMap.get(img.src);
                if (dataUri) {
                    img.src = dataUri;
                }
            }

            const htmlContent = clone.outerHTML;

            // Open a new window with the certificate for printing
            const printWindow = window.open('', '_blank', 'width=1123,height=794');
            if (!printWindow) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Popup Diblokir',
                    text: 'Popup diblokir oleh browser. Izinkan popup untuk mengunduh sertifikat.',
                    confirmButtonColor: '#2563eb'
                });
                setIsDownloading(false);
                return;
            }

            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${fileName}</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap" rel="stylesheet" />
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { margin: 0; padding: 0; background: #fff; }
                        @page {
                            size: 1123px 794px landscape;
                            margin: 0;
                        }
                        @media print {
                            body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                        }
                    </style>
                </head>
                <body>
                    ${htmlContent}
                    <script>
                        // Wait for fonts and images to load, then trigger print
                        document.fonts.ready.then(() => {
                            setTimeout(() => {
                                window.print();
                            }, 800);
                        });
                    </script>
                </body>
                </html>
            `);
            printWindow.document.close();
        } catch (error) {
            console.error("Error generating PDF:", error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Gagal membuat PDF. Silakan coba lagi.',
                confirmButtonColor: '#2563eb'
            });
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <ModalPortal>
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 ${isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter'}`}>
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col p-6 ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Preview Sertifikat: {certificate.studentName}</h3>
                    <button onClick={handleClose} className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 shadow-sm transition-colors">
                        <span className="material-symbols-outlined notranslate leading-none">close</span>
                    </button>
                </div>

                <div className="bg-slate-100 p-6 flex flex-col items-center justify-center relative overflow-hidden rounded-xl border border-slate-200">
                    {/* Preview Container (scaled down for display) */}
                    <div className="relative shadow-xl mx-auto overflow-hidden bg-white"
                        style={{ width: `${1123 * 0.55}px`, height: `${794 * 0.55}px` }}>
                        <div style={{ width: '1123px', height: '794px', transform: 'scale(0.55)', transformOrigin: 'top left' }}>
                            <CertificateTemplate
                                ref={certificateRef}
                                studentName={certificate.studentName}
                                certificateId={certificate.nomor_sertifikat}
                                startDate={certificate.tanggal_mulai}
                                endDate={certificate.tanggal_selesai}
                                nilaiAkhir={certificate.nilai_akhir}
                                kepalaName={certificate.kepala_name}
                                kepalaNip={certificate.kepala_nip}
                                instansi={certificate.instansi}
                                jabatanKepala={certificate.jabatan_kepala}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={handleClose}
                        className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                    >
                        Tutup
                    </button>
                    <button
                        onClick={handleDownloadPdf}
                        disabled={isDownloading}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-white ${isDownloading ? 'bg-slate-400 cursor-not-allowed shadow-none' : 'bg-primary hover:bg-blue-700 shadow-blue-200'}`}
                    >
                        {isDownloading ? (
                            <><span className="material-symbols-outlined notranslate animate-spin">progress_activity</span> Memproses...</>
                        ) : (
                            <><span className="material-symbols-outlined notranslate">print</span> Cetak / Simpan PDF</>
                        )}
                    </button>
                </div>

                <p className="mt-3 text-xs text-slate-400 text-center">
                    💡 Pada dialog cetak, pilih <strong>"Save as PDF"</strong> / <strong>"Microsoft Print to PDF"</strong> sebagai printer untuk menyimpan sebagai file PDF.
                </p>
            </div>
        </div>
        </ModalPortal>
    );
};

export default CertificatePreviewModal;

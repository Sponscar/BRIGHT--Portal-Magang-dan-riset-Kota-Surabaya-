import { useState } from 'react';
import ModalPortal from '../ModalPortal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const LogbookDetailModal = ({ isOpen, entry, getStatusBadge, onClose, onAction }) => {
    const [isClosing, setIsClosing] = useState(false);

    if (!isOpen || !entry) return null;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    };

    return (
        <ModalPortal>
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 ${isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter'}`}>
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Detail Logbook</h3>
                        {entry.studentName && entry.university ? (
                            <p className="text-sm text-slate-500">{entry.studentName} - {entry.university}</p>
                        ) : (
                            <p className="text-sm text-slate-500">Logbook Saya</p>
                        )}
                    </div>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <p className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5 mb-2">
                                    <span className="material-symbols-outlined notranslate text-[16px]">calendar_today</span>
                                    Tanggal & Waktu
                                </p>
                                <p className="text-sm font-medium text-slate-900">{entry.date || entry.tanggal}</p>
                                {(entry.jamMulai || entry.jamSelesai) && (
                                    <p className="text-xs text-slate-500 mt-1">
                                        {entry.jamMulai || '-'} - {entry.jamSelesai || '-'} WIB
                                        {entry.jamMulai && entry.jamSelesai && (() => {
                                            const [h1, m1] = entry.jamMulai.split(':').map(Number);
                                            const [h2, m2] = entry.jamSelesai.split(':').map(Number);
                                            const diff = (h2 * 60 + m2) - (h1 * 60 + m1);
                                            if (diff <= 0) return '';
                                            const hours = Math.floor(diff / 60);
                                            const minutes = diff % 60;
                                            return ` (${hours} jam${minutes > 0 ? ` ${minutes} menit` : ''})`;
                                        })()}
                                    </p>
                                )}
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <p className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5 mb-2">
                                    <span className="material-symbols-outlined notranslate text-[16px]">assignment</span>
                                    Jenis Penugasan
                                </p>
                                <p className="text-sm font-medium text-slate-900">{entry.category || entry.jenisKegiatan || '-'}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <p className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5 mb-2">
                                    <span className="material-symbols-outlined notranslate text-[16px]">category</span>
                                    Jenis Data
                                </p>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-slate-900">{entry.type}</span>
                                    <span className="text-xs text-slate-500">{entry.activityType || entry.jenisKegiatan}</span>
                                </div>
                            </div>
                        </div>

                        {entry.type === 'Laporan Harian' && (entry.lokasiNama || entry.lokasiLat) && (
                            <div>
                                <p className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined notranslate text-primary text-[20px]">location_on</span>
                                    Lokasi Kegiatan
                                </p>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <p className="text-sm font-medium text-slate-900 mb-3">{entry.lokasiNama || 'Lokasi Kustom'}</p>

                                    {entry.lokasiLat && entry.lokasiLng && (
                                        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: '200px' }}>
                                            <MapContainer
                                                center={[entry.lokasiLat, entry.lokasiLng]}
                                                zoom={15}
                                                style={{ height: '100%', width: '100%' }}
                                                scrollWheelZoom={false}
                                            >
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Marker position={[entry.lokasiLat, entry.lokasiLng]}>
                                                    <Popup>
                                                        <div className="text-sm font-medium">
                                                            {entry.lokasiNama || 'Lokasi'}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            {entry.lokasiLat}, {entry.lokasiLng}
                                                        </div>
                                                    </Popup>
                                                </Marker>
                                            </MapContainer>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div>
                            <p className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined notranslate text-primary text-[20px]">description</span>
                                Deskripsi Aktivitas
                            </p>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                                {entry.activity || entry.deskripsi}
                            </div>
                        </div>

                        {entry.type === 'Laporan Harian' && (
                            <div>
                                <p className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined notranslate text-primary text-[20px]">school</span>
                                    Apa yang Dikerjakan/Didapat/Dipahami
                                </p>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                                    {entry.pembelajaran || '-'}
                                </div>
                            </div>
                        )}

                        <div>
                            <p className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined notranslate text-primary text-[20px]">attachment</span>
                                Bukti Pendukung
                            </p>
                            {entry.document ? (
                                <a
                                    href={entry.document}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-primary/50 hover:shadow-sm transition-all group"
                                >
                                    <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined notranslate">picture_as_pdf</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 group-hover:text-primary transition-colors">Dokumen Logbook.pdf</p>
                                        <p className="text-xs text-slate-500">Klik untuk melihat dokumen lengkap</p>
                                    </div>
                                </a>
                            ) : (
                                <div className="p-4 bg-slate-50 border border-slate-200 border-dashed rounded-lg text-center text-sm text-slate-500 italic">
                                    Tidak ada dokumen yang dilampirkan
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <p className="text-sm font-bold text-slate-900 mb-2">Status</p>
                            <div className="flex items-center gap-2">
                                {getStatusBadge(entry.status)}
                                {entry.status === 'rejected' && (
                                    <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                                        Alasan: Dokumentasi kurang lengkap.
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-row-reverse justify-between items-center shrink-0">
                    <div className="flex gap-3">
                        {entry.status === 'pending' && onAction && (
                            <>
                                <button
                                    onClick={() => {
                                        handleClose();
                                        setTimeout(() => onAction(entry, 'reject'), 260);
                                    }}
                                    className="px-4 py-2 border border-blue-200 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                                >
                                    Tolak
                                </button>
                                <button
                                    onClick={() => {
                                        handleClose();
                                        setTimeout(() => onAction(entry, 'approve'), 260);
                                    }}
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all duration-300 shadow-sm shadow-emerald-200 hover:-translate-y-0.5 active:scale-95"
                                >
                                    Setujui Logbook
                                </button>
                            </>
                        )}
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </ModalPortal>
    );
};

export default LogbookDetailModal;

import React, { useRef } from 'react';

const ResultsCard = ({ uploadedReport, onFileChange, onRemoveFile, onSubmit, onCancel }) => {
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="w-full">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="material-symbols-outlined notranslate text-primary">description</span>
                            LAPORAN AKHIR ATAU JURNAL
                        </h2>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Wajib Diisi</span>
                    </div>
                    <p className="text-sm text-gray-500 max-w-md md:text-right">
                        Silakan unggah laporan akhir atau jurnal magang Anda dalam format PDF untuk melengkapi administrasi.
                    </p>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={onFileChange}
                    className="hidden"
                />

                {!uploadedReport ? (
                    <div
                        onClick={handleUploadClick}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center bg-[#f8f6f6] hover:bg-gray-50 hover:border-primary/50 transition-all cursor-pointer group"
                    >
                        <div className="h-16 w-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined notranslate text-primary text-3xl">cloud_upload</span>
                        </div>
                        <div className="text-center">
                            <p className="text-base font-medium text-gray-700">Klik untuk unggah atau drag & drop</p>
                            <p className="text-xs text-gray-400 mt-2">PDF max 5MB (Format Penamaan: LAPORAN_AKHIR_NAMA_LENGKAP.pdf)</p>
                        </div>
                    </div>
                ) : (
                    <div className="border border-gray-200 rounded-xl p-4 bg-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-primary">
                                    <span className="material-symbols-outlined notranslate text-[28px]">picture_as_pdf</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 truncate max-w-[300px]">{uploadedReport.name}</p>
                                    <p className="text-xs text-gray-500">{formatFileSize(uploadedReport.size)}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={onRemoveFile}
                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <span className="material-symbols-outlined notranslate text-[20px]">close</span>
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-5 border-t border-gray-100 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={onSubmit}
                        className="px-5 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-[#d41111] transition-all shadow-md shadow-blue-200/50 flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined notranslate text-[16px]">save</span>
                        Simpan Laporan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultsCard;

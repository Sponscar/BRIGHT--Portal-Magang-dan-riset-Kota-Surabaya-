import React from 'react';

const CertificateCard = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined notranslate text-primary">workspace_premium</span>
                SERTIFIKAT
            </h2>

            {/* Certificate Preview */}
            <div className="relative aspect-[1.414/1] bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden mb-4 opacity-50 grayscale shrink-0">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gray-100 p-4">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"></div>
                    <div className="w-12 h-12 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                        <span className="material-symbols-outlined notranslate text-gray-400 text-[24px]">person</span>
                    </div>
                    <h4 className="text-sm text-gray-400 font-bold mb-1">Nama Lengkap</h4>
                    <p className="text-xs text-gray-400 leading-tight">Sertifikat belum diterbitkan.</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <span className="material-symbols-outlined notranslate text-gray-400 text-4xl">lock</span>
                </div>
            </div>

            <div className="mt-auto space-y-4">
                <button
                    disabled
                    className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-400 font-medium py-3 px-4 rounded-lg cursor-not-allowed text-sm"
                >
                    <span className="material-symbols-outlined notranslate text-lg">download</span>
                    Unduh PDF
                </button>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined notranslate text-orange-500 text-lg">info</span>
                        <p className="text-[10px] text-orange-700 leading-tight">
                            Sertifikat tersedia setelah penilaian selesai oleh mentor.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateCard;

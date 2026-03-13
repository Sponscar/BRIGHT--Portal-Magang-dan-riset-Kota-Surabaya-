import React from 'react';

const AgreementModal = ({ isOpen, onClose, onAgree }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="bg-primary px-6 py-4 flex items-center justify-between">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        <span className="material-symbols-outlined notranslate text-[24px]">gavel</span>
                        Pernyataan Kesediaan Magang / Riset di Seluruh Perangkat Daerah Kota Surabaya
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined notranslate">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                    <p>
                        Dengan ini saya menyatakan bersedia mengikuti seluruh rangkaian kegiatan magang / riset di seluruh perangkat daerah kota surabaya. Saya juga berkomitmen untuk bekerja sama dengan seluruh tim perangkat daerah kota surabaya, serta mematuhi seluruh peraturan, waktu, dan jadwal kegiatan yang telah ditetapkan dan disepakati selama pelaksanaan program magang.
                    </p>
                    <p>
                        Dengan menyetujui pernyataan ini, saya memahami dan bersedia menjalankan kewajiban sebagai peserta magang / riset secara bertanggung jawab, disiplin, dan profesional.
                    </p>
                </div>

                {/* Actions */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg bg-white text-primary border border-primary font-bold shadow-sm hover:bg-primary hover:text-white hover:shadow-md transition-all"
                    >
                        Saya Tidak Menyetujui
                    </button>
                    <button
                        onClick={onAgree}
                        className="px-6 py-2.5 rounded-lg bg-white text-primary border border-primary font-bold shadow-sm hover:bg-green-600 hover:text-white hover:border-transparent hover:shadow-md transition-all"
                    >
                        Saya Menyetujui
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgreementModal;

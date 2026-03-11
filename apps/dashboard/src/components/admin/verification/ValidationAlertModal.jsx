import React from 'react';

const ValidationAlertModal = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="bg-amber-500 px-6 py-4 flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
                        <span className="material-symbols-outlined notranslate text-amber-500 text-3xl">warning</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mt-2">
                        Peringatan Validasi
                    </h3>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 text-center text-slate-700 leading-relaxed text-base">
                    <p>{message}</p>
                </div>

                {/* Actions */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-2.5 rounded-lg bg-amber-500 text-white font-bold shadow-md hover:bg-amber-600 hover:shadow-lg transition-all w-full"
                    >
                        Mengerti
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ValidationAlertModal;

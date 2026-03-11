import React from 'react';

const LogbookModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
                <div className="border-b border-[#f3e7e7] px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined notranslate text-primary">
                            edit_document
                        </span>
                        <h3 className="text-lg font-bold text-[#1b0d0d]">
                            {title}
                        </h3>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                        <span className="material-symbols-outlined notranslate text-[20px]">close</span>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default LogbookModal;

import React, { useState } from 'react';

const LogbookModal = ({ isOpen, onClose, onCloseStart, title, children }) => {
    const [isClosing, setIsClosing] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        setIsClosing(true);
        if (onCloseStart) onCloseStart();
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm ${isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter'}`}>
            <div className={`bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>
                <div className="border-b border-[#f3e7e7] px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined notranslate text-primary">
                            edit_document
                        </span>
                        <h3 className="text-lg font-bold text-[#1b0d0d]">
                            {title}
                        </h3>
                    </div>
                    <button onClick={handleClose} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                        <span className="material-symbols-outlined notranslate text-[20px]">close</span>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default LogbookModal;

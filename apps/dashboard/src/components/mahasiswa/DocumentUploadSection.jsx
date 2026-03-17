import { useState, useRef } from 'react';
import Swal from 'sweetalert2';

const DocumentUploadCard = ({ id, icon, title, description, file, onFileChange }) => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validation: PDF only, max 2MB
            if (selectedFile.type !== 'application/pdf') {
                Swal.fire({
                    icon: 'error',
                    title: 'Format Tidak Didukung',
                    text: 'Hanya file PDF yang diperbolehkan.',
                    confirmButtonColor: '#ef4444',
                    customClass: {
                        popup: 'validator-popup'
                    },
                    backdrop: `rgba(0,0,0,0.4) backdrop-filter: blur(4px)`
                });
                return;
            }
            if (selectedFile.size > 2 * 1024 * 1024) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ukuran Terlalu Besar',
                    text: 'Ukuran file maksimal 2MB.',
                    confirmButtonColor: '#ef4444',
                    customClass: {
                        popup: 'validator-popup'
                    },
                    backdrop: `rgba(0,0,0,0.4) backdrop-filter: blur(4px)`
                });
                return;
            }
            onFileChange(id, selectedFile);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border transition-all ${file ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-50/50 border-slate-100 hover:border-slate-200'}`}>
            <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${file ? 'bg-blue-100 text-blue-600' : 'bg-blue-50 text-primary'}`}>
                    <span className="material-symbols-outlined notranslate">{file ? 'description' : icon}</span>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-[#0d141b]">{title}</p>
                    {file ? (
                        <div className="flex flex-col">
                            <p className="text-xs font-medium text-blue-600 truncate max-w-[200px] md:max-w-xs">{file.name}</p>
                            <p className="text-[10px] text-slate-500">{formatFileSize(file.size)} • PDF</p>
                        </div>
                    ) : (
                        <p className="text-[11px] text-[#4c739a]">{description}</p>
                    )}
                </div>
            </div>
            <div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="application/pdf"
                    className="hidden"
                />
                {!file ? (
                    <button
                        onClick={handleButtonClick}
                        className="w-full md:w-auto px-4 py-2 text-xs font-bold text-white bg-primary rounded-lg hover:bg-primary-hover shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined notranslate text-[16px]">upload</span>
                        Unggah Dokumen
                    </button>
                ) : (
                    <button
                        onClick={handleButtonClick}
                        className="w-full md:w-auto px-4 py-2 text-xs font-bold text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined notranslate text-[16px]">change_circle</span>
                        Ganti File
                    </button>
                )}
            </div>
        </div>
    );
};

const DocumentUploadSection = ({ onSave }) => {
    const [documents, setDocuments] = useState({
        cv: null,
        letter: null,
        proposal: null
    });

    const handleFileChange = (id, file) => {
        setDocuments(prev => ({
            ...prev,
            [id]: file
        }));
    };

    const handleSaveExample = () => {
        // Log files or send to API
        console.log('Documents to save:', documents);
        if (onSave) onSave();
    };

    return (
        <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                    <span className="material-symbols-outlined notranslate text-primary text-[20px] fill">inventory_2</span>
                    <h3 className="text-sm font-bold text-[#0d141b] uppercase tracking-wider">Dokumen Wajib</h3>
                </div>
                <div className="flex flex-col gap-4">
                    <DocumentUploadCard
                        id="cv"
                        icon="person_outline"
                        title="Curriculum Vitae (CV)"
                        description="File PDF, Maksimal 2MB"
                        file={documents.cv}
                        onFileChange={handleFileChange}
                    />
                    <DocumentUploadCard
                        id="letter"
                        icon="forward_to_inbox"
                        title="Surat Pengantar"
                        description="File PDF dari Universitas, Maksimal 2MB"
                        file={documents.letter}
                        onFileChange={handleFileChange}
                    />
                    <DocumentUploadCard
                        id="proposal"
                        icon="article"
                        title="Draft Proposal"
                        description="Rencana kegiatan magang, Maksimal 2MB"
                        file={documents.proposal}
                        onFileChange={handleFileChange}
                    />
                </div>
            </div>
            <div className="bg-slate-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100">
                <p className="text-[11px] font-medium text-[#4c739a]">Pastikan data yang diunggah sudah benar. Hubungi admin jika terdapat kendala.</p>
                <button
                    onClick={handleSaveExample}
                    className="w-full sm:w-auto px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-100 hover:bg-primary-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Simpan Semua Dokumen <span className="material-symbols-outlined notranslate text-[18px]">done_all</span>
                </button>
            </div>
        </div>
    );
};

export default DocumentUploadSection;

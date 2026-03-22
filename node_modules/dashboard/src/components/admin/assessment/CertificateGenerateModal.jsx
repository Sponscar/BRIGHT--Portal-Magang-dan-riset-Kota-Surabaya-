import React, { useRef, useState, useEffect } from 'react';
import CertificateTemplate from './CertificateTemplate';
import Swal from 'sweetalert2';
import ModalPortal from '../ModalPortal';
import { perangkatDaerah } from '../../../data/perangkatDaerah';

const CertificateGenerateModal = ({
    isOpen, onClose,
    certForm, setCertForm,
    studentList, certificates,
    handleSaveCert
}) => {
    const certificateRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const dropdownRef = useRef(null);
    const [isInstansiDropdownOpen, setIsInstansiDropdownOpen] = useState(false);
    const instansiRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
            if (instansiRef.current && !instansiRef.current.contains(e.target)) {
                setIsInstansiDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!isOpen) return null;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 250);
    };

    // Get selected student data for preview
    const selectedStudent = studentList.find(s => s.id === certForm.mahasiswa_id);

    // Filter available students (exclude those who already have certificates)
    const availableStudents = studentList.filter(s => !certificates.some(c => c.mahasiswa_id === s.id));

    // Filter by search term
    const filteredStudents = availableStudents.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.university.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredInstansi = perangkatDaerah.filter(pd => 
        pd.toLowerCase().includes((certForm.instansi || '').toLowerCase())
    );

    // Dynamic start and end date for the template
    const startDate = certForm.tanggal_mulai;
    const endDate = certForm.tanggal_selesai;

    const handleSelectStudent = (student) => {
        const autoUID = `BRIDA-CERT-${student.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
        setCertForm({ ...certForm, mahasiswa_id: student.id, nomor_sertifikat: autoUID });
        setSearchTerm('');
        setIsDropdownOpen(false);
    };

    const handleClearStudent = () => {
        setCertForm({ ...certForm, mahasiswa_id: '', nomor_sertifikat: '' });
        setSearchTerm('');
    };

    const handleGeneratePdf = async (e) => {
        e.preventDefault();

        if (!certForm.mahasiswa_id || !certForm.nomor_sertifikat || !certForm.tanggal_mulai || !certForm.tanggal_selesai) {
            Swal.fire({
                icon: 'warning',
                title: 'Formulir Belum Lengkap',
                text: 'Harap lengkapi formulir terlebih dahulu.',
                confirmButtonColor: '#2563eb'
            });
            return;
        }

        const studentName = selectedStudent?.name || 'Mahasiswa';
        const todayStr = new Date().toISOString().split('T')[0];
        const fileName = `Sertifikat_${studentName.replace(/\s+/g, '_')}_${todayStr}.pdf`;

        // Only save the data, no PDF generation here
        handleSaveCert({
            ...certForm,
            tanggal_terbit: todayStr,
            file: { name: fileName, size: 500000 } // Dummy file object placeholder
        });
    };

    return (
        <ModalPortal>
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 ${isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter'}`}>
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>

                {/* Left Side: Form */}
                <div className="w-full md:w-1/3 p-6 border-r border-slate-100 flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Terbitkan Sertifikat</h3>
                        <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors md:hidden">
                            <span className="material-symbols-outlined notranslate">close</span>
                        </button>
                    </div>

                    <div className="space-y-4 flex-1">
                        {/* Searchable Student Dropdown */}
                        <div ref={dropdownRef} className="relative">
                            <label className="block text-sm font-bold text-slate-900 mb-1">Pilih Mahasiswa</label>

                            {/* Selected Student Display */}
                            {certForm.mahasiswa_id && selectedStudent ? (
                                <div className="w-full px-4 py-2 border border-primary/30 bg-primary/5 rounded-lg text-sm flex items-center justify-between gap-2">
                                    <div className="truncate">
                                        <span className="font-semibold text-slate-800">{selectedStudent.name}</span>
                                        <span className="text-slate-500"> — {selectedStudent.university}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleClearStudent}
                                        className="text-slate-400 hover:text-blue-500 transition-colors shrink-0"
                                    >
                                        <span className="material-symbols-outlined notranslate text-[18px]">close</span>
                                    </button>
                                </div>
                            ) : (
                                /* Search Input */
                                <div className="relative">
                                    <span className="material-symbols-outlined notranslate absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                                    <input
                                        type="text"
                                        placeholder="Cari nama atau universitas..."
                                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setIsDropdownOpen(true);
                                        }}
                                        onFocus={() => setIsDropdownOpen(true)}
                                    />
                                </div>
                            )}

                            {/* Dropdown List */}
                            {isDropdownOpen && !certForm.mahasiswa_id && (
                                <div className="absolute z-10 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map(s => (
                                            <button
                                                key={s.id}
                                                type="button"
                                                className="w-full text-left px-4 py-2.5 hover:bg-primary/5 transition-colors text-sm border-b border-slate-50 last:border-b-0"
                                                onClick={() => handleSelectStudent(s)}
                                            >
                                                <span className="font-semibold text-slate-800">{s.name}</span>
                                                <span className="text-slate-400 text-xs ml-1">— {s.university}</span>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-3 text-sm text-slate-400 text-center">
                                            {searchTerm ? 'Tidak ada mahasiswa yang cocok' : 'Tidak ada mahasiswa tersedia'}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-1">Nomor Sertifikat (UID)</label>
                            <input
                                type="text" readOnly
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 text-sm font-mono cursor-not-allowed"
                                placeholder="(Otomatis dibuat saat memilih mahasiswa)"
                                value={certForm.nomor_sertifikat}
                            />
                            <p className="text-xs text-slate-500 mt-1">UID akan menjadi identifier unik di pojok kanan atas sertifikat.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-1">Masa Mulai</label>
                                <input
                                    type="date" required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                    value={certForm.tanggal_mulai || ''}
                                    onChange={(e) => setCertForm({ ...certForm, tanggal_mulai: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-1">Masa Selesai</label>
                                <input
                                    type="date" required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                    value={certForm.tanggal_selesai || ''}
                                    onChange={(e) => setCertForm({ ...certForm, tanggal_selesai: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-1">Nilai Akhir</label>
                            <input
                                type="number" min="0" max="100" step="0.01"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                placeholder="Contoh: 85.65"
                                value={certForm.nilai_akhir || ''}
                                onChange={(e) => setCertForm({ ...certForm, nilai_akhir: e.target.value })}
                            />
                        </div>

                        {/* Instansi/Lembaga Section */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-4 space-y-3">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detail Instansi & Pejabat</p>
                            <div className="relative" ref={instansiRef}>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Instansi</label>
                                <div className="relative">
                                    <input type="text"
                                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm bg-white pr-8"
                                        placeholder="Cari instansi..."
                                        value={certForm.instansi || ''}
                                        onChange={(e) => { setCertForm({ ...certForm, instansi: e.target.value }); setIsInstansiDropdownOpen(true); }}
                                        onFocus={() => setIsInstansiDropdownOpen(true)}
                                    />
                                    <span className="material-symbols-outlined notranslate absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                                        {isInstansiDropdownOpen ? 'expand_less' : 'expand_more'}
                                    </span>
                                </div>
                                {isInstansiDropdownOpen && (
                                    <div className="absolute z-10 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                        {filteredInstansi.length > 0 ? filteredInstansi.map((pd, index) => (
                                            <button key={index} type="button"
                                                className="w-full text-left px-3 py-2 hover:bg-primary/5 transition-colors text-sm border-b border-slate-50 last:border-b-0 truncate"
                                                onClick={() => { setCertForm({ ...certForm, instansi: pd }); setIsInstansiDropdownOpen(false); }}>
                                                {pd}
                                            </button>
                                        )) : (
                                            <div className="px-4 py-3 text-sm text-slate-400 text-center">Tidak ada kecocokan</div>
                                        )}
                                        <button type="button"
                                            className="w-full text-left px-3 py-2 hover:bg-primary/5 transition-colors text-sm border-t border-slate-100 font-semibold text-blue-600 truncate bg-slate-50"
                                            onClick={() => { setCertForm({ ...certForm, instansi: "Badan Riset dan Inovasi Daerah" }); setIsInstansiDropdownOpen(false); }}>
                                            Badan Riset dan Inovasi Daerah
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jabatan Penandatangan</label>
                                <input type="text"
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                    placeholder="Kepala Badan"
                                    value={certForm.jabatan_kepala || ''}
                                    onChange={(e) => setCertForm({ ...certForm, jabatan_kepala: e.target.value })}
                                />
                            </div>
                            <div className="pt-2 border-t border-slate-200">
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pejabat</label>
                                <input type="text"
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                    placeholder="Dr. Agus Imam Sonhaji, S.T, M.MT."
                                    value={certForm.kepala_name || ''}
                                    onChange={(e) => setCertForm({ ...certForm, kepala_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">NIP Pejabat</label>
                                <input type="text"
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                    placeholder="197010231996021001"
                                    value={certForm.kepala_nip || ''}
                                    onChange={(e) => setCertForm({ ...certForm, kepala_nip: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-slate-100 flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={handleGeneratePdf}
                            disabled={!certForm.mahasiswa_id || !certForm.nomor_sertifikat || !certForm.tanggal_mulai || !certForm.tanggal_selesai}
                            className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${!certForm.mahasiswa_id || !certForm.nomor_sertifikat || !certForm.tanggal_mulai || !certForm.tanggal_selesai
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                : 'bg-primary text-white hover:bg-blue-700 shadow-blue-200'
                                }`}
                        >
                            <span className="material-symbols-outlined notranslate">workspace_premium</span>
                            Terbitkan Sertifikat
                        </button>
                        <button
                            type="button" onClick={handleClose}
                            className="w-full py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                        >
                            Batal
                        </button>
                    </div>
                </div>

                {/* Right Side: Live Preview */}
                <div className="w-full md:w-2/3 bg-slate-100 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-4 right-4 hidden md:block">
                        <button onClick={handleClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm transition-colors">
                            <span className="material-symbols-outlined notranslate leading-none">close</span>
                        </button>
                    </div>

                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Live Preview Sertifikat</h4>

                    {/* Preview Container: Properly scaled down without cutting off content */}
                    <div className="relative shadow-xl mx-auto overflow-hidden bg-white"
                        style={{
                            width: `${1123 * 0.45}px`,
                            height: `${794 * 0.45}px`
                        }}>
                        <div style={{
                            width: '1123px', height: '794px',
                            transform: 'scale(0.45)',
                            transformOrigin: 'top left'
                        }}>
                            <CertificateTemplate
                                ref={certificateRef}
                                studentName={selectedStudent?.name}
                                certificateId={certForm.nomor_sertifikat}
                                startDate={startDate}
                                endDate={endDate}
                                nilaiAkhir={certForm.nilai_akhir}
                                kepalaName={certForm.kepala_name}
                                kepalaNip={certForm.kepala_nip}
                                instansi={certForm.instansi || 'Badan Riset dan Inovasi Daerah'}
                                jabatanKepala={certForm.jabatan_kepala || 'Kepala Badan'}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </ModalPortal>
    );
};

export default CertificateGenerateModal;

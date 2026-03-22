import React, { useRef, useState, useEffect, useCallback } from 'react';
import SuratKeteranganTemplate from './SuratKeteranganTemplate';
import Swal from 'sweetalert2';
import ModalPortal from '../ModalPortal';
import { perangkatDaerah, perangkatDaerahData } from '../../../data/perangkatDaerah';

const SuratKeteranganGenerateModal = ({
    isOpen, onClose,
    suratForm, setSuratForm,
    studentList, suratList,
    handleSaveSurat
}) => {
    const suratRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const dropdownRef = useRef(null);
    const [isPerangkatDropdownOpen, setIsPerangkatDropdownOpen] = useState(false);
    const perangkatRef = useRef(null);
    const [isInstansiDropdownOpen, setIsInstansiDropdownOpen] = useState(false);
    const instansiRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
            if (perangkatRef.current && !perangkatRef.current.contains(e.target)) {
                setIsPerangkatDropdownOpen(false);
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

    const selectedStudent = studentList.find(s => s.id === suratForm.mahasiswa_id);
    const availableStudents = studentList.filter(s => !suratList.some(sk => sk.mahasiswa_id === s.id));
    const filteredStudents = availableStudents.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.university.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPerangkat = perangkatDaerah.filter(pd => 
        pd.toLowerCase().includes((suratForm.perangkat_daerah || '').toLowerCase())
    );

    const filteredInstansi = perangkatDaerah.filter(pd => 
        pd.toLowerCase().includes((suratForm.instansi || '').toLowerCase())
    );

    const handleSelectStudent = (student) => {
        const autoNomor = `${String(suratList.length + 1).padStart(3, '0')}/BRIDA/SK-MG/${new Date().getFullYear()}`;
        setSuratForm({ ...suratForm, mahasiswa_id: student.id, nomor_surat: autoNomor, nim: student.nim || '-' });
        setSearchTerm('');
        setIsDropdownOpen(false);
    };

    const handleClearStudent = () => {
        setSuratForm({ ...suratForm, mahasiswa_id: '', nomor_surat: '', nim: '' });
        setSearchTerm('');
    };

    const handleGenerate = (e) => {
        e.preventDefault();
        if (!suratForm.mahasiswa_id || !suratForm.nomor_surat || !suratForm.tanggal_mulai || !suratForm.tanggal_selesai) {
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
        const fileName = `SK_${studentName.replace(/\s+/g, '_')}_${todayStr}.pdf`;

        handleSaveSurat({
            ...suratForm,
            tanggal_terbit: todayStr,
            file: { name: fileName, size: 350000 }
        });
    };

    return (
        <ModalPortal>
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 ${isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter'}`}>
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] ${isClosing ? 'modal-content-exit' : 'modal-content-enter'}`}>

                {/* Left Side: Form */}
                <div className="w-full md:w-1/3 p-6 border-r border-slate-100 flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Terbitkan Surat Keterangan Lulus</h3>
                        <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors md:hidden">
                            <span className="material-symbols-outlined notranslate">close</span>
                        </button>
                    </div>

                    <div className="space-y-4 flex-1">
                        {/* Searchable Student Dropdown */}
                        <div ref={dropdownRef} className="relative">
                            <label className="block text-sm font-bold text-slate-900 mb-1">Pilih Mahasiswa</label>
                            {suratForm.mahasiswa_id && selectedStudent ? (
                                <div className="w-full px-4 py-2 border border-primary/30 bg-primary/5 rounded-lg text-sm flex items-center justify-between gap-2">
                                    <div className="truncate">
                                        <span className="font-semibold text-slate-800">{selectedStudent.name}</span>
                                        <span className="text-slate-500"> — {selectedStudent.university}</span>
                                    </div>
                                    <button type="button" onClick={handleClearStudent} className="text-slate-400 hover:text-blue-500 transition-colors shrink-0">
                                        <span className="material-symbols-outlined notranslate text-[18px]">close</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="relative">
                                    <span className="material-symbols-outlined notranslate absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                                    <input type="text" placeholder="Cari nama atau universitas..."
                                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                        value={searchTerm}
                                        onChange={(e) => { setSearchTerm(e.target.value); setIsDropdownOpen(true); }}
                                        onFocus={() => setIsDropdownOpen(true)}
                                    />
                                </div>
                            )}
                            {isDropdownOpen && !suratForm.mahasiswa_id && (
                                <div className="absolute z-10 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                    {filteredStudents.length > 0 ? filteredStudents.map(s => (
                                        <button key={s.id} type="button"
                                            className="w-full text-left px-4 py-2.5 hover:bg-primary/5 transition-colors text-sm border-b border-slate-50 last:border-b-0"
                                            onClick={() => handleSelectStudent(s)}>
                                            <span className="font-semibold text-slate-800">{s.name}</span>
                                            <span className="text-slate-400 text-xs ml-1">— {s.university}</span>
                                        </button>
                                    )) : (
                                        <div className="px-4 py-3 text-sm text-slate-400 text-center">
                                            {searchTerm ? 'Tidak ada mahasiswa yang cocok' : 'Tidak ada mahasiswa tersedia'}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-1">Nomor Surat</label>
                            <input type="text" readOnly
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 text-sm font-mono cursor-not-allowed"
                                placeholder="(Otomatis saat memilih mahasiswa)"
                                value={suratForm.nomor_surat}
                            />
                        </div>

                        <div className="relative" ref={perangkatRef}>
                            <label className="block text-sm font-bold text-slate-900 mb-1">Perangkat Daerah / Lokus</label>
                            <div className="relative">
                                <input type="text"
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm bg-white pr-8"
                                    placeholder="Cari perangkat daerah..."
                                    value={suratForm.perangkat_daerah || ''}
                                    onChange={(e) => { setSuratForm({ ...suratForm, perangkat_daerah: e.target.value }); setIsPerangkatDropdownOpen(true); }}
                                    onFocus={() => setIsPerangkatDropdownOpen(true)}
                                />
                                <span className="material-symbols-outlined notranslate absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
                                    {isPerangkatDropdownOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </div>
                            {isPerangkatDropdownOpen && (
                                <div className="absolute z-10 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                    {filteredPerangkat.length > 0 ? filteredPerangkat.map((pd, index) => (
                                        <button key={index} type="button"
                                            className="w-full text-left px-4 py-2.5 hover:bg-primary/5 transition-colors text-sm border-b border-slate-50 last:border-b-0 truncate"
                                            onClick={() => { setSuratForm({ ...suratForm, perangkat_daerah: pd }); setIsPerangkatDropdownOpen(false); }}>
                                            {pd}
                                        </button>
                                    )) : (
                                        <div className="px-4 py-3 text-sm text-slate-400 text-center">Tidak ada kecocokan</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-1">Tanggal Mulai</label>
                                <input type="date" required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                    value={suratForm.tanggal_mulai || ''}
                                    onChange={(e) => setSuratForm({ ...suratForm, tanggal_mulai: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-1">Tanggal Selesai</label>
                                <input type="date" required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                    value={suratForm.tanggal_selesai || ''}
                                    onChange={(e) => setSuratForm({ ...suratForm, tanggal_selesai: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Instansi/Lembaga Section */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detail Instansi & Pejabat</p>
                            <div className="relative" ref={instansiRef}>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Instansi</label>
                                <div className="relative">
                                    <input type="text"
                                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm bg-white pr-8"
                                        placeholder="Cari instansi..."
                                        value={suratForm.instansi || ''}
                                        onChange={(e) => { setSuratForm({ ...suratForm, instansi: e.target.value }); setIsInstansiDropdownOpen(true); }}
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
                                                onClick={() => { setSuratForm({ ...suratForm, instansi: pd }); setIsInstansiDropdownOpen(false); }}>
                                                {pd}
                                            </button>
                                        )) : (
                                            <div className="px-4 py-3 text-sm text-slate-400 text-center">Tidak ada kecocokan</div>
                                        )}
                                        <button type="button"
                                            className="w-full text-left px-3 py-2 hover:bg-primary/5 transition-colors text-sm border-t border-slate-100 font-semibold text-blue-600 truncate bg-slate-50"
                                            onClick={() => { setSuratForm({ ...suratForm, instansi: "Badan Riset dan Inovasi Daerah (BRIDA) Kota Surabaya" }); setIsInstansiDropdownOpen(false); }}>
                                            Badan Riset dan Inovasi Daerah (BRIDA) Kota Surabaya
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jabatan Penandatangan</label>
                                <input type="text"
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                    placeholder="Kepala Badan Riset dan Inovasi Daerah"
                                    value={suratForm.jabatan_kepala || ''}
                                    onChange={(e) => setSuratForm({ ...suratForm, jabatan_kepala: e.target.value })}
                                />
                            </div>
                            <div className="pt-2 border-t border-slate-200">
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pejabat</label>
                                <input type="text"
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                    placeholder="Masukkan nama pejabat..."
                                    value={suratForm.kepala_name || ''}
                                    onChange={(e) => setSuratForm({ ...suratForm, kepala_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">NIP Pejabat</label>
                                <input type="text"
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                    placeholder="Masukkan NIP pejabat..."
                                    value={suratForm.kepala_nip || ''}
                                    onChange={(e) => setSuratForm({ ...suratForm, kepala_nip: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-slate-100 flex flex-col gap-3">
                        <button type="button" onClick={handleGenerate}
                            disabled={!suratForm.mahasiswa_id || !suratForm.nomor_surat || !suratForm.tanggal_mulai || !suratForm.tanggal_selesai}
                            className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                                !suratForm.mahasiswa_id || !suratForm.nomor_surat || !suratForm.tanggal_mulai || !suratForm.tanggal_selesai
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                    : 'bg-primary text-white hover:bg-blue-700 shadow-blue-200'
                            }`}>
                            <span className="material-symbols-outlined notranslate">description</span>
                            Terbitkan Surat Keterangan Lulus
                        </button>
                        <button type="button" onClick={handleClose}
                            className="w-full py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                            Batal
                        </button>
                    </div>
                </div>

                {/* Right Side: Live Preview */}
                <div className="w-full md:w-2/3 bg-slate-100 p-6 flex flex-col items-center justify-start relative overflow-y-auto custom-scrollbar">
                    <div className="absolute top-4 right-4 hidden md:block">
                        <button onClick={handleClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 shadow-sm transition-colors">
                            <span className="material-symbols-outlined notranslate leading-none">close</span>
                        </button>
                    </div>

                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Live Preview Surat Keterangan Lulus</h4>

                    {/* Preview Container — A4 Portrait */}
                    <div className="relative shadow-xl mx-auto overflow-hidden bg-white"
                        style={{
                            width: `${794 * 0.7}px`,
                            height: `${1123 * 0.7}px`,
                            flexShrink: 0
                        }}>
                        <div style={{
                            width: '794px', height: '1123px',
                            transform: 'scale(0.7)',
                            transformOrigin: 'top left'
                        }}>
                            <SuratKeteranganTemplate
                                ref={suratRef}
                                studentName={selectedStudent?.name}
                                nomorSurat={suratForm.nomor_surat}
                                university={selectedStudent?.university}
                                major={selectedStudent?.major}
                                nim={suratForm.nim || selectedStudent?.nim || '-'}
                                perangkatDaerah={suratForm.perangkat_daerah}
                                startDate={suratForm.tanggal_mulai}
                                endDate={suratForm.tanggal_selesai}
                                kepalaName={suratForm.kepala_name}
                                kepalaNip={suratForm.kepala_nip}
                                instansi={suratForm.instansi || 'Badan Riset dan Inovasi Daerah (BRIDA) Kota Surabaya'}
                                jabatanKepala={suratForm.jabatan_kepala || 'Kepala Badan Riset dan Inovasi Daerah'}
                                headerNamaInstansi={(() => { const pd = perangkatDaerahData.find(p => p.nama === suratForm.perangkat_daerah); return pd ? pd.nama.toUpperCase() : 'BADAN RISET DAN INOVASI DAERAH'; })()}
                                headerAlamat={(() => { const pd = perangkatDaerahData.find(p => p.nama === suratForm.perangkat_daerah); return pd ? pd.alamat : 'Jl. Jaksa Agung Suprapto No. 6 – 8 Surabaya 60272'; })()}
                                headerTelp={(() => { const pd = perangkatDaerahData.find(p => p.nama === suratForm.perangkat_daerah); return pd ? pd.telp : '(031) 5347182'; })()}
                                headerEmail={(() => { const pd = perangkatDaerahData.find(p => p.nama === suratForm.perangkat_daerah); return pd ? pd.email : 'brida@surabaya.go.id'; })()}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </ModalPortal>
    );
};

export default SuratKeteranganGenerateModal;

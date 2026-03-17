import React, { useState, useRef, useEffect } from 'react';
import { initialActivityTypes, activityCategories, categoryLabels } from '../../../data/activityTypes';
import { useCourseConversion } from '../../../context/CourseConversionContext';
import LocationPicker from './LocationPicker';
import Swal from 'sweetalert2';

const LogbookForm = ({ entryType, initialData, viewMode, onSubmit, onCancel }) => {
    const { courses: mataKuliahOptions } = useCourseConversion();
    const [formData, setFormData] = useState({
        tanggal: '',
        jamMulai: '',
        jamSelesai: '',
        jenisKegiatan: '',
        mataKuliahKonversi: '',
        lokasiId: null,
        lokasiNama: '',
        lokasiLat: null,
        lokasiLng: null,
        uraian: ''
    });

    const calculateTotalHours = (start, end) => {
        if (!start || !end) return null;
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        let totalMinutes = (eh * 60 + em) - (sh * 60 + sm);
        if (totalMinutes < 0) totalMinutes += 24 * 60;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes, totalMinutes };
    };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCustomAktivitas, setIsCustomAktivitas] = useState(false);
    const [customAktivitas, setCustomAktivitas] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [errors, setErrors] = useState({}); // State for validation errors
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                tanggal: initialData.rawTanggal || '',
                jamMulai: initialData.jamMulai || '',
                jamSelesai: initialData.jamSelesai || '',
                jenisKegiatan: initialData.jenisKegiatan || '',
                mataKuliahKonversi: initialData.mataKuliahKonversi || '',
                lokasiId: initialData.lokasiId || null,
                lokasiNama: initialData.lokasiNama || '',
                lokasiLat: initialData.lokasiLat || null,
                lokasiLng: initialData.lokasiLng || null,
                uraian: initialData.deskripsi || initialData.kegiatan || '',
                pembelajaran: initialData.pembelajaran || ''
            });
            // Find category
            let foundCategory = '';
            let isCustom = false;

            const activity = initialActivityTypes.find(a => a.name === initialData.jenisKegiatan);
            if (activity) {
                foundCategory = activity.category;
            } else if (initialData.jenisKegiatan) {
                // If there's an activity but it's not in the list, it must be custom.
                // We'll try to infer the category if possible, or just leave it empty 
                // but we need the category to be selected to show the activities.
                // Let's rely on the user re-selecting if the category is lost, 
                // but ideally, we should save the category ID as well in the DB.
                // For now, if no match, we just set custom to true.
                isCustom = true;
                setCustomAktivitas(initialData.jenisKegiatan);
            }

            if (foundCategory) {
                setSelectedCategory(foundCategory);
            } else if (isCustom && initialData.kategori) {
                setSelectedCategory(initialData.kategori);
            }
            setIsCustomAktivitas(isCustom);

            // Handle file if present in initialData
        } else {
            setFormData({
                tanggal: '',
                jamMulai: '',
                jamSelesai: '',
                jenisKegiatan: '',
                mataKuliahKonversi: '',
                lokasiId: null,
                lokasiNama: '',
                lokasiLat: null,
                lokasiLng: null,
                uraian: '',
                pembelajaran: ''
            });
            setSelectedCategory('');
            setUploadedFile(null);
        }
    }, [initialData, entryType]);

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
        
        // Clear error for category
        if (errors.kategori) {
            setErrors(prev => ({ ...prev, kategori: '' }));
        }

        // Reset jenisKegiatan if category changes and it's not custom
        if (!isCustomAktivitas) {
            setFormData(prev => ({ ...prev, jenisKegiatan: '' }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        if (name === 'jenisKegiatan') {
            if (value === 'Lainnya') {
                setIsCustomAktivitas(true);
                setFormData(prev => ({ ...prev, jenisKegiatan: customAktivitas }));
            } else {
                setIsCustomAktivitas(false);
                setCustomAktivitas('');
                setFormData(prev => ({ ...prev, jenisKegiatan: value }));
            }
        }
    };

    const handleCustomAktivitasChange = (e) => {
        const val = e.target.value;
        setCustomAktivitas(val);
        setFormData(prev => ({ ...prev, jenisKegiatan: val }));
        
        // Clear error for custom aktivitas
        if (errors.customAktivitas) {
            setErrors(prev => ({ ...prev, customAktivitas: '' }));
        }
        if (errors.jenisKegiatan) {
             setErrors(prev => ({ ...prev, jenisKegiatan: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const isJournal = entryType !== 'Laporan Harian';
            const allowedTypes = isJournal
                ? ['application/pdf']
                : ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];

            // Limit: 2MB for Laporan Harian, 5MB for Jurnal
            const maxSize = isJournal ? 5 * 1024 * 1024 : 2 * 1024 * 1024;

            if (!allowedTypes.includes(file.type)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Format Tidak Didukung',
                    text: isJournal
                        ? 'Hanya format PDF yang didukung untuk Jurnal.'
                        : 'Format file tidak didukung. Gunakan PNG, JPG, atau PDF.',
                    confirmButtonColor: '#ef4444',
                    customClass: {
                        popup: 'validator-popup'
                    },
                    backdrop: `rgba(0,0,0,0.4) backdrop-filter: blur(4px)`
                });
                return;
            }

            if (file.size > maxSize) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ukuran Terlalu Besar',
                    text: `Ukuran file terlalu besar. Maksimal ${isJournal ? '5MB' : '2MB'}.`,
                    confirmButtonColor: '#ef4444',
                    customClass: {
                        popup: 'validator-popup'
                    },
                    backdrop: `rgba(0,0,0,0.4) backdrop-filter: blur(4px)`
                });
                return;
            }

            setUploadedFile(file);
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUploadClick = () => {
        if (!viewMode) {
            fileInputRef.current?.click();
        }
    };

    const getFileIcon = (file) => {
        if (file.type === 'application/pdf') return 'picture_as_pdf';
        return 'image';
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const validateForm = () => {
        const newErrors = {};

        // 1. Common Fields Validation
        if (!formData.tanggal) newErrors.tanggal = 'Tanggal wajib diisi.';
        if (!formData.uraian || !formData.uraian.trim()) newErrors.uraian = entryType === 'Laporan Harian' ? 'Keterangan urain kegiatan wajib diisi.' : 'Judul jurnal wajib diisi.';

        // 2. Laporan Harian Specific Validation
        if (entryType === 'Laporan Harian') {
            if (!formData.jamMulai) newErrors.jamMulai = 'Jam mulai wajib diisi.';
            if (!formData.jamSelesai) newErrors.jamSelesai = 'Jam selesai wajib diisi.';
            
            // Validate time range if both exist
            if (formData.jamMulai && formData.jamSelesai) {
                 const start = new Date(`1970-01-01T${formData.jamMulai}:00`);
                 const end = new Date(`1970-01-01T${formData.jamSelesai}:00`);
                 if (end <= start) {
                     newErrors.jamSelesai = 'Jam selesai harus lebih besar dari jam mulai.';
                 }
            }

            if (!selectedCategory) newErrors.kategori = 'Pilih jenis penugasan.';
            
            if (isCustomAktivitas) {
                if (!customAktivitas || !customAktivitas.trim()) {
                    newErrors.customAktivitas = 'Jenis aktivitas lainnya wajib diisi.';
                }
            } else {
                if (!formData.jenisKegiatan) newErrors.jenisKegiatan = 'Pilih jenis aktivitas.';
            }

            if (!formData.pembelajaran || !formData.pembelajaran.trim()) newErrors.pembelajaran = 'Output kegiatan wajib diisi.';
        }

        // 3. Dokumen Teknis Specific Validation
        if (entryType === 'Dokumen Teknis') {
             if (!formData.jenisKegiatan) newErrors.jenisKegiatan = 'Pilih jenis dokumen.';
        }

        setErrors(newErrors);

        // Auto-scroll to first error
        if (Object.keys(newErrors).length > 0) {
            const firstErrorField = Object.keys(newErrors)[0];
            // map internal state names to DOM ids where they differ
            const elementIdMap = {
                 kategori: 'kategori',
                 tanggal: 'tanggal',
                 jamMulai: 'jamMulai',
                 jamSelesai: 'jamSelesai',
                 jenisKegiatan: 'jenisKegiatan',
                 customAktivitas: 'customAktivitasInput',
                 uraian: 'uraian',
                 pembelajaran: 'pembelajaran'
            };
            
            const elementId = elementIdMap[firstErrorField] || firstErrorField;
            const element = document.getElementById(elementId);
            
            if (element) {
                // Smooth scroll with a slight offset for header visibility
                const headerOffset = 100; // adjust based on modal header height
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Assuming the scrollable container is the closest parent with overflow-y-auto, 
                // or just falling back to element.scrollIntoView if we can't easily find it
                // For modal popups, sometimes scrollIntoView is safer:
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            return false;
        }

        return true;
    };

    const handleSubmitInternal = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const total = calculateTotalHours(formData.jamMulai, formData.jamSelesai);
        const submittedData = {
            ...formData,
            kategori: selectedCategory, // Send selected category back to Logbook
            totalJamKerja: total ? `${total.hours} jam ${total.minutes} menit` : '',
        };
        onSubmit(submittedData, uploadedFile);
    };

    return (
        <form onSubmit={handleSubmitInternal} className="p-6">
            <div className={`grid grid-cols-1 ${entryType === 'Laporan Harian' ? 'md:grid-cols-2' : ''} gap-5 mb-5`}>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-[#1b0d0d]" htmlFor="tanggal">Tanggal</label>
                    <input
                        type="date"
                        id="tanggal"
                        name="tanggal"
                        value={formData.tanggal}
                        onChange={handleInputChange}
                        disabled={viewMode}
                        className={`w-full h-10 text-sm rounded-lg border-2 bg-white text-[#1b0d0d] shadow-sm px-3 disabled:bg-slate-50 disabled:text-slate-500 transition-colors ${
                            errors.tanggal ? 'border-blue-300 bg-blue-50/30 focus:border-blue-400 focus:ring-1 focus:ring-blue-400' : 'border-[#e0d0d0] focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                        }`}
                    />
                    {errors.tanggal && (
                        <p className="text-xs text-blue-500 font-medium flex items-center gap-1 mt-0.5 animate-in fade-in slide-in-from-top-1">
                            <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                            {errors.tanggal}
                        </p>
                    )}
                </div>
                {entryType === 'Laporan Harian' && (
                    <>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-bold text-[#1b0d0d]" htmlFor="kategori">Jenis Penugasan</label>
                            <select
                                id="kategori"
                                name="kategori"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                disabled={viewMode}
                                className={`w-full h-10 text-sm rounded-lg border-2 bg-white text-[#1b0d0d] shadow-sm px-3 disabled:bg-slate-50 disabled:text-slate-500 transition-colors ${
                                    errors.kategori ? 'border-blue-300 bg-blue-50/30 focus:border-blue-400 focus:ring-1 focus:ring-blue-400' : 'border-[#e0d0d0] focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                                }`}
                            >
                                <option value="">Pilih Penugasan</option>
                                {activityCategories.map(cat => (
                                    <optgroup key={cat.id} label={cat.label}>
                                        {cat.subCategories.map(sub => (
                                            <option key={sub} value={sub}>{categoryLabels[sub]}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                            {errors.kategori && (
                                <p className="text-xs text-blue-500 font-medium flex items-center gap-1 mt-0.5 animate-in fade-in slide-in-from-top-1">
                                    <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                    {errors.kategori}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-bold text-[#1b0d0d]" htmlFor="jenisKegiatan">Jenis Aktivitas</label>
                            <select
                                id="jenisKegiatan"
                                name="jenisKegiatan"
                                value={isCustomAktivitas ? 'Lainnya' : formData.jenisKegiatan}
                                onChange={handleInputChange}
                                disabled={viewMode || !selectedCategory}
                                className={`w-full h-10 text-sm rounded-lg border-2 bg-white text-[#1b0d0d] shadow-sm px-3 disabled:bg-slate-50 disabled:text-slate-500 transition-colors ${
                                    errors.jenisKegiatan ? 'border-blue-300 bg-blue-50/30 focus:border-blue-400 focus:ring-1 focus:ring-blue-400' : 'border-[#e0d0d0] focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                                }`}
                            >
                                <option value="" disabled>Pilih Aktivitas</option>
                                {initialActivityTypes
                                    .filter(act => act.category === selectedCategory)
                                    .map(act => (
                                        <option key={act.id} value={act.name}>{act.name}</option>
                                    ))
                                }
                                <option value="Lainnya">Lainnya... (Tulis Sendiri)</option>
                            </select>
                            {errors.jenisKegiatan && (
                                <p className="text-xs text-blue-500 font-medium flex items-center gap-1 mt-0.5 animate-in fade-in slide-in-from-top-1">
                                    <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                    {errors.jenisKegiatan}
                                </p>
                            )}
                        </div>

                        {/* Custom Input for 'Lainnya' */}
                        {isCustomAktivitas && (
                            <div className="flex flex-col gap-1.5 animate-in slide-in-from-top-1 fade-in duration-200">
                                <label className="text-[13px] font-bold text-[#1b0d0d]" htmlFor="customAktivitasInput">Tulis Jenis Aktivitas <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="customAktivitasInput"
                                    value={customAktivitas}
                                    onChange={handleCustomAktivitasChange}
                                    disabled={viewMode}
                                    placeholder="Contoh: Mengatur Database Server"
                                    className={`w-full h-10 text-sm rounded-lg border-2 bg-white text-[#1b0d0d] shadow-sm px-3 disabled:bg-slate-50 disabled:text-slate-500 transition-colors ${
                                        errors.customAktivitas ? 'border-blue-300 bg-blue-50/30 focus:border-blue-400 focus:ring-1 focus:ring-blue-400' : 'border-[#e0d0d0] focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                                    }`}
                                />
                                {errors.customAktivitas && (
                                    <p className="text-xs text-blue-500 font-medium flex items-center gap-1 mt-0.5 animate-in fade-in slide-in-from-top-1">
                                        <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                        {errors.customAktivitas}
                                    </p>
                                )}
                            </div>
                        )}
                    </>
                )}
                {entryType === 'Laporan Harian' && (
                    <>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-bold text-[#1b0d0d]" htmlFor="jamMulai">Jam Mulai</label>
                            <input
                                type="time"
                                id="jamMulai"
                                name="jamMulai"
                                value={formData.jamMulai}
                                onChange={handleInputChange}
                                disabled={viewMode}
                                className={`w-full h-10 text-sm rounded-lg border-2 bg-white text-[#1b0d0d] shadow-sm px-3 disabled:bg-slate-50 disabled:text-slate-500 transition-colors ${
                                    errors.jamMulai ? 'border-blue-300 bg-blue-50/30 focus:border-blue-400 focus:ring-1 focus:ring-blue-400' : 'border-[#e0d0d0] focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                                }`}
                            />
                            {errors.jamMulai && (
                                <p className="text-xs text-blue-500 font-medium flex items-center gap-1 mt-0.5 animate-in fade-in slide-in-from-top-1">
                                    <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                    {errors.jamMulai}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-bold text-[#1b0d0d]" htmlFor="jamSelesai">Jam Selesai</label>
                            <input
                                type="time"
                                id="jamSelesai"
                                name="jamSelesai"
                                value={formData.jamSelesai}
                                onChange={handleInputChange}
                                disabled={viewMode}
                                className={`w-full h-10 text-sm rounded-lg border-2 bg-white text-[#1b0d0d] shadow-sm px-3 disabled:bg-slate-50 disabled:text-slate-500 transition-colors ${
                                    errors.jamSelesai ? 'border-blue-300 bg-blue-50/30 focus:border-blue-400 focus:ring-1 focus:ring-blue-400' : 'border-[#e0d0d0] focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                                }`}
                            />
                            {errors.jamSelesai && (
                                <p className="text-xs text-blue-500 font-medium flex items-center gap-1 mt-0.5 animate-in fade-in slide-in-from-top-1">
                                    <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                    {errors.jamSelesai}
                                </p>
                            )}
                        </div>
                    </>
                )}
                {entryType === 'Laporan Harian' && (
                    <>
                        {/* Total Jam Kerja - Auto Calculated */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-bold text-[#1b0d0d]">Total Jam Kerja</label>
                            <div className="w-full h-10 text-sm rounded-lg border-[#e0d0d0] bg-slate-50 text-[#1b0d0d] shadow-sm px-3 flex items-center">
                                {(() => {
                                    const total = calculateTotalHours(formData.jamMulai, formData.jamSelesai);
                                    if (!total) return <span className="text-slate-400 italic">Isi jam mulai & selesai</span>;
                                    return (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-600/10 text-blue-600 text-xs font-bold rounded-full">
                                            <span className="material-symbols-outlined notranslate text-[14px]">schedule</span>
                                            {total.hours > 0 ? `${total.hours} jam` : ''}{total.hours > 0 && total.minutes > 0 ? ' ' : ''}{total.minutes > 0 ? `${total.minutes} menit` : ''}{total.hours === 0 && total.minutes === 0 ? '0 menit' : ''}
                                        </span>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* Lokasi - OpenStreetMap */}
                        <div className="md:col-span-2">
                            <LocationPicker
                                value={{
                                    lokasiId: formData.lokasiId,
                                    lokasiNama: formData.lokasiNama,
                                    lokasiLat: formData.lokasiLat,
                                    lokasiLng: formData.lokasiLng,
                                }}
                                onChange={(loc) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        lokasiId: loc.lokasiId,
                                        lokasiNama: loc.lokasiNama,
                                        lokasiLat: loc.lokasiLat,
                                        lokasiLng: loc.lokasiLng,
                                    }));
                                }}
                                disabled={viewMode}
                            />
                        </div>

                        {/* Mata Kuliah Konversi */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-bold text-[#1b0d0d]" htmlFor="mataKuliahKonversi">Mata Kuliah Konversi</label>
                            {mataKuliahOptions.length > 0 ? (
                                <select
                                    id="mataKuliahKonversi"
                                    name="mataKuliahKonversi"
                                    value={formData.mataKuliahKonversi}
                                    onChange={handleInputChange}
                                    disabled={viewMode}
                                    className="w-full h-10 text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 px-3 disabled:bg-slate-50 disabled:text-slate-500"
                                >
                                    <option value="">Pilih Mata Kuliah</option>
                                    {mataKuliahOptions.map(mk => (
                                        <option key={mk} value={mk}>{mk}</option>
                                    ))}
                                </select>
                            ) : (
                                <p className="text-xs text-slate-400 italic bg-slate-50 rounded-lg p-3 border border-slate-200">
                                    Belum ada mata kuliah. Silakan isi di Form Administrasi Magang terlebih dahulu.
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col gap-1.5 mb-5">
                <label className="text-[13px] font-bold text-[#1b0d0d]" htmlFor="uraian">
                    {entryType === 'Laporan Harian' ? 'Uraian Kegiatan' : 'Judul Jurnal'}
                </label>
                {entryType === 'Laporan Harian' ? (
                    <textarea
                        id="uraian"
                        name="uraian"
                        value={formData.uraian}
                        onChange={handleInputChange}
                        disabled={viewMode}
                        rows="4"
                        placeholder="Deskripsikan urain dan keterangan kegiatan yang anda lakukan secara detail."
                        className={`w-full text-sm p-4 rounded-xl border-2 bg-white text-slate-800 placeholder-slate-400 shadow-sm focus:ring-2 focus:ring-blue-600/20 hover:border-slate-300 transition-all resize-none disabled:bg-slate-50 disabled:text-slate-500 ${
                            errors.uraian ? 'border-blue-300 bg-blue-50/30 focus:border-blue-400' : 'border-slate-200 focus:border-blue-600'
                        }`}
                    ></textarea>
                ) : (
                    <input
                        type="text"
                        id="uraian"
                        name="uraian"
                        value={formData.uraian}
                        onChange={handleInputChange}
                        placeholder="Masukkan judul jurnal..."
                        disabled={viewMode}
                        className={`w-full h-10 text-sm rounded-lg border-2 bg-white text-[#1b0d0d] shadow-sm px-3 disabled:bg-slate-50 disabled:text-slate-500 transition-colors ${
                            errors.uraian ? 'border-blue-300 bg-blue-50/30 focus:border-blue-400 focus:ring-1 focus:ring-blue-400' : 'border-[#e0d0d0] focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                        }`}
                    />
                )}
                {errors.uraian && (
                    <p className="text-xs text-blue-500 font-medium flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1">
                        <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                        {errors.uraian}
                    </p>
                )}
            </div>

            {entryType === 'Laporan Harian' && (
                <div className="flex flex-col gap-1.5 mb-5">
                    <label className="text-[13px] font-bold text-[#1b0d0d]" htmlFor="pembelajaran">
                        Output kegiatan (didapat/dipahami/dikerjakan)
                    </label>
                    <textarea
                        id="pembelajaran"
                        name="pembelajaran"
                        value={formData.pembelajaran}
                        onChange={handleInputChange}
                        placeholder="Jelaskan apa saja yang Anda pelajari atau pahami dari kegiatan hari ini..."
                        rows={3}
                        disabled={viewMode}
                        className={`w-full text-sm p-4 rounded-xl border-2 bg-white text-slate-800 placeholder-slate-400 shadow-sm focus:ring-2 focus:ring-blue-600/20 hover:border-slate-300 transition-all resize-none disabled:bg-slate-50 disabled:text-slate-500 ${
                            errors.pembelajaran ? 'border-blue-300 bg-blue-50/30 focus:border-blue-400' : 'border-slate-200 focus:border-blue-600'
                        }`}
                    />
                    {errors.pembelajaran && (
                        <p className="text-xs text-blue-500 font-medium flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1">
                            <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                            {errors.pembelajaran}
                        </p>
                    )}
                </div>
            )}

            <div className="flex flex-col gap-1.5 mb-6">
                <label className="text-[13px] font-bold text-[#1b0d0d]">
                    {entryType === 'Laporan Harian' ? 'Bukti Dukung (Foto/Dokumen)' : 'Upload Jurnal'}
                </label>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={entryType === 'Laporan Harian' ? ".png,.jpg,.jpeg,.pdf" : ".pdf"}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={viewMode}
                />
                {!uploadedFile ? (
                    <div
                        onClick={handleUploadClick}
                        className={`mt-0.5 flex justify-center rounded-lg border-2 border-dashed border-[#e0d0d0] px-6 py-8 hover:bg-gray-50/50 hover:border-primary/50 transition-colors bg-white group ${viewMode ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                        <div className="text-center">
                            <span className={`material-symbols-outlined notranslate mx-auto text-gray-300 ${!viewMode && 'group-hover:text-blue-600'} transition-colors text-4xl mb-2`}>cloud_upload</span>
                            <div className="flex text-sm leading-6 text-gray-600 justify-center">
                                <span className={`relative rounded-md font-bold text-blue-600 ${!viewMode && 'hover:text-blue-700 cursor-pointer'}`}>Upload a file</span>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-[11px] leading-5 text-gray-500">
                                {entryType === 'Laporan Harian' ? 'PNG, JPG, PDF up to 2MB' : 'PDF up to 5MB'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-0.5 rounded-lg border border-[#e0d0d0] bg-white p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <span className="material-symbols-outlined notranslate text-[24px]">{getFileIcon(uploadedFile)}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#1b0d0d] truncate max-w-[200px]">{uploadedFile.name}</p>
                                    <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                                </div>
                            </div>
                            {!viewMode && (
                                <button
                                    type="button"
                                    onClick={handleRemoveFile}
                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <span className="material-symbols-outlined notranslate text-[20px]">close</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#f3e7e7]">
                {/* If View Mode, show only Close button */}
                {viewMode ? (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2 rounded-lg bg-gray-100 text-xs font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        Tutup
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-5 py-2 rounded-lg border border-[#e0d0d0] text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200/50 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined notranslate text-[16px]">save</span>
                            {initialData ? 'Update Logbook' : 'Simpan Logbook'}
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};

export default LogbookForm;

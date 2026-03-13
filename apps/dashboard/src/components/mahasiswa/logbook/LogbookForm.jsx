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
        setSelectedCategory(e.target.value);
        setFormData(prev => ({ ...prev, jenisKegiatan: '' }));
        setIsCustomAktivitas(false);
        setCustomAktivitas('');
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'jenisKegiatan') {
            if (value === 'Lainnya') {
                setIsCustomAktivitas(true);
                setFormData(prev => ({ ...prev, [name]: '' }));
            } else {
                setIsCustomAktivitas(false);
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else if (name === 'customAktivitas') {
            setCustomAktivitas(value);
            setFormData(prev => ({ ...prev, jenisKegiatan: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
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
                    confirmButtonColor: '#2563eb'
                });
                return;
            }

            if (file.size > maxSize) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ukuran Terlalu Besar',
                    text: `Ukuran file terlalu besar. Maksimal ${isJournal ? '5MB' : '2MB'}.`,
                    confirmButtonColor: '#2563eb'
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

    const handleSubmitInternal = (e) => {
        e.preventDefault();
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
                        required
                        disabled={viewMode}
                        className="w-full h-10 text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 disabled:bg-slate-50 disabled:text-slate-500"
                    />
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
                                className="w-full h-10 text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 disabled:bg-slate-50 disabled:text-slate-500"
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
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-bold text-[#1b0d0d]" htmlFor="jenisKegiatan">Jenis Aktivitas</label>
                            <select
                                id="jenisKegiatan"
                                name="jenisKegiatan"
                                value={isCustomAktivitas ? 'Lainnya' : formData.jenisKegiatan}
                                onChange={handleInputChange}
                                required={!isCustomAktivitas}
                                disabled={viewMode || !selectedCategory}
                                className="w-full h-10 text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 disabled:bg-slate-50 disabled:text-slate-500"
                            >
                                <option value="">Pilih Kegiatan</option>
                                {initialActivityTypes
                                    .filter(act => act.category === selectedCategory)
                                    .map(act => (
                                        <option key={act.id} value={act.name}>{act.name}</option>
                                    ))
                                }
                                <option value="Lainnya">Lainnya</option>
                            </select>
                            {isCustomAktivitas && (
                                <input
                                    type="text"
                                    name="customAktivitas"
                                    value={customAktivitas}
                                    onChange={handleInputChange}
                                    placeholder="Tuliskan jenis aktivitas..."
                                    required
                                    disabled={viewMode}
                                    className="w-full h-10 text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 mt-2 disabled:bg-slate-50 disabled:text-slate-500"
                                />
                            )}
                        </div>
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
                                required
                                disabled={viewMode}
                                className="w-full h-10 text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 disabled:bg-slate-50 disabled:text-slate-500"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-bold text-[#1b0d0d]" htmlFor="jamSelesai">Jam Selesai</label>
                            <input
                                type="time"
                                id="jamSelesai"
                                name="jamSelesai"
                                value={formData.jamSelesai}
                                onChange={handleInputChange}
                                required
                                disabled={viewMode}
                                className="w-full h-10 text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 disabled:bg-slate-50 disabled:text-slate-500"
                            />
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
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
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
                                    className="w-full h-10 text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 disabled:bg-slate-50 disabled:text-slate-500"
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
                        placeholder="Deskripsikan kegiatan yang Anda lakukan hari ini secara detail..."
                        rows={4}
                        required
                        disabled={viewMode}
                        className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-primary focus:ring-1 focus:ring-primary resize-none p-3 disabled:bg-slate-50 disabled:text-slate-500"
                    />
                ) : (
                    <input
                        type="text"
                        id="uraian"
                        name="uraian"
                        value={formData.uraian}
                        onChange={handleInputChange}
                        placeholder="Masukkan judul jurnal..."
                        required
                        disabled={viewMode}
                        className="w-full h-10 text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 disabled:bg-slate-50 disabled:text-slate-500"
                    />
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
                        required
                        disabled={viewMode}
                        className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white text-[#1b0d0d] shadow-sm focus:border-primary focus:ring-1 focus:ring-primary resize-none p-3 disabled:bg-slate-50 disabled:text-slate-500"
                    />
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
                            <span className={`material-symbols-outlined notranslate mx-auto text-gray-300 ${!viewMode && 'group-hover:text-primary'} transition-colors text-4xl mb-2`}>cloud_upload</span>
                            <div className="flex text-sm leading-6 text-gray-600 justify-center">
                                <span className={`relative rounded-md font-bold text-primary ${!viewMode && 'hover:text-blue-700 cursor-pointer'}`}>Upload a file</span>
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
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-primary">
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
                            className="px-5 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-[#d41111] transition-all shadow-md shadow-blue-200/50 flex items-center gap-2"
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

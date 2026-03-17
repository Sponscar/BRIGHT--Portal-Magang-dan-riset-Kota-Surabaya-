import { useState } from 'react';
import { useCourseConversion } from '../../context/CourseConversionContext';

const AdministrationForm = ({ onSubmit }) => {
    const { setCourseList } = useCourseConversion();
    const [formData, setFormData] = useState({
        needsReplyLetter: '',
        proposalDescription: '',
        topic: '',
        expectedResults: [],
        courseConversion: [],
        hasCourseConversion: '',
        declaration: false,
    });

    const [newCourseInput, setNewCourseInput] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const expectedResultOptions = [
        { value: 'laporan_akhir', label: 'Laporan Akhir' },
        { value: 'jurnal', label: 'Jurnal' },
        { value: 'draft_jurnal', label: 'Draft Jurnal' },
        { value: 'seminar_kampus', label: 'Seminar di Kampus (Tes)' },
    ];

    const countWords = (text) => {
        return text.trim().split(/\s+/).filter(w => w.length > 0).length;
    };

    const handleCheckboxChange = (value) => {
        setFormData(prev => ({
            ...prev,
            expectedResults: prev.expectedResults.includes(value)
                ? prev.expectedResults.filter(v => v !== value)
                : [...prev.expectedResults, value]
        }));
        if (errors.expectedResults) {
            setErrors(prev => ({ ...prev, expectedResults: '' }));
        }
    };

    const handleAddCourse = () => {
        const trimmed = newCourseInput.trim();
        if (trimmed && !formData.courseConversion.includes(trimmed)) {
            setFormData(prev => ({
                ...prev,
                courseConversion: [...prev.courseConversion, trimmed]
            }));
            setNewCourseInput('');
            if (errors.courseConversion) {
                setErrors(prev => ({ ...prev, courseConversion: '' }));
            }
        }
    };

    const handleRemoveCourse = (course) => {
        setFormData(prev => ({
            ...prev,
            courseConversion: prev.courseConversion.filter(c => c !== course)
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.needsReplyLetter) {
            newErrors.needsReplyLetter = 'Pilih salah satu opsi.';
        }
        if (!formData.proposalDescription.trim()) {
            newErrors.proposalDescription = 'Deskripsi proposal wajib diisi.';
        } else if (countWords(formData.proposalDescription) < 100) {
            newErrors.proposalDescription = `Minimal 100 kata. Saat ini: ${countWords(formData.proposalDescription)} kata.`;
        }
        if (!formData.topic.trim()) {
            newErrors.topic = 'Topik yang dibahas wajib diisi.';
        }
        if (formData.expectedResults.length === 0) {
            newErrors.expectedResults = 'Pilih minimal satu hasil yang diharapkan.';
        }
        if (!formData.hasCourseConversion) {
            newErrors.hasCourseConversion = 'Pilih salah satu opsi.';
        }
        if (formData.hasCourseConversion === 'Iya' && formData.courseConversion.length === 0) {
            newErrors.courseConversion = 'Tambahkan minimal satu mata kuliah yang akan dikonversi.';
        }
        if (!formData.declaration) {
            newErrors.declaration = 'Anda harus menyetujui pernyataan ini.';
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setTimeout(() => {
                const firstErrorField = Object.keys(newErrors)[0];
                const element = document.getElementById(firstErrorField);
                if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 50);
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Sync courses to context so LogbookForm can access them
            if (formData.hasCourseConversion === 'Iya') {
                setCourseList(formData.courseConversion);
            } else {
                setCourseList([]);
            }
            setIsSubmitted(true);
            if (onSubmit) onSubmit(formData);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    if (isSubmitted) {
        return (
            <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-8 flex flex-col items-center justify-center text-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <span className="material-symbols-outlined notranslate text-[32px]">task_alt</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Form Administrasi Berhasil Dikirim!</h3>
                        <p className="text-sm text-slate-500 mt-1">Data administrasi Anda telah tersimpan dan sedang dalam proses verifikasi.</p>
                    </div>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-2 px-6 py-2 text-sm font-bold text-primary border border-primary/20 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Edit Kembali
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                    <span className="material-symbols-outlined notranslate text-primary text-[20px]">assignment</span>
                    <h3 className="text-sm font-bold text-[#0d141b] uppercase tracking-wider">Form Administrasi Magang</h3>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* 1. Surat Balasan Resmi */}
                    <div className="flex flex-col gap-2" id="needsReplyLetter">
                        <label className="text-sm font-bold text-slate-800">
                            Apakah kampus Anda membutuhkan surat balasan resmi dari BRIDA?
                            <span className="text-blue-500 ml-0.5">*</span>
                        </label>
                        <div className="flex items-center gap-6">
                            {['Iya', 'Tidak'].map(option => (
                                <label
                                    key={option}
                                    className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${formData.needsReplyLetter === option
                                        ? 'border-primary bg-blue-50/60 shadow-sm'
                                        : 'border-slate-200 hover:border-slate-300 bg-white'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="needsReplyLetter"
                                        value={option}
                                        checked={formData.needsReplyLetter === option}
                                        onChange={(e) => handleChange('needsReplyLetter', e.target.value)}
                                        className="w-4 h-4 accent-primary"
                                    />
                                    <span className={`text-sm font-semibold ${formData.needsReplyLetter === option ? 'text-primary' : 'text-slate-600'
                                        }`}>
                                        {option}
                                    </span>
                                </label>
                            ))}
                        </div>
                        {errors.needsReplyLetter && (
                            <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                {errors.needsReplyLetter}
                            </p>
                        )}
                    </div>

                    {/* 2. Deskripsi Proposal */}
                    <div className="flex flex-col gap-2" id="proposalDescription">
                        <label className="text-sm font-bold text-slate-800">
                            Deskripsi Singkat Proposal Anda
                            <span className="text-blue-500 ml-0.5">*</span>
                        </label>
                        <p className="text-xs text-slate-400 -mt-1">Wajib diisi minimal 100 kata.</p>
                        <textarea
                            rows={6}
                            placeholder="Tuliskan deskripsi singkat mengenai proposal magang Anda..."
                            className={`w-full px-4 py-3 border-2 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 outline-none resize-y transition-colors ${errors.proposalDescription
                                ? 'border-rose-300 focus:border-rose-400 bg-rose-50/30'
                                : 'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10'
                                }`}
                            value={formData.proposalDescription}
                            onChange={(e) => handleChange('proposalDescription', e.target.value)}
                        />
                        <div className="flex items-center justify-between">
                            {errors.proposalDescription ? (
                                <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                    {errors.proposalDescription}
                                </p>
                            ) : <span />}
                            <span className={`text-xs font-semibold ${countWords(formData.proposalDescription) >= 100
                                ? 'text-emerald-500'
                                : 'text-slate-400'
                                }`}>
                                {countWords(formData.proposalDescription)} / 100 kata
                            </span>
                        </div>
                    </div>

                    {/* 3. Topik yang Dibahas */}
                    <div className="flex flex-col gap-2" id="topic">
                        <label className="text-sm font-bold text-slate-800">
                            Topik yang Dibahas
                            <span className="text-blue-500 ml-0.5">*</span>
                        </label>
                        <p className="text-xs text-slate-400 -mt-1">Jelaskan topik utama dan kegiatan selama magang.</p>
                        <textarea
                            rows={4}
                            placeholder="Contoh: Pengembangan sistem informasi berbasis web untuk pengelolaan data magang, meliputi desain UI/UX, implementasi backend, dan pengujian..."
                            className={`w-full px-4 py-3 border-2 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 outline-none resize-y transition-colors ${errors.topic
                                ? 'border-rose-300 focus:border-rose-400 bg-rose-50/30'
                                : 'border-slate-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/10'
                                }`}
                            value={formData.topic}
                            onChange={(e) => handleChange('topic', e.target.value)}
                        />
                        {errors.topic && (
                            <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                {errors.topic}
                            </p>
                        )}
                    </div>

                    {/* 4. Hasil yang Diharapkan */}
                    <div className="flex flex-col gap-2" id="expectedResults">
                        <label className="text-sm font-bold text-slate-800">
                            Hasil yang Diharapkan
                            <span className="text-blue-500 ml-0.5">*</span>
                        </label>
                        <p className="text-xs text-slate-400 -mt-1">Pilih satu atau lebih hasil yang diharapkan dari kegiatan magang.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                            {expectedResultOptions.map(option => (
                                <label
                                    key={option.value}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all ${formData.expectedResults.includes(option.value)
                                        ? 'border-primary bg-blue-50/60 shadow-sm'
                                        : 'border-slate-200 hover:border-slate-300 bg-white'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.expectedResults.includes(option.value)}
                                        onChange={() => handleCheckboxChange(option.value)}
                                        className="w-4 h-4 accent-primary rounded"
                                    />
                                    <div className="flex items-center gap-2">
                                        <span className={`material-symbols-outlined notranslate text-[18px] ${formData.expectedResults.includes(option.value)
                                            ? 'text-primary'
                                            : 'text-slate-400'
                                            }`}>
                                            {option.value === 'laporan_akhir' ? 'summarize' :
                                                option.value === 'jurnal' ? 'menu_book' :
                                                    option.value === 'draft_jurnal' ? 'edit_document' : 'school'}
                                        </span>
                                        <span className={`text-sm font-semibold ${formData.expectedResults.includes(option.value)
                                            ? 'text-primary'
                                            : 'text-slate-600'
                                            }`}>
                                            {option.label}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.expectedResults && (
                            <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                {errors.expectedResults}
                            </p>
                        )}
                    </div>

                    {/* 5. Mata Kuliah Konversi - Pertanyaan & Dropdown */}
                    <div className="flex flex-col gap-4">
                        {/* Pertanyaan Konversi */}
                        <div className="flex flex-col gap-2" id="hasCourseConversion">
                            <label className="text-sm font-bold text-slate-800">
                                Apakah ada Mata Kuliah yang Dikonversi Terkait dengan Magang BRIDA?
                                <span className="text-blue-500 ml-0.5">*</span>
                            </label>
                            <div className="flex items-center gap-6">
                                {['Iya', 'Tidak'].map(option => (
                                    <label
                                        key={option}
                                        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${formData.hasCourseConversion === option
                                            ? 'border-primary bg-blue-50/60 shadow-sm'
                                            : 'border-slate-200 hover:border-slate-300 bg-white'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="hasCourseConversion"
                                            value={option}
                                            checked={formData.hasCourseConversion === option}
                                            onChange={(e) => handleChange('hasCourseConversion', e.target.value)}
                                            className="w-4 h-4 accent-primary"
                                        />
                                        <span className={`text-sm font-semibold ${formData.hasCourseConversion === option ? 'text-primary' : 'text-slate-600'
                                            }`}>
                                            {option}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.hasCourseConversion && (
                                <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                    {errors.hasCourseConversion}
                                </p>
                            )}
                        </div>

                        {/* Dropdown (Hanya muncul jika 'Iya') */}
                        {formData.hasCourseConversion === 'Iya' && (
                            <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-300" id="courseConversion">
                                <label className="text-sm font-bold text-slate-800">
                                    Mata Kuliah yang Akan Dikonversi
                                    <span className="text-blue-500 ml-0.5">*</span>
                                </label>
                                <p className="text-xs text-slate-400 -mt-1">Tambahkan mata kuliah yang akan dikonversi.</p>

                                {/* Added courses tags */}
                                {formData.courseConversion.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {formData.courseConversion.map(course => (
                                            <span
                                                key={course}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-primary/20 rounded-lg text-xs font-semibold text-primary"
                                            >
                                                {course}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveCourse(course)}
                                                    className="text-primary/60 hover:text-primary transition-colors"
                                                >
                                                    <span className="material-symbols-outlined notranslate text-[14px]">close</span>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Add new course input */}
                                <div className={`flex items-center gap-2 px-4 py-3 border-2 rounded-xl transition-colors ${errors.courseConversion
                                    ? 'border-rose-300 bg-rose-50/30'
                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                    }`}>
                                    <span className="material-symbols-outlined notranslate text-[18px] text-primary">add_circle</span>
                                    <input
                                        type="text"
                                        placeholder="Ketik nama mata kuliah, lalu tekan Tambah..."
                                        className="flex-1 text-sm outline-none bg-transparent placeholder:text-slate-400 text-slate-700"
                                        value={newCourseInput}
                                        onChange={(e) => setNewCourseInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddCourse();
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddCourse}
                                        disabled={!newCourseInput.trim()}
                                        className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                                    >
                                        Tambah
                                    </button>
                                </div>

                                {errors.courseConversion && (
                                    <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
                                        <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                        {errors.courseConversion}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 6. Pernyataan */}
                    <div className="flex flex-col gap-2" id="declaration">
                        <div className={`p-5 rounded-xl border-2 transition-all ${formData.declaration
                            ? 'border-emerald-300 bg-emerald-50/50'
                            : errors.declaration
                                ? 'border-rose-300 bg-rose-50/30'
                                : 'border-slate-200 bg-slate-50/50'
                            }`}>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.declaration}
                                    onChange={(e) => handleChange('declaration', e.target.checked)}
                                    className="w-5 h-5 accent-emerald-600 rounded mt-0.5 shrink-0"
                                />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-bold text-slate-800">Pernyataan</span>
                                    <span className="text-sm text-slate-600 leading-relaxed">
                                        Saya menyatakan bahwa informasi yang saya isi adalah benar dan dapat dipertanggungjawabkan.
                                    </span>
                                </div>
                            </label>
                        </div>
                        {errors.declaration && (
                            <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                {errors.declaration}
                            </p>
                        )}
                    </div>
                </form>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100">
                <p className="text-[11px] font-medium text-[#4c739a]">Pastikan semua data yang diisi sudah benar sebelum mengirim.</p>
                <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-100 hover:bg-primary-hover transition-all flex items-center justify-center gap-2"
                >
                    Kirim Form Administrasi
                    <span className="material-symbols-outlined notranslate text-[18px]">send</span>
                </button>
            </div>
        </div>
    );
};

export default AdministrationForm;

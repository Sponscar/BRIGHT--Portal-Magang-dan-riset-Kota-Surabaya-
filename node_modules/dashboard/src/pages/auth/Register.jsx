import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../context/AuthContext';
import universities from '../../data/universities';
import { provinces, kotaKabupatenJawaTimur, kecamatanKelurahanSurabaya } from '../../data/regions';
import { perangkatDaerah } from '../../data/perangkatDaerah';
import Swal from 'sweetalert2';

// Reusable searchable dropdown component (defined outside Register to avoid re-creation on every render)
const SearchableDropdown = ({ label, icon, id, placeholder, value, onSearchChange, showDropdown, onFocus, items, onSelect, manualOption, dropdownRef, readOnly = false, error }) => (
    <div className="space-y-1.5" ref={dropdownRef}>
        <label className="text-sm font-semibold text-[#1b140d]" htmlFor={id}>{label}</label>
        <div className="relative group">
            <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors z-10 ${error ? 'text-rose-500' : 'text-gray-400 group-focus-within:text-primary'}`}>
                <span className="material-symbols-outlined notranslate text-[20px]">{icon}</span>
            </div>
            <input
                id={id}
                className={`w-full pl-11 pr-10 py-3 border rounded-xl text-sm text-[#1b140d] placeholder-gray-400 focus:outline-none transition-all ${
                    error ? 'border-rose-300 bg-rose-50/30 focus:border-rose-400 focus:ring-1 focus:ring-rose-400' :
                    readOnly ? 'bg-green-50 border-gray-200' : 'bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                }`}
                placeholder={placeholder}
                type="text"
                value={value}
                onChange={onSearchChange}
                onFocus={onFocus}
                readOnly={readOnly}
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <span className="material-symbols-outlined notranslate text-[20px]">{showDropdown ? 'expand_less' : 'expand_more'}</span>
            </div>
            {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-[220px] overflow-y-auto w-[calc(100%+20px)] md:w-full">
                    {items.length > 0 ? items.slice(0, 30).map((item, idx) => (
                        <button key={idx} type="button"
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-primary transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
                            onClick={() => onSelect(item)}>
                            {typeof item === 'object' ? item.nama : item}
                        </button>
                    )) : <div className="px-4 py-3 text-sm text-gray-400 text-center">Tidak ada data ditemukan</div>}
                    {manualOption && (
                        <button type="button"
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2 cursor-pointer border-t border-gray-100 bg-gray-50/50"
                            onClick={manualOption.onClick}>
                            <span className="material-symbols-outlined notranslate text-[16px] text-blue-500">edit</span>
                            <span className="font-medium text-blue-600">{manualOption.label}</span>
                        </button>
                    )}
                </div>
            )}
        </div>
        {error && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1">
                <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                {error}
            </p>
        )}
    </div>
);

// Simple input field component (defined outside Register to avoid re-creation on every render)
const InputField = ({ label, icon, id, placeholder, type = "text", value, onChange, readOnly = false, bgClass = "bg-gray-50", maxLength, inputMode, error }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-semibold text-[#1b140d]" htmlFor={id}>{label}</label>
        <div className="relative group">
            <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-rose-500' : 'text-gray-400 group-focus-within:text-primary'}`}>
                <span className="material-symbols-outlined notranslate text-[20px]">{icon}</span>
            </div>
            <input 
                className={`w-full pl-11 pr-4 py-3 border rounded-xl text-sm text-[#1b140d] placeholder-gray-400 focus:outline-none transition-all ${
                    error ? 'border-rose-300 bg-rose-50/30 focus:border-rose-400 focus:ring-1 focus:ring-rose-400' :
                    `${bgClass} border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary`
                }`}
                id={id} placeholder={placeholder} type={type} value={value} onChange={onChange} readOnly={readOnly} maxLength={maxLength} inputMode={inputMode} />
        </div>
        {error && (
            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1">
                <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                {error}
            </p>
        )}
    </div>
);

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        nik: '',
        university: '',
        major: '',
        nim: '',
        email: '',
        phone: '',
        whatsapp: '',
        provinsi: '',
        kotaKabupaten: '',
        kecamatan: '',
        kelurahan: '',
        alamatLengkap: '',
        universityAddress: '',
        uniKelurahan: '',
        uniKecamatan: '',
        dosenPembimbing: '',
        dosenPhone: '',
        dosenWhatsapp: '',
        kategoriPengajuan: '',
        internshipType: '',
        judulRiset: '',
        perangkatDaerah: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // University Dropdown State
    const [uniSearch, setUniSearch] = useState('');
    const [showUniDropdown, setShowUniDropdown] = useState(false);
    const [isManualUni, setIsManualUni] = useState(false);
    const uniDropdownRef = useRef(null);

    // Location Dropdown States
    const [showProvinsiDropdown, setShowProvinsiDropdown] = useState(false);
    const [provinsiSearch, setProvinsiSearch] = useState('');
    const provinsiRef = useRef(null);

    const [showKotaDropdown, setShowKotaDropdown] = useState(false);
    const [kotaSearch, setKotaSearch] = useState('');
    const kotaRef = useRef(null);

    const [showKecamatanDropdown, setShowKecamatanDropdown] = useState(false);
    const [kecamatanSearch, setKecamatanSearch] = useState('');
    const kecamatanRef = useRef(null);

    const [showKelurahanDropdown, setShowKelurahanDropdown] = useState(false);
    const [kelurahanSearch, setKelurahanSearch] = useState('');
    const kelurahanRef = useRef(null);

    // Perangkat Daerah Kota Surabaya Dropdown State
    const [showPerangkatDropdown, setShowPerangkatDropdown] = useState(false);
    const [perangkatSearch, setPerangkatSearch] = useState('');
    const perangkatRef = useRef(null);

    // Derived: is Jawa Timur selected?
    const isJawaTimur = formData.provinsi === 'Jawa Timur';
    // Derived: is Kota Surabaya selected?
    const isSurabaya = formData.kotaKabupaten === 'Kota Surabaya';

    // Filter data
    const filteredUniversities = universities.filter(uni =>
        uni.nama.toLowerCase().includes(uniSearch.toLowerCase())
    );
    const filteredProvinces = provinces.filter(p =>
        p.toLowerCase().includes(provinsiSearch.toLowerCase())
    );
    const filteredKota = kotaKabupatenJawaTimur.filter(k =>
        k.toLowerCase().includes(kotaSearch.toLowerCase())
    );
    const kecamatanList = Object.keys(kecamatanKelurahanSurabaya).sort();
    const filteredKecamatan = kecamatanList.filter(k =>
        k.toLowerCase().includes(kecamatanSearch.toLowerCase())
    );
    const kelurahanList = formData.kecamatan && kecamatanKelurahanSurabaya[formData.kecamatan]
        ? kecamatanKelurahanSurabaya[formData.kecamatan]
        : [];
    const filteredKelurahan = kelurahanList.filter(k =>
        k.toLowerCase().includes(kelurahanSearch.toLowerCase())
    );
    const filteredPerangkat = perangkatDaerah.filter(p =>
        p.toLowerCase().includes(perangkatSearch.toLowerCase())
    );

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (uniDropdownRef.current && !uniDropdownRef.current.contains(event.target)) setShowUniDropdown(false);
            if (provinsiRef.current && !provinsiRef.current.contains(event.target)) setShowProvinsiDropdown(false);
            if (kotaRef.current && !kotaRef.current.contains(event.target)) setShowKotaDropdown(false);
            if (kecamatanRef.current && !kecamatanRef.current.contains(event.target)) setShowKecamatanDropdown(false);
            if (kelurahanRef.current && !kelurahanRef.current.contains(event.target)) setShowKelurahanDropdown(false);
            if (perangkatRef.current && !perangkatRef.current.contains(event.target)) setShowPerangkatDropdown(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const handleNumberChange = (e) => {
        const { id, value } = e.target;
        const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        setFormData(prev => ({ ...prev, [id]: numericValue }));
        if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }));
    };

    // --- University handlers ---
    const handleUniversitySelect = (uni) => {
        setFormData(prev => ({
            ...prev,
            university: uni.nama,
            universityAddress: uni.alamat,
            uniKelurahan: uni.kelurahan,
            uniKecamatan: uni.kecamatan
        }));
        setUniSearch(uni.nama);
        setShowUniDropdown(false);
        setIsManualUni(false);
    };
    const handleManualUni = () => {
        setIsManualUni(true);
        setShowUniDropdown(false);
        setFormData(prev => ({ ...prev, university: uniSearch, universityAddress: '', uniKelurahan: '', uniKecamatan: '' }));
    };
    const handleUniSearchChange = (e) => {
        setUniSearch(e.target.value);
        setShowUniDropdown(true);
        setFormData(prev => ({ ...prev, university: e.target.value }));
    };

    // --- Location handlers ---
    const handleProvinsiSelect = (prov) => {
        setFormData(prev => ({ ...prev, provinsi: prov, kotaKabupaten: '', kecamatan: '', kelurahan: '' }));
        setProvinsiSearch(prov);
        setKotaSearch('');
        setKecamatanSearch('');
        setKelurahanSearch('');
        setShowProvinsiDropdown(false);
        if (errors.provinsi) setErrors(prev => ({ ...prev, provinsi: '' }));
    };
    const handleKotaSelect = (kota) => {
        setFormData(prev => ({ ...prev, kotaKabupaten: kota, kecamatan: '', kelurahan: '' }));
        setKotaSearch(kota);
        setKecamatanSearch('');
        setKelurahanSearch('');
        setShowKotaDropdown(false);
        if (errors.kotaKabupaten) setErrors(prev => ({ ...prev, kotaKabupaten: '' }));
    };
    const handleKecamatanSelect = (kec) => {
        setFormData(prev => ({ ...prev, kecamatan: kec, kelurahan: '' }));
        setKecamatanSearch(kec);
        setKelurahanSearch('');
        setShowKecamatanDropdown(false);
        if (errors.kecamatan) setErrors(prev => ({ ...prev, kecamatan: '' }));
    };
    const handleKelurahanSelect = (kel) => {
        setFormData(prev => ({ ...prev, kelurahan: kel }));
        setKelurahanSearch(kel);
        setShowKelurahanDropdown(false);
        if (errors.kelurahan) setErrors(prev => ({ ...prev, kelurahan: '' }));
    };
    const handlePerangkatSelect = (pd) => {
        setFormData(prev => ({ ...prev, perangkatDaerah: pd }));
        setPerangkatSearch(pd);
        setShowPerangkatDropdown(false);
        if (errors.perangkatDaerah) setErrors(prev => ({ ...prev, perangkatDaerah: '' }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName) newErrors.fullName = 'Nama Lengkap wajib diisi.';
        
        if (!formData.nik) {
            newErrors.nik = 'NIK wajib diisi.';
        } else if (formData.nik.length < 16) {
            newErrors.nik = 'NIK harus 16 digit.';
        }

        if (!formData.phone) {
            newErrors.phone = 'No. Telp Aktif wajib diisi.';
        } else if (formData.phone.length < 10) {
            newErrors.phone = 'No. Telp minimal 10 digit.';
        }

        if (!formData.whatsapp) {
            newErrors.whatsapp = 'No. WhatsApp wajib diisi.';
        } else if (formData.whatsapp.length < 10) {
            newErrors.whatsapp = 'No. WhatsApp minimal 10 digit.';
        }

        if (!formData.provinsi) newErrors.provinsi = 'Provinsi wajib dipilih/diisi.';
        if (!formData.kotaKabupaten) newErrors.kotaKabupaten = 'Kota/Kabupaten wajib dipilih/diisi.';
        if (!formData.kecamatan) newErrors.kecamatan = 'Kecamatan wajib dipilih/diisi.';
        if (!formData.kelurahan) newErrors.kelurahan = 'Kelurahan wajib dipilih/diisi.';
        if (!formData.alamatLengkap) newErrors.alamatLengkap = 'Alamat Lengkap wajib diisi.';

        if (!formData.university) newErrors.university = 'Perguruan Tinggi wajib dipilih/diisi.';
        if (!formData.major) newErrors.major = 'Program Studi wajib diisi.';
        if (!formData.nim) newErrors.nim = 'NIM / NPM wajib diisi.';
        if (!formData.universityAddress) newErrors.universityAddress = 'Alamat Perguruan Tinggi wajib diisi.';
        if (!formData.uniKelurahan) newErrors.uniKelurahan = 'Kelurahan Kampus wajib diisi.';
        if (!formData.uniKecamatan) newErrors.uniKecamatan = 'Kecamatan Kampus wajib diisi.';
        
        if (!formData.dosenPembimbing) newErrors.dosenPembimbing = 'Dosen Pembimbing wajib diisi.';
        if (!formData.dosenPhone) {
            newErrors.dosenPhone = 'No. Telp Dosen wajib diisi.';
        } else if (formData.dosenPhone.length < 10) {
            newErrors.dosenPhone = 'No. Telp Dosen minimal 10 digit.';
        }

        if (!formData.dosenWhatsapp) {
            newErrors.dosenWhatsapp = 'No. WhatsApp Dosen wajib diisi.';
        } else if (formData.dosenWhatsapp.length < 10) {
            newErrors.dosenWhatsapp = 'No. WhatsApp Dosen minimal 10 digit.';
        }

        if (!formData.kategoriPengajuan) {
            newErrors.kategoriPengajuan = 'Jenis Pengajuan wajib dipilih.';
        }
        if (!formData.internshipType) {
            if (formData.kategoriPengajuan === 'Riset') {
                newErrors.internshipType = 'Jenis Riset wajib dipilih.';
            } else if (formData.kategoriPengajuan === 'Magang') {
                newErrors.internshipType = 'Jenis Magang wajib dipilih.';
            }
        }
        if (formData.kategoriPengajuan === 'Riset' && !formData.judulRiset) {
            newErrors.judulRiset = 'Judul Riset wajib diisi.';
        }
        if (!formData.perangkatDaerah) newErrors.perangkatDaerah = 'Lokus Perangkat Daerah wajib dipilih.';
        if (!formData.email) newErrors.email = 'Alamat Email wajib diisi.';
        
        if (!formData.password) {
             newErrors.password = 'Kata Sandi wajib diisi.';
        }
        
        if (!formData.confirmPassword) {
             newErrors.confirmPassword = 'Konfirmasi Sandi wajib diisi.';
        } else if (formData.password !== formData.confirmPassword) {
             newErrors.confirmPassword = 'Kata Sandi dan Konfirmasi tidak cocok.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
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
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Simpan ke daftar registered users
        registerUser({
            email: formData.email,
            password: formData.password,
            name: formData.fullName,
            fullName: formData.fullName,
            nik: formData.nik,
            phone: formData.phone,
            whatsapp: formData.whatsapp,
            provinsi: formData.provinsi,
            kotaKabupaten: formData.kotaKabupaten,
            kecamatan: formData.kecamatan,
            kelurahan: formData.kelurahan,
            alamatLengkap: formData.alamatLengkap,
            university: formData.university,
            major: formData.major,
            nim: formData.nim,
            universityAddress: formData.universityAddress,
            kategoriPengajuan: formData.kategoriPengajuan,
            internshipType: formData.internshipType,
            judulRiset: formData.judulRiset,
            perangkatDaerah: formData.perangkatDaerah,
        });

        Swal.fire({
            icon: 'success',
            title: 'Registrasi Berhasil!',
            text: 'Silakan login dengan email dan password yang telah didaftarkan.',
            confirmButtonColor: '#2563eb'
        }).then(() => {
            navigate('/login');
        });
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col lg:flex-row bg-white">
            {/* Left Section - Hero/Branding */}
            <div className="relative lg:w-1/2 w-full bg-primary flex flex-col p-8 lg:p-16 overflow-hidden min-h-[300px] lg:h-screen lg:sticky lg:top-0">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/80 to-primary/40 z-10 mix-blend-multiply"></div>
                    <img className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2KHqgMTjuWkZhKbNivOWogal5iGNZ3YV8bK9x36iGiXBD-hW_ayQSSm3bgZK_r5cyAZzcUoJiuhTsupXR1Rn9S4iRxKHKOxD19iQHqjMWEf5KW3cqOTrKf-vIaszUWBqgf8s-q9jvLaO23OaXAqbkFH5FjZmFhFNSDSAAl3D10cK7rawHvu3DV8p2OAl_lrIn6WSk4C2E4fPMaeVaD3n9JgJf0EDwVFhnKQ08jdlc855hnJbaPBywqV8l4HU07CLn8xRKdaU8wSvW"
                        alt="Abstract red topographic pattern" />
                </div>
                <div className="relative z-20 flex items-center gap-3 flex-none mb-8">
                    <div className="bg-white p-2 rounded-lg inline-flex items-center justify-center">
                        <img src="/logo1.png" alt="Logo 1" className="h-10 w-auto object-contain" />
                        <img src="/logo.png" alt="BRIGHT Logo" className="h-10 w-auto object-contain" />
                    </div>
                    <span className="text-white text-xl font-bold tracking-tight">BRIGHT<br></br>Surabaya</span>
                </div>
                <div className="relative z-20 flex-1 flex flex-col items-start pt-4 lg:pt-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        <span className="text-white/90 text-xs font-medium tracking-wide uppercase">Brida Internship Growth & Holisting Training</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-6">
                        Mendorong Riset dan Inovasi Berdampak<br />Untuk Surabaya.
                    </h1>
                    <p className="text-white/80 text-lg max-w-md leading-relaxed">
                        Platform terintegrasi untuk pengelolaan data magang, riset, dan inovasi daerah Kota Surabaya.
                    </p>
                </div>
            </div>

            {/* Right Section - Register Form */}
            <div
                className="lg:w-1/2 w-full relative flex flex-col justify-center items-center p-6 lg:p-12 bg-white animate-paper-tear-right"
            >
                <div id="register-card" className="w-full max-w-[520px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden my-4 relative">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-100">
                        <Link to="/login" className="flex-1 py-4 text-center relative group hover:bg-gray-50 transition-colors">
                            <span className="text-gray-400 font-bold text-sm tracking-wide group-hover:text-gray-600 transition-colors">Masuk</span>
                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-transparent group-hover:bg-gray-200 transition-colors rounded-t-full"></span>
                        </Link>
                        <div className="flex-1 py-4 text-center relative group">
                            <span className="text-primary font-bold text-sm tracking-wide">Daftar</span>
                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full"></span>
                        </div>
                    </div>

                    <div className="p-8 lg:p-10">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-[#1b140d] mb-2">Registrasi Akun</h2>
                            <p className="text-gray-500 text-sm leading-relaxed">Lengkapi data diri anda untuk bergabung dalam BRIGHT (Brida Riset and Internship Growth & Holisting Training).</p>
                        </div>

                        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                            {/* ============================================ */}
                            {/* SECTION 1: DATA DIRI */}
                            {/* ============================================ */}
                            <div className="pt-2">
                                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined notranslate text-[14px]">person</span>
                                    Data Diri
                                </p>
                            </div>

                            {/* Nama Lengkap */}
                            <InputField label="Nama Lengkap" icon="person" id="fullName" placeholder="Nama Lengkap Anda" value={formData.fullName} onChange={handleChange} error={errors.fullName} />

                            {/* NIK */}
                            <InputField label="NIK (Nomor Induk Kependudukan)" icon="badge" id="nik" type="tel" placeholder="16 Digit NIK Anda" value={formData.nik} onChange={handleNumberChange} maxLength={16} inputMode="numeric" error={errors.nik} />

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full">
                                    <InputField label="No. Telp Aktif" icon="call" id="phone" type="tel" placeholder="08xxxxxxxxxx" value={formData.phone} onChange={handleNumberChange} maxLength={13} inputMode="numeric" error={errors.phone} />
                                </div>
                                <div className="w-full">
                                    <InputField label="No. WhatsApp *" icon="mark_chat_unread" id="whatsapp" type="tel" placeholder="Contoh: 081234567890" value={formData.whatsapp} onChange={handleNumberChange} inputMode="numeric" error={errors.whatsapp} />
                                </div>
                            </div>

                            {/* ============================================ */}
                            {/* SECTION 2: ALAMAT DOMISILI */}
                            {/* ============================================ */}
                            <div className="border-t border-gray-100 pt-4 mt-2">
                                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined notranslate text-[14px]">home</span>
                                    Alamat Domisili
                                </p>
                            </div>

                            {/* Provinsi */}
                            <SearchableDropdown
                                id="provinsi"
                                label="Provinsi" icon="public" placeholder="Cari provinsi..."
                                value={provinsiSearch}
                                onSearchChange={(e) => { setProvinsiSearch(e.target.value); setShowProvinsiDropdown(true); if(errors.provinsi) setErrors(prev => ({...prev, provinsi: ''})); }}
                                showDropdown={showProvinsiDropdown}
                                onFocus={() => setShowProvinsiDropdown(true)}
                                items={filteredProvinces}
                                onSelect={handleProvinsiSelect}
                                dropdownRef={provinsiRef}
                                error={errors.provinsi}
                            />

                            {/* Kota / Kabupaten */}
                            {isJawaTimur ? (
                                <SearchableDropdown
                                    id="kotaKabupaten"
                                    label="Kota / Kabupaten" icon="location_city" placeholder="Cari kota/kabupaten..."
                                    value={kotaSearch}
                                    onSearchChange={(e) => { setKotaSearch(e.target.value); setShowKotaDropdown(true); if(errors.kotaKabupaten) setErrors(prev => ({...prev, kotaKabupaten: ''})); }}
                                    showDropdown={showKotaDropdown}
                                    onFocus={() => setShowKotaDropdown(true)}
                                    items={filteredKota}
                                    onSelect={handleKotaSelect}
                                    dropdownRef={kotaRef}
                                    error={errors.kotaKabupaten}
                                />
                            ) : (
                                <InputField label="Kota / Kabupaten" icon="location_city" id="kotaKabupaten" placeholder="Masukkan kota/kabupaten" value={formData.kotaKabupaten} onChange={handleChange} error={errors.kotaKabupaten} />
                            )}

                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Kecamatan */}
                                <div className="w-full">
                                    {isSurabaya ? (
                                        <SearchableDropdown
                                            id="kecamatan"
                                            label="Kecamatan" icon="map" placeholder="Cari kecamatan..."
                                            value={kecamatanSearch}
                                            onSearchChange={(e) => { setKecamatanSearch(e.target.value); setShowKecamatanDropdown(true); if(errors.kecamatan) setErrors(prev => ({...prev, kecamatan: ''})); }}
                                            showDropdown={showKecamatanDropdown}
                                            onFocus={() => setShowKecamatanDropdown(true)}
                                            items={filteredKecamatan}
                                            onSelect={handleKecamatanSelect}
                                            dropdownRef={kecamatanRef}
                                            error={errors.kecamatan}
                                        />
                                    ) : (
                                        <InputField label="Kecamatan" icon="map" id="kecamatan" placeholder="Masukkan kecamatan" value={formData.kecamatan} onChange={handleChange} error={errors.kecamatan} />
                                    )}
                                </div>
                                {/* Kelurahan */}
                                <div className="w-full">
                                    {isSurabaya && formData.kecamatan && kecamatanKelurahanSurabaya[formData.kecamatan] ? (
                                        <SearchableDropdown
                                            id="kelurahan"
                                            label="Kelurahan" icon="pin_drop" placeholder="Cari kelurahan..."
                                            value={kelurahanSearch}
                                            onSearchChange={(e) => { setKelurahanSearch(e.target.value); setShowKelurahanDropdown(true); if(errors.kelurahan) setErrors(prev => ({...prev, kelurahan: ''})); }}
                                            showDropdown={showKelurahanDropdown}
                                            onFocus={() => setShowKelurahanDropdown(true)}
                                            items={filteredKelurahan}
                                            onSelect={handleKelurahanSelect}
                                            dropdownRef={kelurahanRef}
                                            error={errors.kelurahan}
                                        />
                                    ) : (
                                        <InputField label="Kelurahan" icon="pin_drop" id="kelurahan" placeholder="Masukkan kelurahan" value={formData.kelurahan} onChange={handleChange} error={errors.kelurahan} />
                                    )}
                                </div>
                            </div>

                            {/* Alamat Lengkap */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-[#1b140d]" htmlFor="alamatLengkap">Alamat Lengkap</label>
                                <textarea className={`w-full px-4 py-3 border rounded-xl text-sm text-[#1b140d] placeholder-gray-400 focus:outline-none transition-all resize-none ${
                                    errors.alamatLengkap ? 'border-rose-300 bg-rose-50/30 focus:border-rose-400 focus:ring-1 focus:ring-rose-400' : 'bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                }`}
                                    id="alamatLengkap" placeholder="Nama Jalan, RT/RW, No. Rumah..." rows="3" value={formData.alamatLengkap} onChange={handleChange} />
                                {errors.alamatLengkap && (
                                    <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1">
                                        <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                        {errors.alamatLengkap}
                                    </p>
                                )}
                            </div>

                            {/* ============================================ */}
                            {/* SECTION 3: DATA PERGURUAN TINGGI */}
                            {/* ============================================ */}
                            <div className="border-t border-gray-100 pt-4 mt-2">
                                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined notranslate text-[14px]">school</span>
                                    Data Perguruan Tinggi
                                </p>
                            </div>

                            {/* Perguruan Tinggi Dropdown */}
                            <div className="space-y-1.5" ref={uniDropdownRef}>
                                <label className="text-sm font-semibold text-[#1b140d]" htmlFor="university">Perguruan Tinggi</label>
                                <div className="relative group">
                                    <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors z-10 ${errors.university ? 'text-rose-500' : 'text-gray-400 group-focus-within:text-primary'}`}>
                                        <span className="material-symbols-outlined notranslate text-[20px]">school</span>
                                    </div>
                                    <input id="university" className={`w-full pl-11 pr-10 py-3 border rounded-xl text-sm text-[#1b140d] placeholder-gray-400 focus:outline-none transition-all ${
                                            errors.university ? 'border-rose-300 bg-rose-50/30 focus:border-rose-400 focus:ring-1 focus:ring-rose-400' : 'bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                        }`}
                                        placeholder="Cari atau ketik nama perguruan tinggi..." type="text" value={uniSearch}
                                        onChange={(e) => { handleUniSearchChange(e); if (errors.university) setErrors(prev => ({ ...prev, university: '' })); }} onFocus={() => setShowUniDropdown(true)} />
                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                        <span className="material-symbols-outlined notranslate text-[20px]">{showUniDropdown ? 'expand_less' : 'expand_more'}</span>
                                    </div>
                                    {showUniDropdown && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-[220px] overflow-y-auto w-[calc(100%+20px)] md:w-full">
                                            {filteredUniversities.slice(0, 20).map((uni, idx) => (
                                                <button key={idx} type="button"
                                                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-primary transition-colors border-b border-gray-50 last:border-0 flex items-start gap-3 cursor-pointer"
                                                    onClick={() => { handleUniversitySelect(uni); if (errors.university) setErrors(prev => ({ ...prev, university: '' })); }}>
                                                    <span className="material-symbols-outlined notranslate text-[16px] text-gray-400 mt-0.5 shrink-0">location_city</span>
                                                    <div><div className="font-medium text-[#1b140d]">{uni.nama}</div><div className="text-xs text-gray-400 mt-0.5">{uni.alamat}</div></div>
                                                </button>
                                            ))}
                                            <button type="button"
                                                className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2 cursor-pointer border-t border-gray-100 bg-gray-50/50"
                                                onClick={() => { handleManualUni(); if (errors.university) setErrors(prev => ({ ...prev, university: '' })); }}>
                                                <span className="material-symbols-outlined notranslate text-[16px] text-blue-500">edit</span>
                                                <span className="font-medium text-blue-600">Perguruan tinggi saya tidak ada di daftar (isi manual)</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {errors.university && (
                                    <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1">
                                        <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                        {errors.university}
                                    </p>
                                )}
                                {isManualUni && !errors.university && (
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="material-symbols-outlined notranslate text-[14px] text-blue-500">info</span>
                                        <span className="text-xs text-blue-600">Mode input manual — silakan isi data alamat kampus di bawah.</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Program Studi */}
                                <div className="w-full">
                                    <InputField label="Program Studi" icon="menu_book" id="major" placeholder="Jurusan" value={formData.major} onChange={handleChange} error={errors.major} />
                                </div>
                                {/* NIM */}
                                <div className="w-full">
                                    <InputField label="NIM / NPM" icon="pin" id="nim" type="tel" placeholder="Nomor Induk Mahasiswa" value={formData.nim} onChange={handleNumberChange} inputMode="numeric" error={errors.nim} />
                                </div>
                            </div>

                            {/* Alamat Perguruan Tinggi */}
                            <InputField label="Alamat Perguruan Tinggi" icon="location_on" id="universityAddress" placeholder="Alamat kampus"
                                value={formData.universityAddress} onChange={handleChange}
                                readOnly={!isManualUni && !!formData.universityAddress}
                                bgClass={!isManualUni && formData.universityAddress ? 'bg-green-50' : 'bg-gray-50'} error={errors.universityAddress} />

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full">
                                    <InputField label="Kelurahan Kampus" icon="map" id="uniKelurahan" placeholder="Kelurahan"
                                        value={formData.uniKelurahan} onChange={handleChange}
                                        readOnly={!isManualUni && !!formData.uniKelurahan}
                                        bgClass={!isManualUni && formData.uniKelurahan ? 'bg-green-50' : 'bg-gray-50'} error={errors.uniKelurahan} />
                                </div>
                                <div className="w-full">
                                    <InputField label="Kecamatan Kampus" icon="pin_drop" id="uniKecamatan" placeholder="Kecamatan"
                                        value={formData.uniKecamatan} onChange={handleChange}
                                        readOnly={!isManualUni && !!formData.uniKecamatan}
                                        bgClass={!isManualUni && formData.uniKecamatan ? 'bg-green-50' : 'bg-gray-50'} error={errors.uniKecamatan} />
                                </div>
                            </div>

                            {/* Dosen Pembimbing */}
                            <InputField label="Dosen Pembimbing / Promotor" icon="person_4" id="dosenPembimbing" placeholder="Nama Dosen Pembimbing" value={formData.dosenPembimbing} onChange={handleChange} error={errors.dosenPembimbing} />

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full">
                                    <InputField label="No. Telp Dosen" icon="call" id="dosenPhone" type="tel" placeholder="08xxxxxxxxxx" value={formData.dosenPhone} onChange={handleChange} error={errors.dosenPhone} />
                                </div>
                                <div className="w-full">
                                    <InputField label="No. WhatsApp Dosen *" icon="chat" id="dosenWhatsapp" type="tel" placeholder="Contoh: 081234567890" value={formData.dosenWhatsapp} onChange={handleNumberChange} inputMode="numeric" error={errors.dosenWhatsapp} />
                                </div>
                            </div>


                            {/* ============================================ */}
                            {/* SECTION 4: PENGAJUAN & KEAMANAN */}
                            {/* ============================================ */}
                            <div className="border-t border-gray-100 pt-4 mt-2">
                                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined notranslate text-[14px]">work</span>
                                    Pengajuan & Keamanan Akun
                                </p>
                            </div>

                            {/* Jenis Pengajuan */}
                            <div className="space-y-4">
                                {/* Kategori Pengajuan (Radio) */}
                                <div className="space-y-1.5" id="kategoriPengajuan">
                                    <label className="text-sm font-semibold text-[#1b140d]">Jenis Pengajuan <span className="text-rose-500">*</span></label>
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        {['Magang', 'Riset'].map(option => (
                                            <label
                                                key={option}
                                                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all w-full justify-center sm:justify-start ${formData.kategoriPengajuan === option
                                                    ? 'border-primary bg-blue-50/60 shadow-sm'
                                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="kategoriPengajuan"
                                                    value={option}
                                                    checked={formData.kategoriPengajuan === option}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            kategoriPengajuan: val,
                                                            internshipType: '', // Reset dropdown when category changes
                                                            judulRiset: ''
                                                        }));
                                                        setErrors(prev => ({
                                                            ...prev,
                                                            kategoriPengajuan: '',
                                                            internshipType: '',
                                                            judulRiset: ''
                                                        }));
                                                    }}
                                                    className="w-4 h-4 accent-primary"
                                                />
                                                <span className={`text-sm font-semibold ${formData.kategoriPengajuan === option ? 'text-primary' : 'text-slate-600'
                                                    }`}>
                                                    {option}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.kategoriPengajuan && (
                                        <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1">
                                            <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                            {errors.kategoriPengajuan}
                                        </p>
                                    )}
                                </div>

                                {/* Dropdown Sub-Jenis (Magang / Riset) */}
                                {formData.kategoriPengajuan && (
                                    <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300" id="internshipType">
                                        <label className="text-sm font-semibold text-[#1b140d]" htmlFor="internshipType">
                                            {formData.kategoriPengajuan === 'Riset' ? 'Jenis Riset' : 'Jenis Magang'}
                                        </label>
                                        <div className="relative group">
                                            <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors z-10 ${errors.internshipType ? 'text-rose-500' : 'text-gray-400 group-focus-within:text-primary'}`}>
                                                <span className="material-symbols-outlined notranslate text-[20px]">{formData.kategoriPengajuan === 'Riset' ? 'biotech' : 'work'}</span>
                                            </div>
                                            <select className={`w-full pl-11 pr-4 py-3 border rounded-xl text-sm text-[#1b140d] focus:outline-none transition-all appearance-none cursor-pointer relative z-0 ${
                                                errors.internshipType ? 'border-rose-300 bg-rose-50/30 focus:border-rose-400 focus:ring-1 focus:ring-rose-400' : 'bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                            }`}
                                                id="internshipType" value={formData.internshipType} onChange={handleChange}>
                                                <option value="" disabled>Pilih {formData.kategoriPengajuan === 'Riset' ? 'Jenis Riset' : 'Jenis Magang'}</option>
                                                {formData.kategoriPengajuan === 'Magang' ? (
                                                    <>
                                                        <option value="Magang KP">Magang KP (Kerja Praktik)</option>
                                                        <option value="Magang Berdampak">Magang Berdampak</option>
                                                        <option value="Magang Mandiri">Magang Mandiri</option>
                                                        <option value="Magang Riset">Magang Riset</option>
                                                    </>
                                                ) : (
                                                    <>
                                                        <option value="Skripsi / Tugas Akhir">Skripsi / Tugas Akhir</option>
                                                        <option value="Tesis">Tesis</option>
                                                        <option value="Disertasi">Disertasi</option>
                                                        <option value="Riset Bebas">Riset Bebas</option>
                                                        <option value="Riset Kolaborasi">Riset Kolaborasi</option>
                                                    </>
                                                )}
                                            </select>
                                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                                                <span className="material-symbols-outlined notranslate text-[20px]">expand_more</span>
                                            </div>
                                        </div>
                                        {errors.internshipType && (
                                            <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1">
                                                <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                                {errors.internshipType}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Judul Riset (Only if Riset is selected) */}
                                {formData.kategoriPengajuan === 'Riset' && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300" id="judulRiset">
                                        <InputField 
                                            label="Judul Riset" 
                                            icon="edit_document" 
                                            id="judulRiset" 
                                            placeholder="Masukkan judul riset Anda" 
                                            value={formData.judulRiset} 
                                            onChange={handleChange} 
                                            error={errors.judulRiset} 
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Perangkat Daerah Kota Surabaya */}
                            <SearchableDropdown
                                id="perangkatDaerah"
                                label="Lokus Perangkat Daerah Kota Surabaya" icon="account_balance" placeholder="Cari perangkat daerah kota surabaya..."
                                value={perangkatSearch}
                                onSearchChange={(e) => { setPerangkatSearch(e.target.value); setShowPerangkatDropdown(true); if(errors.perangkatDaerah) setErrors(prev => ({...prev, perangkatDaerah: ''})); }}
                                showDropdown={showPerangkatDropdown}
                                onFocus={() => setShowPerangkatDropdown(true)}
                                items={filteredPerangkat}
                                onSelect={handlePerangkatSelect}
                                dropdownRef={perangkatRef}
                                error={errors.perangkatDaerah}
                            />

                            {/* Alamat Email */}
                            <InputField label="Alamat Email" icon="mail" id="email" type="email" placeholder="nama@gmail.com" value={formData.email} onChange={handleChange} error={errors.email} />

                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Kata Sandi */}
                                <div className="space-y-1.5 w-full">
                                    <label className="text-sm font-semibold text-[#1b140d]" htmlFor="password">Kata Sandi</label>
                                    <div className="relative group">
                                        <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-rose-500' : 'text-gray-400 group-focus-within:text-primary'}`}>
                                            <span className="material-symbols-outlined notranslate text-[20px]">lock</span>
                                        </div>
                                        <input className={`w-full pl-11 pr-11 py-3 border rounded-xl text-sm text-[#1b140d] placeholder-gray-400 focus:outline-none transition-all ${
                                            errors.password ? 'border-rose-300 bg-rose-50/30 focus:border-rose-400 focus:ring-1 focus:ring-rose-400' : 'bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                        }`}
                                            id="password" placeholder="••••••••" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} />
                                        <button type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}>
                                            <span className="material-symbols-outlined notranslate text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1">
                                            <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                                {/* Konfirmasi Sandi */}
                                <div className="space-y-1.5 w-full">
                                    <label className="text-sm font-semibold text-[#1b140d]" htmlFor="confirmPassword">Konfirmasi Sandi</label>
                                    <div className="relative group">
                                        <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${errors.confirmPassword ? 'text-rose-500' : 'text-gray-400 group-focus-within:text-primary'}`}>
                                            <span className="material-symbols-outlined notranslate text-[20px]">lock_reset</span>
                                        </div>
                                        <input className={`w-full pl-11 pr-11 py-3 border rounded-xl text-sm text-[#1b140d] placeholder-gray-400 focus:outline-none transition-all ${
                                            errors.confirmPassword ? 'border-rose-300 bg-rose-50/30 focus:border-rose-400 focus:ring-1 focus:ring-rose-400' : 'bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                        }`}
                                            id="confirmPassword" placeholder="••••••••" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} />
                                        <button type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            <span className="material-symbols-outlined notranslate text-[20px]">{showConfirmPassword ? 'visibility' : 'visibility_off'}</span>
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1">
                                            <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button className="w-full py-3.5 px-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all duration-200 mt-2 flex items-center justify-center gap-2" type="submit">
                                <span>Daftar Sekarang</span>
                                <span className="material-symbols-outlined notranslate text-[18px]">person_add</span>
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        </div>
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Sudah memiliki akun?
                            <Link to="/login" className="font-bold text-primary hover:text-primary-hover transition-colors ml-1">Masuk sekarang</Link>
                        </p>
                    </div>
                </div>
                <div className="mt-8 lg:hidden opacity-60">
                    <p className="text-xs text-center text-gray-500">© 2026 BRIGHT - Badan Riset dan Inovasi Daerah Kota Surabaya. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Register;

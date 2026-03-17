import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = {};
        if (!email) newErrors.email = 'Email wajib diisi.';
        if (!password) newErrors.password = 'Kata Sandi wajib diisi.';

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
            return;
        }

        // Determine role based on email for the new UI which doesn't have a selector
        const role = email.includes('admin') ? 'admin' : 'student';

        // Check for registered user data
        let userData = {};
        const savedRegistration = localStorage.getItem('brida_latest_registration');
        if (savedRegistration) {
            const parsedReg = JSON.parse(savedRegistration);
            if (parsedReg.email === email && parsedReg.password === password) {
                userData = {
                    name: parsedReg.name,
                    phone: parsedReg.phone,
                    address: parsedReg.address,
                    university: parsedReg.university,
                    major: parsedReg.major,
                    internshipType: parsedReg.internshipType,
                    timKerja: parsedReg.timKerja
                };
            }
        }

        // If simply logging in without registration (demo purpose), allow it but use default name if not found
        // For admin, hardcode name
        if (role === 'admin') {
            userData = { name: 'Administrator' };
        }

        const user = login(email, password, role, userData);
        if (user.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/student');
        }
    };
    return (
        <div className="relative min-h-screen w-full flex flex-col lg:flex-row bg-white">
            {/* Left Section - Hero/Branding */}
            <div className="relative lg:w-1/2 w-full bg-primary flex flex-col p-8 lg:p-16 overflow-hidden min-h-[400px] lg:h-screen lg:sticky lg:top-0">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/80 to-primary/40 z-10 mix-blend-multiply"></div>
                    <img
                        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2KHqgMTjuWkZhKbNivOWogal5iGNZ3YV8bK9x36iGiXBD-hW_ayQSSm3bgZK_r5cyAZzcUoJiuhTsupXR1Rn9S4iRxKHKOxD19iQHqjMWEf5KW3cqOTrKf-vIaszUWBqgf8s-q9jvLaO23OaXAqbkFH5FjZmFhFNSDSAAl3D10cK7rawHvu3DV8p2OAl_lrIn6WSk4C2E4fPMaeVaD3n9JgJf0EDwVFhnKQ08jdlc855hnJbaPBywqV8l4HU07CLn8xRKdaU8wSvW"
                        alt="Abstract red topographic pattern"
                    />
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
                        Mendorong Riset dan Inovasi Berdampak<br />
                        Untuk Surabaya.
                    </h1>
                    <p className="text-white/80 text-lg max-w-md leading-relaxed">
                        Platform terintegrasi untuk pengelolaan data magang, riset, dan inovasi daerah Kota Surabaya.
                    </p>
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div
                className="lg:w-1/2 w-full relative flex flex-col justify-center items-center p-6 lg:p-12 bg-white animate-paper-tear-left"
            >
                <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">

                    {/* Tabs */}
                    <div className="flex border-b border-gray-100">
                        <a href="#" className="flex-1 py-4 text-center relative group" onClick={(e) => e.preventDefault()}>
                            <span className="text-primary font-bold text-sm tracking-wide">Masuk</span>
                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full"></span>
                        </a>
                        <Link to="/register" className="flex-1 py-4 text-center relative group hover:bg-gray-50 transition-colors">
                            <span className="text-gray-400 font-bold text-sm tracking-wide group-hover:text-gray-600 transition-colors">Daftar</span>
                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-transparent group-hover:bg-gray-200 transition-colors rounded-t-full"></span>
                        </Link>
                    </div>

                    <div className="p-8 lg:p-10">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-[#1b140d] mb-2">Selamat Datang Kembali</h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Silakan masukkan email dan password anda untuk mengakses dashboard.
                            </p>
                        </div>

                        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-[#1b140d]" htmlFor="email">Email</label>
                                <div className="relative group">
                                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined notranslate text-[20px]">mail</span>
                                    </div>
                                    <input
                                        className={`w-full pl-11 pr-4 py-3 border rounded-xl text-sm text-[#1b140d] placeholder-gray-400 focus:outline-none transition-all ${
                                            errors.email ? 'border-rose-300 bg-rose-50/30 focus:border-rose-400 focus:ring-1 focus:ring-rose-400' : 'bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                        }`}
                                        id="email"
                                        placeholder="nama@instansi.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                                        }}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1">
                                        <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-[#1b140d]" htmlFor="password">Kata Sandi</label>
                                <div className="relative group">
                                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined notranslate text-[20px]">lock</span>
                                    </div>
                                    <input
                                        className={`w-full pl-11 pr-11 py-3 border rounded-xl text-sm text-[#1b140d] placeholder-gray-400 focus:outline-none transition-all ${
                                            errors.password ? 'border-rose-300 bg-rose-50/30 focus:border-rose-400 focus:ring-1 focus:ring-rose-400' : 'bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary'
                                        }`}
                                        id="password"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined notranslate text-[20px]">
                                            {showPassword ? 'visibility' : 'visibility_off'}
                                        </span>
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1">
                                        <span className="material-symbols-outlined notranslate text-[14px]">error</span>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:border-primary checked:bg-primary transition-all" type="checkbox" />
                                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity">
                                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Ingat saya</span>
                                </label>
                                <a className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors" href="#">Lupa Kata Sandi?</a>
                            </div>

                            <button className="w-full py-4 px-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all duration-200 mt-2 flex items-center justify-center gap-2" type="submit">
                                <span>Masuk</span>
                                <span className="material-symbols-outlined notranslate text-[18px]">arrow_forward</span>
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Belum memiliki akun?
                            <Link to="/register" className="font-bold text-primary hover:text-primary-hover transition-colors ml-1">Daftar disini</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 hidden lg:block opacity-60">
                    <p className="text-xs text-center text-gray-500">
                        © 2026 BRIDA Surabaya. Hak Cipta Dilindungi.
                    </p>
                </div>
                <div className="mt-8 lg:hidden opacity-60">
                    <p className="text-xs text-center text-gray-500">
                        © 2026 BRIDA Surabaya.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

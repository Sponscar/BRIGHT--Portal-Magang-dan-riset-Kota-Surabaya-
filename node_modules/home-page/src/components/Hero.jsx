import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AgreementModal from './AgreementModal';

const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAgree = () => {
        window.location.href = "http://localhost:5173/login";
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-bg-gradient"></div>
            <div className="hero-container">
                <div className="hero-grid">
                    <div className="hero-text-content">
                        <div className="hero-badge">
                            <span className="hero-badge-dot"></span>
                            <span className="hero-badge-text">PORTAL MAGANG DAN RISET MAHASISWA</span>
                        </div>
                        <h1 className="hero-title text-white">
                            Brida Internship Growth &amp; Holisting Training <br className="hidden lg:block" />
                        </h1>
                        <p className="hero-description text-white/90">
                            Kembangkan potensi Anda melalui program magang dan riset yang berdampak langsung pada pembangunan Kota Surabaya.
                        </p>
                        <div className="hero-actions">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="btn-primary-lg"
                            >
                                Daftar Sekarang
                            </button>
                        </div>

                    </div>
                    <div className="hero-image-wrapper flex items-center justify-center">
                        <div className="relative w-full max-w-[500px] flex items-center justify-center animate-zoom-in-out">

                            <div className="relative z-10 w-full flex flex-col items-center h-full justify-center">
                                {/* The circular feedback UI */}
                                <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square flex items-center justify-center my-6 mx-auto">
                                    {/* Concentric circles background */}
                                    <div className="absolute inset-0 rounded-full border border-white/20"></div>
                                    <div className="absolute inset-6 rounded-full border border-white/30"></div>
                                    <div className="absolute inset-12 rounded-full border border-white/40"></div>
                                    <div className="absolute inset-16 rounded-full border-2 border-white/50 border-dashed animate-[spin_40s_linear_infinite]"></div>
                                    
                                    {/* Decorative dots on rings */}
                                    <div className="absolute inset-6 rounded-full animate-[spin_20s_linear_infinite_reverse]">
                                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_white]"></div>
                                        <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-blue-200 rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_8px_white]"></div>
                                    </div>
                                    
                                    {/* Center Text */}
                                    <Link to="/feedback" className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center flex-col text-[#2563eb] z-10 border-4 border-blue-100 overflow-hidden hover:scale-105 transition-transform duration-500 cursor-pointer group">
                                        <svg className="absolute w-[150%] h-[150%] -z-10 animate-[spin_20s_linear_infinite] opacity-10 group-hover:opacity-20 transition-opacity" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="3 6" />
                                            <circle cx="50" cy="50" r="38" fill="none" stroke="#2563eb" strokeWidth="0.5" />
                                        </svg>
                                        <span className="font-black text-sm sm:text-lg tracking-widest drop-shadow-sm z-10">FEEDBACK</span>
                                        <span className="font-bold text-[9px] sm:text-[11px] tracking-[0.2em] text-[#2563eb]/70 mt-1 z-10">BRIGHT</span>
                                    </Link>

                                    {/* Item 1: Profile (Top) */}
                                    <div className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
                                        <Link to="/feedback#profile" className="flex flex-col items-center group transition-all duration-300 hover:-translate-y-2 relative">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-md rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center border border-white/30 group-hover:border-white group-hover:bg-white transition-all duration-300 group-hover:scale-110 relative overflow-hidden z-20">
                                                <span className="material-symbols-outlined notranslate text-white group-hover:text-[#2563eb] text-xl sm:text-3xl relative z-10 transition-transform group-hover:rotate-12">info</span>
                                            </div>
                                            <div className="absolute top-full mt-2 text-center bg-white/95 px-3 py-1 rounded-lg backdrop-blur-sm shadow-md border border-slate-100 min-w-max z-10 opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                                                <span className="block text-[10px] sm:text-xs font-bold text-[#2563eb]">Apa itu BRIGHT</span>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Item 2: Rating (Bottom Right) */}
                                    <div className="absolute top-[85%] left-[90%] -translate-x-1/2 -translate-y-1/2 z-20">
                                        <Link to="/feedback#rating" className="flex flex-col items-center group transition-all duration-300 hover:-translate-y-2 hover:translate-x-2 relative">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-md rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center border border-white/30 group-hover:border-white group-hover:bg-white transition-all duration-300 group-hover:scale-110 relative overflow-hidden z-20">
                                                <span className="material-symbols-outlined notranslate text-white group-hover:text-[#2563eb] text-xl sm:text-3xl relative z-10 transition-transform group-hover:rotate-12">star_rate</span>
                                            </div>
                                            <div className="absolute top-1/2 right-full mr-2 -translate-y-1/2 text-center bg-white/95 px-3 py-1 rounded-lg backdrop-blur-sm shadow-md border border-slate-100 min-w-max z-10 opacity-0 group-hover:opacity-100 translate-x-[10px] group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
                                                <span className="block text-[10px] sm:text-xs font-bold text-[#2563eb]">Rating</span>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Item 3: Result (Bottom Left) */}
                                    <div className="absolute top-[85%] left-[10%] -translate-x-1/2 -translate-y-1/2 z-20">
                                        <Link to="/feedback#result" className="flex flex-col items-center group transition-all duration-300 hover:-translate-y-2 hover:-translate-x-2 relative">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-md rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-center border border-white/30 group-hover:border-white group-hover:bg-white transition-all duration-300 group-hover:scale-110 relative overflow-hidden z-20">
                                                <span className="material-symbols-outlined notranslate text-white group-hover:text-[#2563eb] text-xl sm:text-3xl relative z-10 transition-transform group-hover:scale-110">bar_chart</span>
                                            </div>
                                            <div className="absolute top-1/2 left-full ml-2 -translate-y-1/2 text-center bg-white/95 px-3 py-1 rounded-lg backdrop-blur-sm shadow-md border border-slate-100 min-w-max z-10 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
                                                <span className="block text-[10px] sm:text-xs font-bold text-[#2563eb]">Result</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-anim-blob-1">
                    <div className="hero-anim-shape-1"></div>
                </div>
                <div className="hero-anim-blob-2">
                    <div className="hero-anim-shape-2"></div>
                </div>
            </div>

            <AgreementModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAgree={handleAgree}
            />
        </section>
    );
};

export default Hero;

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
                            <span className="hero-badge-text">PORTAL MAGANG DAN PENELITIAN MAHASISWA</span>
                        </div>
                        <h1 className="hero-title text-white">
                            Brida Internship Growth &amp; Holisting Training <br className="hidden lg:block" />
                        </h1>
                        <p className="hero-description text-white/90">
                            Kembangkan potensi Anda melalui program magang dan penelitian yang berdampak langsung pada pembangunan Kota Surabaya.
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
                        <div className="relative w-full max-w-[600px] aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-2xl p-8 flex flex-col items-center justify-center text-center animate-zoom-in-out">

                            <div className="relative z-10 w-full flex flex-col items-center h-full justify-between py-4">
                                <h3 className="text-gray-800 font-bold text-xl tracking-widest mb-6 uppercase">Tugas dan Fungsi BRIGHT</h3>

                                <div className="grid grid-cols-3 gap-3 w-full mb-6">
                                    {/* Card 1: Kesekretariatan */}
                                    <Link to="/tusi#kesekretariatan" className="bg-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-3 aspect-square shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] cursor-pointer group hover:bg-white border border-transparent hover:border-blue-400">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all">
                                            <span className="material-symbols-outlined notranslate text-[#2563eb] text-xl">folder_shared</span>
                                        </div>
                                        <span className="text-xs font-bold text-gray-800 group-hover:text-[#2563eb] transition-colors">Kesekretariatan</span>
                                    </Link>

                                    {/* Card 2: Riset */}
                                    <Link to="/tusi#riset" className="bg-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-3 aspect-square shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] cursor-pointer group hover:bg-white border border-transparent hover:border-blue-400">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all">
                                            <span className="material-symbols-outlined notranslate text-[#2563eb] text-xl">science</span>
                                        </div>
                                        <span className="text-xs font-bold text-gray-800 group-hover:text-[#2563eb] transition-colors">Riset</span>
                                    </Link>

                                    {/* Card 3: Inovasi */}
                                    <Link to="/tusi#inovasi" className="bg-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-3 aspect-square shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] cursor-pointer group hover:bg-white border border-transparent hover:border-blue-400">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all">
                                            <span className="material-symbols-outlined notranslate text-[#2563eb] text-xl">lightbulb</span>
                                        </div>
                                        <span className="text-xs font-bold text-gray-800">Inovasi</span>
                                    </Link>
                                </div>

                                <Link to="/tusi" className="px-6 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-full shadow-lg transition-all flex items-center gap-1 group">
                                    <span>Info Selengkapnya</span>
                                    <span className="material-symbols-outlined notranslate text-[14px] group-hover:translate-x-0.5 transition-transform">double_arrow</span>
                                </Link>
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

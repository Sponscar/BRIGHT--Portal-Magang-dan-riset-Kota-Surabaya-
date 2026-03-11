
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import AgreementModal from '../components/AgreementModal';

const TusiBrida = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAgree = () => {
        window.location.href = "http://localhost:5173/login";
    };

    // Carousel Image Data
    const slides = [
        {
            id: 1,
            image: "/homepage1.jpg",
            alt: "BRIGHT Team"
        },
        {
            id: 2,
            image: "/balkot.jpg",
            alt: "Surabaya City Hall"
        },
        // Duplicate for loop effect if needed, or just more images
        {
            id: 3,
            image: "/mangrove.jpg",
            alt: "Mangrove"
        }
    ];

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // Scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle hash scrolling on mount
    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="font-sans antialiased text-slate-800 bg-white">

            {/* Custom Header */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className={`p-1 rounded-lg ${isScrolled ? '' : 'bg-white/90 backdrop-blur-sm'}`}>
                            <div className="flex items-center gap-2">
                                <img src="/logo1.png" alt="Logo 1" className="h-8 w-auto object-contain" />
                                <img src="/logo.png" alt="BRIGHT Logo" className="h-8 w-auto object-contain" />
                            </div>
                        </div>
                        <div className={`flex flex-col leading-none ${isScrolled ? 'text-slate-800' : 'text-white drop-shadow-md'}`}>
                            <span className="font-bold text-lg tracking-tight">BRIGHT</span>
                            <span className="text-[10px] font-bold tracking-widest uppercase opacity-90">Surabaya</span>
                        </div>
                    </div>

                    <nav className={`hidden md:flex gap-8 font-medium ${isScrolled ? 'text-slate-600' : 'text-white drop-shadow-sm'}`}>
                        <Link to="/" className="hover:text-[#2563eb] transition-colors">Beranda</Link>
                        <button onClick={() => scrollToSection('kesekretariatan')} className="hover:text-[#2563eb] transition-colors">Kesekretariatan</button>
                        <button onClick={() => scrollToSection('riset')} className="hover:text-[#2563eb] transition-colors">Riset</button>
                        <button onClick={() => scrollToSection('inovasi')} className="hover:text-[#2563eb] transition-colors">Inovasi</button>
                    </nav>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/30"
                    >
                        Login
                    </button>
                </div>
            </header>

            {/* Hero Carousel Section */}
            <section className="relative h-[600px] lg:h-[700px] overflow-hidden group">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                ))}

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-tight leading-tight">
                            TUGAS DAN FUNGSI DI <br /> <span className="text-white">BRIGHT</span>
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md font-light">
                            Mengenal lebih dekat peran setiap unit kerja dalam mengakselerasi ekosistem riset dan inovasi di Kota Surabaya.
                        </p>
                    </div>
                </div>

                {/* Carousel Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                >
                    <span className="material-symbols-outlined notranslate">chevron_left</span>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                >
                    <span className="material-symbols-outlined notranslate">chevron_right</span>
                </button>

                {/* Dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}`}
                        />
                    ))}
                </div>
            </section>

            {/* Content Cards Section */}
            <main className="max-w-7xl mx-auto px-6 py-24 space-y-16 -mt-20 relative z-20">

                {/* Kesekretariatan Card */}
                <section id="kesekretariatan" className="bg-white rounded-[2rem] shadow-xl p-8 lg:p-12 border border-slate-100 flex flex-col md:flex-row gap-8 items-start hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2563eb]">
                            <span className="material-symbols-outlined notranslate text-4xl">apartment</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Kesekretariatan</h2>
                        <p className="text-[#2563eb] text-xs font-bold tracking-widest uppercase mb-8">Struktur & Administrasi</p>

                        <div className="prose prose-slate max-w-none">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Deskripsi Fungsi dan Tugas</p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                <strong className="text-slate-900">Sekretariat</strong> mempunyai tugas merencanakan, melaksanakan, mengoordinasikan dan mengendalikan kegiatan administrasi umum, kepegawaian, perlengkapan, penyusunan program, keuangan, hubungan masyarakat dan protokol. Sekretariat juga bertugas memfasilitasi kebutuhan operasional seluruh bidang serta memastikan kelancaran administrasi perkantoran untuk mendukung kinerja organisasi secara keseluruhan melalui tata kelola yang transparan dan akuntabel.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tim Kerja Riset Card */}
                <section id="riset" className="bg-white rounded-[2rem] shadow-xl p-8 lg:p-12 border border-slate-100 flex flex-col md:flex-row gap-8 items-start hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2563eb]">
                            <span className="material-symbols-outlined notranslate text-4xl">science</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Tim Kerja Riset</h2>
                        <p className="text-[#2563eb] text-xs font-bold tracking-widest uppercase mb-8">Penelitian & Pengembangan</p>

                        <div className="prose prose-slate max-w-none">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Deskripsi Fungsi dan Tugas</p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Bidang <strong className="text-slate-900">Riset</strong> memiliki tugas melaksanakan kebijakan, fasilitasi, dan pembinaan kegiatan penelitian, pengembangan, pengkajian, dan penerapan ilmu pengetahuan dan teknologi di daerah. Tim ini berfokus pada penguatan peran IPTEK sebagai dasar perencanaan pembangunan yang akurat dan berbasis bukti (evidence-based policy), serta mendorong terciptanya budaya riset yang kuat di lingkungan pemerintah daerah guna menghasilkan rekomendasi kebijakan yang berdampak bagi masyarakat.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tim Kerja Inovasi Card */}
                <section id="inovasi" className="bg-white rounded-[2rem] shadow-xl p-8 lg:p-12 border border-slate-100 flex flex-col md:flex-row gap-8 items-start hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2563eb]">
                            <span className="material-symbols-outlined notranslate text-4xl">lightbulb</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Tim Kerja Inovasi</h2>
                        <p className="text-[#2563eb] text-xs font-bold tracking-widest uppercase mb-8">Ekosistem & Invensi</p>

                        <div className="prose prose-slate max-w-none">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Deskripsi Fungsi dan Tugas</p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Bidang Inovasi memiliki tugas melaksanakan kebijakan, fasilitasi, dan pembinaan kegiatan <strong className="text-slate-900">invensi</strong> dan <strong className="text-slate-900">inovasi</strong> di daerah. Fokus utama bidang ini adalah memperkuat ekosistem inovasi daerah, memfasilitasi pendaftaran Kekayaan Intelektual, mengelola Kebun Raya Daerah sebagai pusat konservasi dan edukasi, serta melakukan pemantauan dan evaluasi terhadap penerapan inovasi di masyarakat dan pemerintahan untuk memastikan keberlanjutan setiap terobosan yang dihasilkan.
                            </p>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <Footer />

            {/* Agreement Modal */}
            <AgreementModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAgree={handleAgree}
            />
        </div>
    );
};

export default TusiBrida;

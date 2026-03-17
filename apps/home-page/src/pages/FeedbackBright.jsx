import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import AgreementModal from '../components/AgreementModal';

const API_BASE = 'http://localhost:3001/api';

const FeedbackBright = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    // Rating form state
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [komentar, setKomentar] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // Result state
    const [results, setResults] = useState(null);
    const [loadingResults, setLoadingResults] = useState(false);

    const handleAgree = () => {
        window.location.href = "http://localhost:5173/login";
    };

    // Scroll effect for header
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle hash scrolling on mount
    useEffect(() => {
        if (window.location.hash) {
            const tab = window.location.hash.replace('#', '');
            if (['profile', 'rating', 'result'].includes(tab)) {
                setActiveTab(tab);
            }
        }
    }, []);

    // Fetch results when result tab is active
    useEffect(() => {
        if (activeTab === 'result') {
            fetchResults();
        }
    }, [activeTab]);

    const fetchResults = async () => {
        setLoadingResults(true);
        try {
            const res = await fetch(`${API_BASE}/feedback/results`);
            const data = await res.json();
            setResults(data);
        } catch (err) {
            console.error('Error fetching results:', err);
        } finally {
            setLoadingResults(false);
        }
    };

    const handleSubmitRating = async (e) => {
        e.preventDefault();
        setSubmitError('');
        if (!nama || !email || !rating) {
            setSubmitError('Nama, email, dan rating wajib diisi.');
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch(`${API_BASE}/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nama, email, rating, komentar }),
            });
            if (!res.ok) throw new Error('Gagal mengirim feedback');
            setSubmitSuccess(true);
            setNama(''); setEmail(''); setRating(0); setKomentar('');
            setTimeout(() => setSubmitSuccess(false), 4000);
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const emotesList = [
        { value: 1, emoji: '😠', label: 'Sangat Buruk' },
        { value: 2, emoji: '🙁', label: 'Buruk' },
        { value: 3, emoji: '😐', label: 'Cukup' },
        { value: 4, emoji: '🙂', label: 'Baik' },
        { value: 5, emoji: '😄', label: 'Sangat Baik' }
    ];

    const renderInteractiveEmotes = () => {
        return emotesList.map((emote) => {
            const isHovered = hoverRating === emote.value;
            const isSelected = rating === emote.value;
            const isActive = isHovered || (isSelected && hoverRating === 0);

            return (
                <div key={emote.value} className="flex flex-col items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setRating(emote.value)}
                        onMouseEnter={() => setHoverRating(emote.value)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`text-4xl md:text-5xl transition-all duration-300 transform ${
                            isActive
                                ? 'scale-125 drop-shadow-xl saturate-150 -translate-y-2'
                                : 'scale-100 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 hover:-translate-y-1'
                            }`}
                        title={emote.label}
                    >
                        {emote.emoji}
                    </button>
                    <span
                        className={`text-[10px] sm:text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                            isActive ? 'text-[#2563eb] opacity-100 translate-y-0' : 'text-slate-400 opacity-0 translate-y-2'
                        }`}
                    >
                        {emote.label}
                    </span>
                </div>
            );
        });
    };

    const getEmoteByValue = (val) => {
        const value = Math.round(val);
        return emotesList.find(e => e.value === value) || emotesList[2]; // Default to neutral if not found
    };

    const tabs = [
        { id: 'profile', label: 'Apa itu BRIGHT', icon: 'info' },
        { id: 'rating', label: 'Kuesioner Rating', icon: 'star_rate' },
        { id: 'result', label: 'Result', icon: 'bar_chart' },
    ];

    return (
        <div className="font-sans antialiased text-slate-800 bg-white">

            {/* Header */}
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
                        <button onClick={() => setActiveTab('profile')} className="hover:text-[#2563eb] transition-colors">Profile</button>
                        <button onClick={() => setActiveTab('rating')} className="hover:text-[#2563eb] transition-colors">Rating</button>
                        <button onClick={() => setActiveTab('result')} className="hover:text-[#2563eb] transition-colors">Result</button>
                    </nav>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/30"
                    >
                        Login
                    </button>
                </div>
            </header>

            {/* Hero Banner */}
            <section className="relative h-[400px] overflow-hidden">
                <img src="/balkot.jpg" alt="Surabaya" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/80 to-[#2563eb]/60"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">
                            Feedback BRIGHT
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Berikan penilaian Anda terhadap layanan BRIGHT untuk peningkatan kualitas program magang dan riset.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tab Navigation */}
            <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-3 ${activeTab === tab.id
                                    ? 'border-[#2563eb] text-[#2563eb] bg-blue-50/50'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                <span className="material-symbols-outlined notranslate text-lg">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* Profile BRIGHT */}
                {activeTab === 'profile' && (
                    <section id="profile" className="animate-fade-in">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <div>
                                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-[#2563eb] uppercase bg-blue-100 rounded-full">Tentang</span>
                                <h2 className="text-4xl font-bold text-slate-900 mb-6">Apa itu BRIGHT?</h2>
                                <p className="text-slate-600 leading-relaxed text-lg mb-6">
                                    <strong className="text-slate-900">BRIGHT</strong> (Brida Internship Growth & Holisting Training) adalah platform digital milik Badan Riset dan Inovasi Daerah (BRIDA) Kota Surabaya yang memfasilitasi kegiatan magang dan riset di seluruh Perangkat Daerah Kota Surabaya bagi mahasiswa.
                                </p>
                                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                                    Melalui BRIGHT, mahasiswa dapat mendaftar program magang, mengelola logbook harian, mengajukan laporan akhir, serta mendapatkan sertifikat resmi. Platform ini dirancang untuk mendukung kolaborasi antara pemerintah, akademisi, dan masyarakat dalam mendorong riset dan inovasi di Kota Surabaya.
                                </p>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { icon: 'groups', label: 'Kolaboratif', desc: 'Kerja sama lintas sektor' },
                                        { icon: 'trending_up', label: 'Inovatif', desc: 'Solusi berdampak nyata' },
                                        { icon: 'school', label: 'Edukatif', desc: 'Pengembangan kompetensi' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                                            <span className="material-symbols-outlined notranslate text-[#2563eb] text-3xl mb-2 block">{item.icon}</span>
                                            <p className="font-bold text-slate-800 text-sm">{item.label}</p>
                                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-[#2563eb] to-[#1e3a8a] rounded-2xl p-8 text-white shadow-xl">
                                    <h3 className="text-2xl font-bold mb-4">Visi</h3>
                                    <p className="text-white/90 leading-relaxed">
                                        Menjadi pusat unggulan riset dan inovasi daerah yang mendorong kemajuan dan kesejahteraan masyarakat Kota Surabaya melalui kolaborasi strategis dengan dunia akademik.
                                    </p>
                                </div>
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Misi</h3>
                                    <ul className="space-y-3">
                                        {[
                                            'Memfasilitasi program magang berkualitas bagi mahasiswa',
                                            'Mendorong riset yang berdampak pada pembangunan daerah',
                                            'Membangun ekosistem inovasi yang inklusif dan berkelanjutan',
                                            'Meningkatkan kualitas pelayanan publik melalui teknologi',
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-600">
                                                <span className="material-symbols-outlined notranslate text-[#2563eb] text-lg mt-0.5">check_circle</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Kuesioner Rating */}
                {activeTab === 'rating' && (
                    <section id="rating" className="animate-fade-in max-w-2xl mx-auto">
                        <div className="text-center mb-10">
                            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-[#2563eb] uppercase bg-blue-100 rounded-full">Kuesioner</span>
                            <h2 className="text-4xl font-bold text-slate-900 mb-3">Berikan Rating Anda</h2>
                            <p className="text-slate-500">Bantu kami meningkatkan kualitas layanan BRIGHT dengan memberikan penilaian Anda.</p>
                        </div>

                        {submitSuccess && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800">
                                <span className="material-symbols-outlined notranslate text-green-600">check_circle</span>
                                <span className="font-medium">Terima kasih! Feedback Anda berhasil dikirim.</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmitRating} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap <span className="text-blue-500">*</span></label>
                                <input
                                    type="text"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                    placeholder="Masukkan nama lengkap"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email <span className="text-blue-500">*</span></label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                    placeholder="Masukkan email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3 text-center md:text-left">Rating <span className="text-blue-500">*</span></label>
                                <div className="flex items-end justify-center gap-2 sm:gap-6 bg-slate-50 border border-slate-100 rounded-2xl p-6 min-h-[120px]">
                                    {renderInteractiveEmotes()}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Komentar (Opsional)</label>
                                <textarea
                                    value={komentar}
                                    onChange={(e) => setKomentar(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                                    rows={4}
                                    placeholder="Tuliskan komentar atau saran Anda..."
                                />
                            </div>

                            {submitError && (
                                <p className="text-sm text-red-600 flex items-center gap-2">
                                    <span className="material-symbols-outlined notranslate text-base">error</span>
                                    {submitError}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                        Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined notranslate text-lg">send</span>
                                        Kirim Feedback
                                    </>
                                )}
                            </button>
                        </form>
                    </section>
                )}

                {/* Result */}
                {activeTab === 'result' && (
                    <section id="result" className="animate-fade-in">
                        <div className="text-center mb-10">
                            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-[#2563eb] uppercase bg-blue-100 rounded-full">Hasil</span>
                            <h2 className="text-4xl font-bold text-slate-900 mb-3">Hasil Rating BRIGHT</h2>
                            <p className="text-slate-500">Rekapitulasi penilaian dari seluruh responden.</p>
                        </div>

                        {loadingResults ? (
                            <div className="flex items-center justify-center py-20">
                                <svg className="animate-spin h-10 w-10 text-[#2563eb]" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            </div>
                        ) : results ? (
                            <div className="space-y-8">
                                {/* Summary Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gradient-to-br from-[#2563eb] to-[#1e3a8a] rounded-2xl p-6 text-white shadow-xl text-center">
                                        <p className="text-white/70 text-sm font-medium mb-1">Rata-rata Rating</p>
                                        <p className="text-5xl font-bold">{results.averageRating}</p>
                                        <div className="flex justify-center mt-2 items-center gap-2">
                                            <span className="text-3xl drop-shadow-md animate-bounce">{getEmoteByValue(results.averageRating).emoji}</span>
                                            <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-md backdrop-blur-sm">{getEmoteByValue(results.averageRating).label}</span>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center flex flex-col items-center justify-center">
                                        <p className="text-slate-500 text-sm font-medium mb-1">Total Responden</p>
                                        <p className="text-5xl font-bold text-slate-900">{results.totalResponden}</p>
                                        <span className="material-symbols-outlined notranslate text-[#2563eb] text-3xl mt-2 block">groups</span>
                                    </div>
                                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center flex flex-col items-center justify-center">
                                        <p className="text-slate-500 text-sm font-medium mb-1">Rating Terbanyak</p>
                                        <p className="text-5xl font-bold text-slate-900 flex items-center gap-2">
                                            {results.totalResponden > 0 ? (
                                                <>
                                                    {getEmoteByValue(parseInt(Object.entries(results.distribution).sort((a, b) => b[1] - a[1])[0][0])).emoji}
                                                </>
                                            ) : '-'}
                                        </p>
                                        <span className="text-sm font-medium text-slate-500 mt-2 block">
                                            {results.totalResponden > 0 ? getEmoteByValue(parseInt(Object.entries(results.distribution).sort((a, b) => b[1] - a[1])[0][0])).label : 'Belum ada data'}
                                        </span>
                                    </div>
                                </div>

                                {/* Distribution */}
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6">Distribusi Rating</h3>
                                    <div className="space-y-4">
                                        {[5, 4, 3, 2, 1].map((star) => {
                                            const count = results.distribution[star] || 0;
                                            const percentage = results.totalResponden > 0 ? (count / results.totalResponden) * 100 : 0;
                                            return (
                                                <div key={star} className="flex items-center gap-4">
                                                    <span className="text-xl w-10 text-right" title={getEmoteByValue(star).label}>{getEmoteByValue(star).emoji}</span>
                                                    <div className="flex-1 bg-slate-100 rounded-full h-6 overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] rounded-full transition-all duration-700"
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-500 w-16 text-right">{count} ({percentage.toFixed(0)}%)</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Recent Feedback */}
                                {results.recentFeedback && results.recentFeedback.length > 0 && (
                                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                                        <h3 className="text-xl font-bold text-slate-900 mb-6">Feedback Terbaru</h3>
                                        <div className="space-y-4">
                                            {results.recentFeedback.map((fb) => (
                                                <div key={fb.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                                                    <div className="flex flex-col items-center justify-center shrink-0">
                                                        <span className="text-3xl" title={getEmoteByValue(fb.rating).label}>{getEmoteByValue(fb.rating).emoji}</span>
                                                        <span className="text-[10px] font-bold text-slate-500 mt-1">{getEmoteByValue(fb.rating).label}</span>
                                                    </div>
                                                    <div className="flex-1 border-l border-slate-200 pl-4 py-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-bold text-slate-800">{fb.nama}</span>
                                                            <span className="text-xs text-slate-400">• {new Date(fb.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                        </div>
                                                        <p className="text-sm text-slate-600 italic">"{fb.komentar || 'Tidak ada komentar'}"</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-slate-400">
                                <span className="material-symbols-outlined notranslate text-6xl mb-4 block">inbox</span>
                                <p className="text-lg font-medium">Belum ada data feedback</p>
                            </div>
                        )}
                    </section>
                )}
            </main>

            <Footer />

            <AgreementModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAgree={handleAgree}
            />
        </div>
    );
};

export default FeedbackBright;

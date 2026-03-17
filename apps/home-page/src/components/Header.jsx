import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScrollEvent = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScrollEvent);
        return () => window.removeEventListener('scroll', handleScrollEvent);
    }, []);

    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-0 backdrop-blur-sm' : 'bg-transparent py-2'}`}>
            <div className="header-inner">
                <div className="header-content">
                    <div className="header-logo-container">
                        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-slate-200 px-3 py-1.5 rounded-lg">
                            <img src="/logo1.png" alt="Logo 1" className="h-10 w-auto object-contain" />
                            <img src="/logo.png" alt="BRIGHT Logo" className="h-10 w-auto object-contain" />
                        </div>
                        <div className="header-logo-text-wrapper">
                            <h2 className={`text-xl font-bold tracking-tight leading-none transition-colors duration-300 ${isScrolled ? 'text-slate-900' : 'text-white'}`}>BRIGHT</h2>
                            <span className={`text-xs font-medium uppercase tracking-wider transition-colors duration-300 ${isScrolled ? 'text-slate-500' : 'text-white/80'}`}>Surabaya</span>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#home" onClick={(e) => handleScroll(e, 'home')} className={`text-sm font-medium transition-colors hover:opacity-75 ${isScrolled ? 'text-slate-600 hover:text-primary' : 'text-white'}`}>Beranda</a>
                        <a href="#about" onClick={(e) => handleScroll(e, 'about')} className={`text-sm font-medium transition-colors hover:opacity-75 ${isScrolled ? 'text-slate-600 hover:text-primary' : 'text-white'}`}>Tentang</a>
                        <a href="#timeline" onClick={(e) => handleScroll(e, 'timeline')} className={`text-sm font-medium transition-colors hover:opacity-75 ${isScrolled ? 'text-slate-600 hover:text-primary' : 'text-white'}`}>Alur</a>
                        <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className={`text-sm font-medium transition-colors hover:opacity-75 ${isScrolled ? 'text-slate-600 hover:text-primary' : 'text-white'}`}>Hubungi Kami</a>
                    </nav>


                </div>
            </div>
        </header>
    );
};

export default Header;

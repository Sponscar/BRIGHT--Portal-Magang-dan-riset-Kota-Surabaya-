import React from 'react';

const Header = () => {
    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="header-container">
            <div className="header-inner">
                <div className="header-content">
                    <div className="header-logo-container">
                        <img src="/logo1.png" alt="Logo 1" className="h-12 w-auto object-contain" />
                        <img src="/logo.png" alt="BRIGHT Logo" className="h-12 w-auto object-contain" />
                        <div className="header-logo-text-wrapper">
                            <h2 className="header-logo-text">BRIGHT</h2>
                            <span className="header-logo-sub">Surabaya</span>
                        </div>
                    </div>

                    <nav className="header-nav">
                        <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="header-nav-link">Beranda</a>
                        <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="header-nav-link">Tentang</a>
                        <a href="#timeline" onClick={(e) => handleScroll(e, 'timeline')} className="header-nav-link">Alur</a>
                        <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="header-nav-link">Hubungi Kami</a>
                    </nav>


                </div>
            </div>
        </header>
    );
};

export default Header;

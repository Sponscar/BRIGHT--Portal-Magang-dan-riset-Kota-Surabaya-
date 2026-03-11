import React, { useState } from 'react';
import AgreementModal from './AgreementModal';

const CTA = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAgree = () => {
        window.location.href = "http://localhost:5173/login";
    };

    return (
        <section className="cta-section">
            <div className="cta-card">
                <div className="cta-bg-wrapper">
                    <div className="cta-bg-gradient"></div>
                    <img src="/mangrove.jpg" alt="Students cheering" className="cta-bg-image" />
                </div>
                <div className="cta-content">
                    <h2 className="cta-title">Siap Berkontribusi?</h2>
                    <p className="cta-description">
                        Jadilah bagian dari solusi. Daftarkan proposal magang Anda sekarang dan berkontribusi untuk Kota Surabaya.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="cta-btn inline-block text-center decoration-0 cursor-pointer"
                    >
                        Daftar Sekarang
                    </button>
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

export default CTA;

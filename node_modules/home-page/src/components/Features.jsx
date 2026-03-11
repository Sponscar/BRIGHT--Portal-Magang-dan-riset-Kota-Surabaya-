import React from 'react';

const Features = () => {
    return (
        <section className="features-section">
            <div className="features-container">
                <div className="features-header">
                    <span className="features-tag">Keunggulan</span>
                    <h2 className="features-title">Riset dan Inovasi Bersama di BRIGHT</h2>
                </div>
                <div className="features-grid">
                    {[
                        { icon: "database", title: "Riset Solutif ", desc: "Pendekatan penelitian yang fokus mencari solusi nyata, dengan hasil bukti dan rekomendasi kebijakan praktis serta bermanfaat bagi masyarakat." },
                        { icon: "supervisor_account", title: "Inovasi Implementatif", desc: "Pembaruan yang langsung diterapkan untuk meningkatkan kualitas layanan publik dan memberikan dampak nyata bagi masyarakat." },
                        { icon: "verified", title: "Sertifikat Resmi", desc: "Sertifikat ini diberikan kepada mahasiswa yang telah menyelesaikan program magang di BRIGHT dengan baik, disiplin, dan penuh tanggung jawab." }
                    ].map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon-wrapper">
                                <span className="material-symbols-outlined notranslate text-4xl">{feature.icon}</span>
                            </div>
                            <div>
                                <h3 className="feature-card-title">{feature.title}</h3>
                                <p className="feature-card-desc">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

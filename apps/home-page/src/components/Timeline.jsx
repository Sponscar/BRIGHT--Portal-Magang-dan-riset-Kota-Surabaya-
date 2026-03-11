import React from 'react';

const TimelineStep = ({ number, icon, title, desc, active = false }) => (
    <div className="timeline-step-wrapper group">
        <div className="timeline-icon-box">
            {/* Line connector logic could be improved here but following visual replica */}
            <div className={`timeline-icon-base ${active ? 'timeline-icon-active' : 'timeline-icon-inactive'}`}>
                <span className="material-symbols-outlined notranslate text-2xl">{icon}</span>
            </div>
        </div>
        <div className="timeline-content">
            <h4 className="timeline-step-title">{title}</h4>
            <p className="timeline-step-desc">{desc}</p>
        </div>
    </div>
);

const MobileTimelineStep = ({ number, title, desc, active = false }) => (
    <div className="mobile-timeline-wrapper">
        <div className={`mobile-timeline-dot ${active ? 'mobile-timeline-dot-active' : 'mobile-timeline-dot-inactive'}`}>
            {number}
        </div>
        <h4 className="mobile-timeline-title">{title}</h4>
        <p className="mobile-timeline-desc">{desc}</p>
    </div>
);

const Timeline = () => {
    const steps = [
        { icon: "person_add", title: "Registrasi", desc: "Buat akun magang mahasiswa & isi data diri.", active: true },
        { icon: "upload_file", title: "Upload Dokumen Wajib", desc: "Kirim dokumen wajib magang" },
        { icon: "assignment_turned_in", title: "Verifikasi", desc: "Review oleh tim BRIGHT" },
        { icon: "handshake", title: "Penerimaan", desc: "Tanda terima magang" },
        { icon: "science", title: "Pelaksanaan", desc: "Mulai kegiatan riset dan inovasi magang" },
        { icon: "document_scanner", title: "Pelaporan", desc: "Laporkan hasil magang di BRIGHT" },
        { icon: "workspace_premium", title: "Sertifikat", desc: "Penerbitan Sertifikat Magang" }
    ];

    return (
        <section id="timeline" className="timeline-section">
            <div className="timeline-container">
                <div className="timeline-header">
                    <h2 className="timeline-title">Alur Magang BRIGHT</h2>
                    <p className="timeline-desc">Ikuti langkah mudah berikut untuk berkontribusi dalam riset dan inovasi Kota Surabaya.</p>
                </div>

                {/* Desktop View */}
                <div className="timeline-desktop-wrapper">
                    <div className="relative w-full">
                        <div className="timeline-progress-bar"></div>
                        <div className="timeline-steps-grid">
                            {steps.map((step, idx) => (
                                <TimelineStep key={idx} {...step} number={idx + 1} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden flex flex-col gap-8 pl-4 border-l-2 border-blue-100 dark:border-slate-700 ml-4">
                    {steps.map((step, idx) => (
                        <MobileTimelineStep key={idx} {...step} number={idx + 1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;

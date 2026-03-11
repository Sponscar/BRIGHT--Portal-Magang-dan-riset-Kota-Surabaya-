import React, { forwardRef } from 'react';

const CertificateTemplate = forwardRef(({ studentName, startDate, endDate, certificateId }, ref) => {
    const startDateStr = startDate
        ? new Date(startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        : '...';
    const endDateStr = endDate
        ? new Date(endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        : '...';
    const dateRangeStr = `pada tanggal  ${startDateStr} hingga ${endDateStr}`;

    return (
        <div
            ref={ref}
            style={{
                width: '1123px',
                height: '794px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                fontFamily: '"Poppins", sans-serif',
            }}
        >
            {/* Border image — full cover */}
            <img
                src="/sertifikat%20border.png"
                alt="Certificate Border"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '1123px',
                    height: '794px',
                    objectFit: 'fill',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* SERTIFIKAT title — large, italic bold */}
            <h1 style={{
                position: 'absolute',
                top: '165px',
                left: '0',
                right: '0',
                zIndex: 1,
                fontFamily: '"Anton", sans-serif',
                fontSize: '72px',
                fontWeight: 400,
                fontStyle: 'bold',
                color: '#2d2d2d',
                letterSpacing: '4px',
                margin: '0',
                lineHeight: '1',
                textTransform: 'uppercase',
                textAlign: 'center',
            }}>
                SERTIFIKAT
            </h1>

            {/* UID / Certificate Number - Top Right */}
            <p style={{
                position: 'absolute',
                top: '40px',
                right: '50px',
                zIndex: 1,
                fontFamily: '"Poppins", sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: '#666',
                margin: '0',
                textAlign: 'right',
                letterSpacing: '1px',
            }}>
                NO: {certificateId || 'BRIDA-CERT-XXXX'}
            </p>

            {/* "Sertifikat ini diberikan kepada:" */}
            <p style={{
                position: 'absolute',
                top: '245px',
                left: '0',
                right: '0',
                zIndex: 1,
                fontFamily: '"Poppins", sans-serif',
                fontSize: '21px',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#333',
                margin: '0',
                textAlign: 'center',
            }}>
                Sertifikat ini diberikan kepada:
            </p>

            {/* STUDENT NAME — large and prominent */}
            <h2 style={{
                position: 'absolute',
                top: '280px',
                left: '140px',
                right: '140px',
                zIndex: 1,
                fontFamily: '"Anton", sans-serif',
                fontSize: '62px',
                fontWeight: 400,
                color: '#1a1a1a',
                lineHeight: '1.2',
                margin: '0',
                textAlign: 'center',
                wordBreak: 'break-word',
            }}>
                {studentName || 'Nama Mahasiswa'}
            </h2>

            {/* "Telah menyelesaikan..." description */}
            <p style={{
                position: 'absolute',
                top: '355px',
                left: '180px',
                right: '180px',
                zIndex: 1,
                fontFamily: '"Poppins", sans-serif',
                fontSize: '21px',
                fontWeight: 400,
                color: '#333',
                textAlign: 'center',
                lineHeight: '1.7',
                margin: '0',
            }}>
                Telah menyelesaikan kegiatan magang di Badan Riset dan Inovasi Daerah
                {dateRangeStr}
            </p>

            {/* "Kepala Badan" */}
            <p style={{
                position: 'absolute',
                top: '480px',
                left: '0',
                right: '0',
                zIndex: 1,
                fontFamily: '"Poppins", sans-serif',
                fontSize: '21px',
                fontWeight: 600,
                color: '#000',
                margin: '0',
                textAlign: 'center',
            }}>
                Kepala Badan
            </p>

            {/* TTD & Stamp */}
            <img
                src="/ttd-stamp.png"
                alt="Tanda Tangan & Stempel"
                style={{
                    position: 'absolute',
                    top: '505px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: '180px',
                    width: 'auto',
                    zIndex: 2,
                    pointerEvents: 'none',
                }}
            />

            {/* Official Name */}
            <p style={{
                position: 'absolute',
                bottom: '88px',
                left: '0',
                right: '0',
                zIndex: 1,
                fontFamily: '"Poppins", sans-serif',
                fontSize: '21px',
                fontWeight: 700,
                color: '#000',
                margin: '0',
                textAlign: 'center',
            }}>
                Dr. Agus Imam Sonhaji, S.T, M.MT.
            </p>

            {/* NIP */}
            <p style={{
                position: 'absolute',
                bottom: '62px',
                left: '0',
                right: '0',
                zIndex: 1,
                fontFamily: '"Poppins", sans-serif',
                fontSize: '21px',
                fontWeight: 400,
                color: '#000',
                margin: '0',
                textAlign: 'center',
            }}>
                197010231996021001
            </p>
        </div>
    );
});

CertificateTemplate.displayName = 'CertificateTemplate';

export default CertificateTemplate;

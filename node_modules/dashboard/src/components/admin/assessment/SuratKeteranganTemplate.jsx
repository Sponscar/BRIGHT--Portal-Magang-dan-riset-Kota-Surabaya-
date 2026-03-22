import React, { forwardRef } from 'react';

const SuratKeteranganTemplate = forwardRef(({
    studentName = '[Nama Mahasiswa]',
    nomorSurat = '[Nomor Surat]',
    university = '[Nama Universitas]',
    major = '[Program Studi]',
    nim = '[NIM]',
    perangkatDaerah = '[Nama Perangkat Daerah]',
    startDate = '',
    endDate = '',
    kepalaName = '',
    kepalaNip = '',
    instansi = 'Badan Riset dan Inovasi Daerah (BRIDA) Kota Surabaya',
    jabatanKepala = 'Kepala Badan Riset dan Inovasi Daerah',
    headerNamaInstansi = 'BADAN RISET DAN INOVASI DAERAH',
    headerAlamat = 'Jl. Jaksa Agung Suprapto No. 6 – 8 Surabaya 60272',
    headerTelp = '(031) 5347182',
    headerEmail = 'brida@surabaya.go.id'
}, ref) => {

    const formatTanggal = (dateStr) => {
        if (!dateStr) return '____________________';
        try {
            const date = new Date(dateStr);
            if (isNaN(date)) return '____________________';
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        } catch (e) {
            return '____________________';
        }
    };

    const todayFormatted = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div
            ref={ref}
            style={{
                width: '794px',
                height: '1123px',
                fontFamily: "'Times New Roman', serif",
                color: '#1a1a1a',
                background: '#ffffff',
                position: 'relative',
                padding: '60px 70px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* KOP Surat */}
            <div style={{ textAlign: 'center', borderBottom: '3px solid #1a1a1a', paddingBottom: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <div style={{ width: '70px', height: '70px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999', border: '1px solid #ddd' }}>
                        Logo
                    </div>
                    <div>
                        <p style={{ fontSize: '14px', margin: '0', fontWeight: '600', letterSpacing: '1px' }}>PEMERINTAH KOTA SURABAYA</p>
                        <p style={{ fontSize: '18px', margin: '2px 0', fontWeight: '700', letterSpacing: '2px' }}>
                            {headerNamaInstansi}
                        </p>
                        <p style={{ fontSize: '11px', margin: '2px 0', color: '#555' }}>
                            {headerAlamat}
                        </p>
                        <p style={{ fontSize: '11px', margin: '0', color: '#555' }}>
                            Telp. {headerTelp} — Email: {headerEmail}
                        </p>
                    </div>
                </div>
            </div>

            {/* Judul */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <p style={{ fontSize: '16px', fontWeight: '700', textDecoration: 'underline', letterSpacing: '2px', margin: '0' }}>
                    SURAT KETERANGAN LULUS
                </p>
                <p style={{ fontSize: '12px', margin: '4px 0 0', color: '#555' }}>
                    Nomor: {nomorSurat}
                </p>
            </div>

            {/* Isi Surat */}
            <div style={{ flex: 1, fontSize: '13px', lineHeight: '1.8' }}>
                <p style={{ textIndent: '40px', textAlign: 'justify', margin: '0 0 12px' }}>
                    Yang bertanda tangan di bawah ini, Kepala Badan Riset dan Inovasi Daerah Kota Surabaya, dengan ini
                    menerangkan bahwa:
                </p>

                <table style={{ marginLeft: '40px', marginBottom: '16px', fontSize: '13px' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '3px 0', width: '160px', verticalAlign: 'top' }}>Nama</td>
                            <td style={{ padding: '3px 8px', verticalAlign: 'top' }}>:</td>
                            <td style={{ padding: '3px 0', fontWeight: '600' }}>{studentName}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '3px 0', verticalAlign: 'top' }}>NIM</td>
                            <td style={{ padding: '3px 8px', verticalAlign: 'top' }}>:</td>
                            <td style={{ padding: '3px 0' }}>{nim}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '3px 0', verticalAlign: 'top' }}>Program Studi</td>
                            <td style={{ padding: '3px 8px', verticalAlign: 'top' }}>:</td>
                            <td style={{ padding: '3px 0' }}>{major}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '3px 0', verticalAlign: 'top' }}>Perguruan Tinggi</td>
                            <td style={{ padding: '3px 8px', verticalAlign: 'top' }}>:</td>
                            <td style={{ padding: '3px 0' }}>{university}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '3px 0', verticalAlign: 'top' }}>Lokus</td>
                            <td style={{ padding: '3px 8px', verticalAlign: 'top' }}>:</td>
                            <td style={{ padding: '3px 0' }}>{perangkatDaerah}</td>
                        </tr>
                    </tbody>
                </table>

                <p style={{ textIndent: '40px', textAlign: 'justify', margin: '0 0 12px' }}>
                    Telah melaksanakan Magang/Riset di lingkungan {instansi}
                    pada periode <strong>{formatTanggal(startDate)}</strong> sampai dengan <strong>{formatTanggal(endDate)}</strong>.
                </p>

                <p style={{ textIndent: '40px', textAlign: 'justify', margin: '0 0 12px' }}>
                    Selama melaksanakan kegiatan, yang bersangkutan telah menunjukkan dedikasi dan tanggung jawab
                    yang baik dalam menjalankan tugas-tugas yang diberikan.
                </p>

                <p style={{ textIndent: '40px', textAlign: 'justify', margin: '0 0 12px' }}>
                    Demikian surat keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya.
                </p>
            </div>

            {/* Tanda Tangan */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ textAlign: 'center', width: '240px' }}>
                    <p style={{ fontSize: '12px', margin: '0 0 4px' }}>Surabaya, {todayFormatted}</p>
                    <p style={{ fontSize: '12px', margin: '0', fontWeight: '600', maxWidth: '100%' }}>
                        {jabatanKepala}
                    </p>
                    <p style={{ fontSize: '12px', margin: '0' }}>Kota Surabaya</p>
                    <div style={{ height: '70px' }}></div>
                    <p style={{ fontSize: '13px', margin: '0', fontWeight: '700', textDecoration: 'underline' }}>
                        {kepalaName || '____________________'}
                    </p>
                    <p style={{ fontSize: '11px', margin: '2px 0 0', color: '#555' }}>NIP. {kepalaNip || '____________________'}</p>
                </div>
            </div>

            {/* QR Code — Bottom Left */}
            <img
                src="/assets/qrcode-brida.png"
                alt="QR Code"
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '70px',
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                }}
            />
        </div>
    );
});

SuratKeteranganTemplate.displayName = 'SuratKeteranganTemplate';

export default SuratKeteranganTemplate;

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
    headerEmail = 'brida@surabaya.go.id',
    bidang = '',
    fokusKegiatan = []
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

    // Filter out empty kegiatan items
    const kegiatanList = (fokusKegiatan || []).filter(k => k && k.trim() !== '');

    return (
        <div
            ref={ref}
            style={{
                width: '794px',
                height: '1123px',
                fontFamily: 'Arial, sans-serif',
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
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80px' }}>
                    <img 
                        src="/logo1.png" 
                        alt="Logo Surabaya" 
                        style={{ position: 'absolute', left: '25px', width: '75px', height: 'auto', objectFit: 'contain' }} 
                    />
                    <div style={{ zIndex: 1, paddingLeft: '20px' }}>
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
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <p style={{ fontSize: '16px', fontWeight: '700', textDecoration: 'underline', letterSpacing: '2px', margin: '0' }}>
                    SURAT KETERANGAN
                </p>
                <p style={{ fontSize: '12px', margin: '4px 0 0', color: '#555' }}>
                    Nomor: {nomorSurat}
                </p>
            </div>

            {/* Isi Surat */}
            <div style={{ flex: 1, fontSize: '12px', lineHeight: '1.8' }}>
                {/* Penandatangan */}
                <p style={{ margin: '0 0 8px' }}>
                    Yang bertanda tangan di bawah ini:
                </p>

                <table style={{ marginLeft: '40px', marginBottom: '12px', fontSize: '12px' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '2px 0', width: '140px', verticalAlign: 'top' }}>Nama</td>
                            <td style={{ padding: '2px 8px', verticalAlign: 'top' }}>:</td>
                            <td style={{ padding: '2px 0', fontWeight: '600' }}>{kepalaName || '____________________'}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '2px 0', verticalAlign: 'top' }}>NIP</td>
                            <td style={{ padding: '2px 8px', verticalAlign: 'top' }}>:</td>
                            <td style={{ padding: '2px 0' }}>{kepalaNip || '____________________'}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '2px 0', verticalAlign: 'top' }}>Jabatan</td>
                            <td style={{ padding: '2px 8px', verticalAlign: 'top' }}>:</td>
                            <td style={{ padding: '2px 0' }}>{jabatanKepala}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Mahasiswa */}
                <p style={{ margin: '0 0 8px' }}>
                    Dengan ini menerangkan bahwa:
                </p>

                <table style={{ marginLeft: '40px', marginBottom: '12px', fontSize: '12px' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '2px 0', width: '140px', verticalAlign: 'top' }}>Nama</td>
                            <td style={{ padding: '2px 8px', verticalAlign: 'top' }}>:</td>
                            <td style={{ padding: '2px 0', fontWeight: '600' }}>{studentName}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '2px 0', verticalAlign: 'top' }}>NIM</td>
                            <td style={{ padding: '2px 8px', verticalAlign: 'top' }}>:</td>
                            <td style={{ padding: '2px 0' }}>{nim}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '2px 0', verticalAlign: 'top' }}>Perguruan Tinggi</td>
                            <td style={{ padding: '2px 8px', verticalAlign: 'top' }}>:</td>
                            <td style={{ padding: '2px 0' }}>{university}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '2px 0', verticalAlign: 'top' }}>Program Studi</td>
                            <td style={{ padding: '2px 8px', verticalAlign: 'top' }}>:</td>
                            <td style={{ padding: '2px 0' }}>{major}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Paragraf utama */}
                <p style={{ textAlign: 'justify', margin: '0 0 10px' }}>
                    Telah melaksanakan kegiatan Magang / Praktik Kerja Lapangan (PKL) pada {instansi} Pemerintah Kota Surabaya, terhitung
                    mulai tanggal <strong>{formatTanggal(startDate)}</strong> sampai dengan <strong>{formatTanggal(endDate)}</strong>.
                </p>

                <p style={{ textAlign: 'justify', margin: '0 0 10px' }}>
                    Selama masa magang, yang bersangkutan ditempatkan pada <strong>{bidang || '[Nama Bidang/Tim Lokus]'}</strong> dan telah
                    melaksanakan tugas-tugas yang diberikan dengan baik, disiplin, serta penuh tanggung jawab. Adapun fokus kegiatan yang dilakukan meliputi:
                </p>

                {/* Tabel Kurikulum Magang */}
                {kegiatanList.length > 0 && (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px', fontSize: '12px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #1a1a1a', padding: '6px 8px', width: '40px', textAlign: 'center', fontWeight: '700', backgroundColor: '#f5f5f5' }}>No.</th>
                                <th style={{ border: '1px solid #1a1a1a', padding: '6px 8px', textAlign: 'left', fontWeight: '700', backgroundColor: '#f5f5f5' }}>Materi / Kegiatan yang Dilakukan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kegiatanList.map((item, idx) => (
                                <tr key={idx}>
                                    <td style={{ border: '1px solid #1a1a1a', padding: '5px 8px', textAlign: 'center' }}>{idx + 1}</td>
                                    <td style={{ border: '1px solid #1a1a1a', padding: '5px 8px' }}>{item}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <p style={{ textAlign: 'justify', margin: '0 0 10px' }}>
                    Demikian surat keterangan ini diberikan kepada yang bersangkutan untuk dapat dipergunakan sebagai bukti pengalaman kerja dan kelengkapan administrasi akademik.
                </p>
            </div>

            {/* Tanda Tangan — Kanan */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <div style={{ textAlign: 'center', width: '260px' }}>
                    <p style={{ fontSize: '12px', margin: '0 0 4px' }}>Surabaya, {todayFormatted}</p>
                    <p style={{ fontSize: '12px', margin: '0', fontWeight: '600', maxWidth: '100%' }}>
                        {jabatanKepala}
                    </p>
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

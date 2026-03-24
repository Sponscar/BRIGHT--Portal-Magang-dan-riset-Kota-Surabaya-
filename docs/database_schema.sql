-- ============================================================
-- Database Schema: Sistem Manajemen Magang BRIDA Surabaya
-- Database: PostgreSQL
-- Total: 23 Tabel
-- Refactored: 2026-03-24 (synced with entity files)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE user_role AS ENUM (
    'student',
    'admin_opd',
    'koordinator_opd',
    'kepala_brida',
    'sekretariatan',
    'koordinator_riset',
    'koordinator_inovasi',
    'katimja_fasilitasi_riset',
    'katimja_kolaborasi_riset',
    'katimja_apresiasi_inovasi',
    'katimja_difusi_inovasi',
    'staf_fungsional',
    'staf_pelaksana',
    'staf_non_asn',
    'admin'
);

CREATE TYPE mahasiswa_status AS ENUM (
    'pending', 'documents_uploaded', 'verified',
    'forwarded_to_opd', 'active', 'completed'
);

CREATE TYPE internship_type AS ENUM ('magang_kp', 'magang_mbkm', 'magang_mandiri');
CREATE TYPE document_type AS ENUM ('surat_pengantar', 'proposal', 'ktp', 'ktm', 'cv', 'surat_pernyataan');
CREATE TYPE document_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE logbook_status AS ENUM ('draft', 'submitted', 'reviewed', 'approved', 'rejected');
CREATE TYPE logbook_type AS ENUM ('Laporan Harian', 'Jurnal', 'Draft Jurnal');
CREATE TYPE jurnal_status AS ENUM ('draft', 'submitted', 'reviewed', 'approved', 'rejected');
CREATE TYPE laporan_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE presensi_status AS ENUM ('hadir', 'izin', 'sakit');
CREATE TYPE validasi_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE penilaian_category AS ENUM ('behavior', 'performance');
CREATE TYPE administrasi_status AS ENUM ('draft', 'submitted', 'verified');
CREATE TYPE otp_type AS ENUM ('register', 'reset_password');
CREATE TYPE assessor_type AS ENUM (
    'self', 'peer', 'koordinator',
    'admin_opd', 'koordinator_opd',
    'sekretaris', 'kepala_brida', 'admin'
);
CREATE TYPE penilaian_component AS ENUM ('perilaku', 'kinerja');

-- ============================================================
-- 1. TABEL OPD (BARU)
-- ============================================================

CREATE TABLE opd (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama        VARCHAR(255) UNIQUE NOT NULL,
    slug        VARCHAR(255) UNIQUE NOT NULL,
    alamat      TEXT,
    telp        VARCHAR(50),
    email       VARCHAR(255),
    is_active   BOOLEAN DEFAULT true,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. TABEL USERS
-- ============================================================

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    role            user_role NOT NULL DEFAULT 'student',
    email_verified  BOOLEAN DEFAULT false,
    opd_id          UUID REFERENCES opd(id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. TABEL OTP_TOKENS
-- ============================================================

CREATE TABLE otp_tokens (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email       VARCHAR(255) NOT NULL,
    code        VARCHAR(6) NOT NULL,
    type        otp_type NOT NULL,
    expires_at  TIMESTAMPTZ NOT NULL,
    used        BOOLEAN DEFAULT false,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. TABEL MASTER_PERGURUAN_TINGGI
-- ============================================================

CREATE TABLE master_perguruan_tinggi (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama        VARCHAR(255) NOT NULL,
    alamat      VARCHAR(500) NOT NULL,
    kelurahan   VARCHAR(100) NOT NULL,
    kecamatan   VARCHAR(100) NOT NULL,
    is_active   BOOLEAN DEFAULT true,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. TABEL TUSI_BRIDA
-- ============================================================

CREATE TABLE tusi_brida (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name                VARCHAR(100) UNIQUE NOT NULL,
    slug                VARCHAR(100) UNIQUE NOT NULL,
    short_description   TEXT,
    full_description    TEXT,
    icon                VARCHAR(50),
    image_url           VARCHAR(500),
    responsibilities    TEXT,
    requirements        TEXT,
    is_active           BOOLEAN DEFAULT true,
    display_order       INTEGER,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 6. TABEL TIM_LOKUS (BARU - Tim Lokus per OPD)
-- ============================================================

CREATE TABLE tim_lokus (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name                VARCHAR(100) NOT NULL,
    slug                VARCHAR(100) NOT NULL,
    short_description   TEXT,
    full_description    TEXT,
    icon                VARCHAR(50),
    image_url           VARCHAR(500),
    responsibilities    TEXT,
    requirements        TEXT,
    is_active           BOOLEAN DEFAULT true,
    display_order       INTEGER,
    opd_id              UUID REFERENCES opd(id),
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. TABEL MAHASISWA
-- ============================================================

CREATE TABLE mahasiswa (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID UNIQUE NOT NULL REFERENCES users(id),
    full_name           VARCHAR(255) NOT NULL,
    phone               VARCHAR(20),
    whatsapp            VARCHAR(20),
    address             TEXT,
    -- Alamat Domisili
    provinsi            VARCHAR(100),
    kota_kabupaten      VARCHAR(100),
    kecamatan           VARCHAR(100),
    kelurahan           VARCHAR(100),
    alamat_lengkap      TEXT,
    -- Data Perguruan Tinggi
    university          VARCHAR(255),
    major               VARCHAR(255),
    university_address  VARCHAR(500),
    uni_kelurahan       VARCHAR(100),
    uni_kecamatan       VARCHAR(100),
    nik                 VARCHAR(50),
    nim                 VARCHAR(50),
    semester            INTEGER,
    internship_type     internship_type,
    internship_duration VARCHAR(50),
    conversion_type     VARCHAR(50),
    perangkat_daerah    VARCHAR(500),
    profile_image_url   VARCHAR(500),
    opd_id              UUID REFERENCES opd(id),
    kelurahan_opd       VARCHAR(255),
    status              mahasiswa_status DEFAULT 'pending',
    tusi_brida_id       UUID REFERENCES tusi_brida(id),
    assigned_by         UUID REFERENCES users(id),
    tusi_assigned_at    TIMESTAMPTZ,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 8. TABEL DOKUMEN
-- ============================================================

CREATE TABLE dokumen (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mahasiswa_id        UUID NOT NULL REFERENCES mahasiswa(id),
    document_type       document_type NOT NULL,
    file_name           VARCHAR(255) NOT NULL,
    file_url            VARCHAR(500) NOT NULL,
    file_size           INTEGER,
    status              document_status DEFAULT 'pending',
    rejection_reason    VARCHAR(500),
    verified_by         UUID REFERENCES users(id),
    verified_at         TIMESTAMPTZ,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. TABEL JENIS_AKTIVITAS
-- ============================================================

CREATE TABLE jenis_aktivitas (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(200) UNIQUE NOT NULL,
    description     TEXT,
    category        VARCHAR(50),
    is_active       BOOLEAN DEFAULT true,
    display_order   INTEGER,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 10. TABEL MATA_KULIAH_KONVERSI
-- ============================================================

CREATE TABLE mata_kuliah_konversi (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(255) UNIQUE NOT NULL,
    description     TEXT,
    is_active       BOOLEAN DEFAULT true,
    display_order   INTEGER,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 11. TABEL LOGBOOK
-- ============================================================

CREATE TABLE logbook (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mahasiswa_id            UUID NOT NULL REFERENCES mahasiswa(id),
    jenis_aktivitas_id      UUID REFERENCES jenis_aktivitas(id),
    mata_kuliah_id          UUID REFERENCES mata_kuliah_konversi(id),
    jenis_penugasan_text    VARCHAR(255),
    jenis_aktivitas_text    VARCHAR(255),
    type                    logbook_type,
    log_date                DATE NOT NULL,
    start_time              VARCHAR(10),
    end_time                VARCHAR(10),
    total_jam_kerja         VARCHAR(50),
    description             TEXT NOT NULL,
    pembelajaran            TEXT,
    lokasi_nama             VARCHAR(255),
    lokasi_lat              DOUBLE PRECISION,
    lokasi_lng              DOUBLE PRECISION,
    attachment_url          VARCHAR(500),
    university              VARCHAR(255),
    major                   VARCHAR(255),
    status                  logbook_status DEFAULT 'draft',
    reviewed_by             UUID REFERENCES users(id),
    reviewed_at             TIMESTAMPTZ,
    deleted_at              TIMESTAMPTZ,
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 12. TABEL JURNAL
-- ============================================================

CREATE TABLE jurnal (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mahasiswa_id    UUID NOT NULL REFERENCES mahasiswa(id),
    title           VARCHAR(255) NOT NULL,
    content         TEXT,
    file_name       VARCHAR(255),
    file_url        VARCHAR(500),
    file_size       INTEGER,
    status          jurnal_status DEFAULT 'draft',
    reviewed_by     UUID REFERENCES users(id),
    reviewed_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 13. TABEL KRITERIA_PENILAIAN
-- ============================================================

CREATE TABLE kriteria_penilaian (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(100) UNIQUE NOT NULL,
    category        penilaian_category NOT NULL,
    bobot           INTEGER NOT NULL,
    description     TEXT,
    is_active       BOOLEAN DEFAULT true,
    display_order   INTEGER,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 14. TABEL PENILAIAN
-- ============================================================

CREATE TABLE penilaian (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mahasiswa_id        UUID NOT NULL REFERENCES mahasiswa(id),
    assessed_by         UUID NOT NULL REFERENCES users(id),
    assessor_type       assessor_type NOT NULL,
    component           penilaian_component NOT NULL,
    peer_mahasiswa_id   UUID REFERENCES mahasiswa(id),
    final_score         DECIMAL(5,2),
    feedback            TEXT,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(mahasiswa_id, assessed_by, assessor_type, component)
);

-- ============================================================
-- 15. TABEL NILAI_PENILAIAN
-- ============================================================

CREATE TABLE nilai_penilaian (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    penilaian_id    UUID NOT NULL REFERENCES penilaian(id),
    kriteria_id     UUID NOT NULL REFERENCES kriteria_penilaian(id),
    score           INTEGER NOT NULL CHECK (score >= 1 AND score <= 100),
    keterangan      TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 16. TABEL NILAI_AKHIR
-- ============================================================

CREATE TABLE nilai_akhir (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mahasiswa_id            UUID UNIQUE NOT NULL REFERENCES mahasiswa(id),
    nilai_perilaku          DECIMAL(5,2),
    nilai_perilaku_final    DECIMAL(5,2),
    nilai_kinerja           DECIMAL(5,2),
    nilai_kinerja_final     DECIMAL(5,2),
    nilai_akhir             DECIMAL(5,2),
    grade                   VARCHAR(2),
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- Formula: NA = (NP × 0.4) + (NK × 0.6)
-- Grade: A (>=86), B (>=71), C (>=51), D (<51)

-- ============================================================
-- 17. TABEL SERTIFIKAT
-- ============================================================

CREATE TABLE sertifikat (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mahasiswa_id        UUID NOT NULL REFERENCES mahasiswa(id),
    nomor_sertifikat    VARCHAR(100) UNIQUE NOT NULL,
    student_name        VARCHAR(255) NOT NULL,
    start_date          DATE NOT NULL,
    end_date            DATE NOT NULL,
    issued_by           UUID NOT NULL REFERENCES users(id),
    tanggal_terbit      DATE NOT NULL,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 18. TABEL LAPORAN_AKHIR
-- ============================================================

CREATE TABLE laporan_akhir (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mahasiswa_id        UUID NOT NULL REFERENCES mahasiswa(id),
    title               VARCHAR(255),
    file_name           VARCHAR(255) NOT NULL,
    file_url            VARCHAR(500) NOT NULL,
    file_size           INTEGER,
    status              laporan_status DEFAULT 'pending',
    rejection_reason    VARCHAR(500),
    submitted_at        TIMESTAMPTZ DEFAULT NOW(),
    reviewed_by         UUID REFERENCES users(id),
    reviewed_at         TIMESTAMPTZ,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 19. TABEL PRESENSI
-- ============================================================

CREATE TABLE presensi (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mahasiswa_id    UUID NOT NULL REFERENCES mahasiswa(id),
    tanggal         DATE NOT NULL,
    jam_masuk       VARCHAR(10),
    status          presensi_status NOT NULL,
    keterangan      TEXT,
    bukti_url       VARCHAR(500),
    status_validasi validasi_status DEFAULT 'pending',
    validated_by    UUID REFERENCES users(id),
    validated_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 20. TABEL MAHASISWA_MATA_KULIAH
-- ============================================================

CREATE TABLE mahasiswa_mata_kuliah (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mahasiswa_id    UUID NOT NULL REFERENCES mahasiswa(id),
    mata_kuliah_id  UUID NOT NULL REFERENCES mata_kuliah_konversi(id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(mahasiswa_id, mata_kuliah_id)
);

-- ============================================================
-- 21. TABEL ADMINISTRASI
-- ============================================================

CREATE TABLE administrasi (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mahasiswa_id            UUID UNIQUE NOT NULL REFERENCES mahasiswa(id),
    needs_reply_letter      BOOLEAN DEFAULT false,
    proposal_description    TEXT NOT NULL,
    topic                   TEXT,
    expected_results        TEXT,
    has_course_conversion   BOOLEAN DEFAULT false,
    declaration             BOOLEAN NOT NULL,
    status                  administrasi_status DEFAULT 'draft',
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 22. TABEL KURIKULUM_MAGANG
-- ============================================================

CREATE TABLE kurikulum_magang (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mahasiswa_id    UUID NOT NULL REFERENCES mahasiswa(id),
    materi          TEXT NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 23. TABEL SURAT_KETERANGAN
-- ============================================================

CREATE TABLE surat_keterangan (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mahasiswa_id        UUID UNIQUE NOT NULL REFERENCES mahasiswa(id),
    nomor_surat         VARCHAR(100) UNIQUE NOT NULL,
    perangkat_daerah    VARCHAR(255),
    instansi            VARCHAR(255),
    tanggal_mulai       DATE NOT NULL,
    tanggal_selesai     DATE NOT NULL,
    tanggal_terbit      DATE NOT NULL,
    kepala_name         VARCHAR(255),
    kepala_nip          VARCHAR(50),
    jabatan_kepala      VARCHAR(255),
    bidang              VARCHAR(255),
    fokus_kegiatan      TEXT,
    file_url            VARCHAR(500),
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 24. TABEL FEEDBACK (BARU - Home Page)
-- ============================================================

CREATE TABLE feedback (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama        VARCHAR(200) NOT NULL,
    email       VARCHAR(200) NOT NULL,
    rating      SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    komentar    TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

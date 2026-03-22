import { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import CriteriaManagementModal from '../../components/admin/assessment/CriteriaManagementModal';
import AssessmentTable from '../../components/admin/assessment/AssessmentTable';
import AssessmentFormModal from '../../components/admin/assessment/AssessmentFormModal';
import AssessmentDetailModal from '../../components/admin/assessment/AssessmentDetailModal';
import CertificateTable from '../../components/admin/assessment/CertificateTable';
import CertificateGenerateModal from '../../components/admin/assessment/CertificateGenerateModal';
import CertificatePreviewModal from '../../components/admin/assessment/CertificatePreviewModal';
import SuratKeteranganTable from '../../components/admin/assessment/SuratKeteranganTable';
import SuratKeteranganGenerateModal from '../../components/admin/assessment/SuratKeteranganGenerateModal';
import SuratKeteranganPreviewModal from '../../components/admin/assessment/SuratKeteranganPreviewModal';
import Swal from 'sweetalert2';

const AssessmentCertificate = () => {
    // Master: Kriteria Penilaian
    const [criteria, setCriteria] = useState([
        { id: 'c1', name: 'Kedisiplinan (Discipline)', category: 'behavior', bobot: 10 },
        { id: 'c2', name: 'Tanggung Jawab (Responsibility)', category: 'behavior', bobot: 10 },
        { id: 'c3', name: 'Kerja Sama (Teamwork)', category: 'behavior', bobot: 10 },
        { id: 'c4', name: 'Sikap & Etika (Attitude)', category: 'behavior', bobot: 10 },
        { id: 'c5', name: 'Kualitas Hasil Kerja (Quality of Work)', category: 'performance', bobot: 20 },
        { id: 'c6', name: 'Ketepatan Waktu (Timeliness)', category: 'performance', bobot: 10 },
        { id: 'c7', name: 'Kemampuan Teknis (Technical Skill)', category: 'performance', bobot: 15 },
        { id: 'c8', name: 'Pemahaman Tugas (Task Understanding)', category: 'performance', bobot: 15 },
    ]);

    // Criteria Management State
    const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);
    const [editingCriteria, setEditingCriteria] = useState(null);
    const [criteriaForm, setCriteriaForm] = useState({ name: '', category: 'behavior', bobot: '' });

    // Mock: Daftar Mahasiswa
    const studentList = [
        { id: 's1', name: 'Siti Aminah', university: 'Universitas Airlangga', major: 'Kesehatan Masyarakat', team: 'Riset' },
        { id: 's2', name: 'Eko Prasetyo', university: 'PENS', major: 'Teknik Komputer', team: 'Inovasi' },
        { id: 's3', name: 'Rina Wijaya', university: 'ITS', major: 'Desain Produk', team: 'Kesekretariatan' },
        { id: 's4', name: 'Ahmad Rizky', university: 'Institut Teknologi Sepuluh Nopember', major: 'Teknik Informatika', team: 'Riset' },
        { id: 's5', name: 'Dewi Lestari', university: 'UPN Veteran Jawa Timur', major: 'Sistem Informasi', team: 'Inovasi' },
    ];

    // State
    const MAIN_TABS = ['penilaian', 'sertifikat', 'surat_keterangan'];
    const [activeTab, setActiveTab] = useState('penilaian');
    const [animationClass, setAnimationClass] = useState('animate-page-enter');
    const [searchTerm, setSearchTerm] = useState('');

    const handleTabChange = (newTab) => {
        if (newTab === activeTab) return;
        const currentIndex = MAIN_TABS.indexOf(activeTab);
        const newIndex = MAIN_TABS.indexOf(newTab);
        setAnimationClass(`animate-slide-${newIndex > currentIndex ? 'left' : 'right'}`);
        setActiveTab(newTab);
        setSearchTerm('');
    };

    // --- PENILAIAN STATE ---
    // Mock: Setiap assessment = penilaian seorang staff (perilaku + kinerja)
    // final_score dihitung: (avg_perilaku × 0.4) + (avg_kinerja × 0.6)
    const [assessments, setAssessments] = useState([
        {
            id: 'a1', mahasiswa_id: 's1', studentName: 'Siti Aminah', university: 'Universitas Airlangga', team: 'Riset',
            final_score: 85.65, grade: 'B', feedback: 'Mahasiswa yang sangat rajin dan berdedikasi tinggi.',
            assessed_by: 'Admin Utama', assessorType: 'admin', created_at: '2026-02-10',
            perilakuAvg: 86.25, kinerjaAvg: 84.75,
            nilaiPerilakuFinal: 34.50, nilaiKinerjaFinal: 50.85,
            assessmentStatus: {
                self_perilaku: true, peer_perilaku: true,
                koordinator_perilaku: true, koordinator_kinerja: true,
                admin_perilaku: true, admin_kinerja: true,
            },
            scores: [
                { kriteria_id: 'c1', score: 88, keterangan: 'Sangat disiplin' }, { kriteria_id: 'c2', score: 85, keterangan: 'Bertanggung jawab' },
                { kriteria_id: 'c3', score: 90, keterangan: 'Kerja sama baik' }, { kriteria_id: 'c4', score: 82, keterangan: 'Sopan dan beretika' },
                { kriteria_id: 'c5', score: 87, keterangan: 'Hasil kerja berkualitas' }, { kriteria_id: 'c6', score: 80, keterangan: 'Tepat waktu' },
                { kriteria_id: 'c7', score: 86, keterangan: 'Skill teknis baik' }, { kriteria_id: 'c8', score: 86, keterangan: 'Paham tugas' },
            ]
        },
        {
            id: 'a2', mahasiswa_id: 's2', studentName: 'Eko Prasetyo', university: 'PENS', team: 'Inovasi',
            final_score: 77.55, grade: 'B', feedback: 'Kreatif dan inovatif, perlu meningkatkan kedisiplinan.',
            assessed_by: 'Admin Utama', assessorType: 'admin', created_at: '2026-02-11',
            perilakuAvg: 75.75, kinerjaAvg: 80.75,
            nilaiPerilakuFinal: 30.30, nilaiKinerjaFinal: 48.45,
            assessmentStatus: {
                self_perilaku: true, peer_perilaku: true,
                koordinator_perilaku: false, koordinator_kinerja: false,
                admin_perilaku: true, admin_kinerja: true,
            },
            scores: [
                { kriteria_id: 'c1', score: 70, keterangan: 'Masih perlu ditingkatkan' }, { kriteria_id: 'c2', score: 75, keterangan: 'Cukup bertanggung jawab' },
                { kriteria_id: 'c3', score: 80, keterangan: 'Kooperatif' }, { kriteria_id: 'c4', score: 78, keterangan: 'Baik' },
                { kriteria_id: 'c5', score: 82, keterangan: 'Kreatif' }, { kriteria_id: 'c6', score: 75, keterangan: 'Kadang terlambat' },
                { kriteria_id: 'c7', score: 85, keterangan: 'Skill IoT bagus' }, { kriteria_id: 'c8', score: 81, keterangan: 'Cukup paham' },
            ]
        },
        {
            id: 'a3', mahasiswa_id: 's3', studentName: 'Rina Wijaya', university: 'ITS', team: 'Kesekretariatan',
            final_score: 62.80, grade: 'C', feedback: 'Perlu lebih aktif dan meningkatkan kualitas kerja.',
            assessed_by: 'Sekretaris BRIGHT', assessorType: 'sekretaris', created_at: '2026-02-12',
            perilakuAvg: 65.00, kinerjaAvg: 61.25,
            nilaiPerilakuFinal: 26.00, nilaiKinerjaFinal: 36.75,
            assessmentStatus: {
                self_perilaku: true, peer_perilaku: false,
                sekretaris_perilaku: true, sekretaris_kinerja: true,
                admin_perilaku: false, admin_kinerja: false,
            },
            scores: [
                { kriteria_id: 'c1', score: 60, keterangan: 'Perlu ditingkatkan' }, { kriteria_id: 'c2', score: 65, keterangan: 'Cukup' },
                { kriteria_id: 'c3', score: 70, keterangan: 'Lumayan' }, { kriteria_id: 'c4', score: 65, keterangan: 'Cukup sopan' },
                { kriteria_id: 'c5', score: 60, keterangan: 'Perlu perbaikan' }, { kriteria_id: 'c6', score: 55, keterangan: 'Sering terlambat' },
                { kriteria_id: 'c7', score: 65, keterangan: 'Cukup' }, { kriteria_id: 'c8', score: 65, keterangan: 'Cukup paham' },
            ]
        }
    ]);

    const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
    const [assessmentForm, setAssessmentForm] = useState({ mahasiswa_id: '', feedback: '', scores: [] });
    const [viewDetail, setViewDetail] = useState(null);

    // --- SERTIFIKAT STATE ---
    const [certificates, setCertificates] = useState([
        {
            id: 'cert1', mahasiswa_id: 's1', studentName: 'Siti Aminah', university: 'Universitas Airlangga',
            nomor_sertifikat: 'BRIGHT/CERT/2026/001', fileName: 'Sertifikat_Siti_Aminah.pdf', fileSize: 245000,
            tanggal_terbit: '2026-02-12', created_at: '2026-02-12'
        }
    ]);

    const [isCertModalOpen, setIsCertModalOpen] = useState(false);
    const [certForm, setCertForm] = useState({ mahasiswa_id: '', nomor_sertifikat: '', tanggal_mulai: '', tanggal_selesai: '', nilai_akhir: '', kepala_name: '', kepala_nip: '', instansi: '', jabatan_kepala: '' });

    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [selectedCertForPreview, setSelectedCertForPreview] = useState(null);

    // --- SURAT KETERANGAN STATE ---
    const [suratList, setSuratList] = useState([
        {
            id: 'sk1', mahasiswa_id: 's1', studentName: 'Siti Aminah', university: 'Universitas Airlangga',
            major: 'Kesehatan Masyarakat', nim: '0411234001',
            nomor_surat: '001/BRIDA/SK-MG/2026', perangkat_daerah: 'Dinas Kesehatan',
            tanggal_mulai: '2026-01-06', tanggal_selesai: '2026-06-06',
            tanggal_terbit: '2026-06-10', created_at: '2026-06-10'
        }
    ]);
    const [isSuratModalOpen, setIsSuratModalOpen] = useState(false);
    const [suratForm, setSuratForm] = useState({ mahasiswa_id: '', nomor_surat: '', perangkat_daerah: '', tanggal_mulai: '', tanggal_selesai: '', nim: '', kepala_name: '', kepala_nip: '', instansi: '', jabatan_kepala: '' });
    const [isSuratPreviewOpen, setIsSuratPreviewOpen] = useState(false);
    const [selectedSuratForPreview, setSelectedSuratForPreview] = useState(null);

    // --- PENILAIAN FUNCTIONS ---
    const openAssessmentModal = () => {
        setAssessmentForm({ mahasiswa_id: '', feedback: '', scores: criteria.map(c => ({ kriteria_id: c.id, score: '', keterangan: '' })) });
        setIsAssessmentModalOpen(true);
    };

    const handleScoreChange = (kriteriaId, field, value) => {
        setAssessmentForm(prev => ({
            ...prev,
            scores: prev.scores.map(s => {
                if (s.kriteria_id !== kriteriaId) return s;
                if (field !== 'score') return { ...s, [field]: value };
                const crit = criteria.find(c => c.id === kriteriaId);
                const maxScore = crit?.category === 'behavior' ? 5 : 100;
                return { ...s, score: Math.min(maxScore, Math.max(0, Number(value) || '')) };
            })
        }));
    };

    const calculateFinalScore = () => {
        const validScores = assessmentForm.scores.filter(s => s.score !== '' && s.score !== 0);
        if (validScores.length === 0) return 0;
        const totalBobot = validScores.reduce((sum, s) => {
            const crit = criteria.find(c => c.id === s.kriteria_id);
            return sum + (crit?.bobot || 0);
        }, 0);
        if (totalBobot === 0) return 0;
        const weightedTotal = validScores.reduce((sum, s) => {
            const crit = criteria.find(c => c.id === s.kriteria_id);
            // Perilaku: Likert 1-5 ×20, Kinerja: langsung 1-100
            const score = Number(s.score);
            const converted = crit?.category === 'behavior' ? score * 20 : score;
            return sum + (converted * (crit?.bobot || 0));
        }, 0);
        return (weightedTotal / totalBobot).toFixed(2);
    };

    const getBobotByCategory = (category) => criteria.filter(c => c.category === category).reduce((sum, c) => sum + (c.bobot || 0), 0);

    const handleSaveAssessment = async (e) => {
        e.preventDefault();
        const student = studentList.find(s => s.id === assessmentForm.mahasiswa_id);
        if (!student) return;
        const hasEmptyScores = assessmentForm.scores.some(s => s.score === '' || s.score === 0);
        if (hasEmptyScores) { 
            Swal.fire({
                icon: 'warning',
                title: 'Data Belum Lengkap',
                text: 'Harap isi semua nilai kriteria.',
                confirmButtonColor: '#2563eb'
            });
            return; 
        }

        // Pisahkan skor perilaku dan kinerja
        const perilakuScores = assessmentForm.scores
            .filter(s => criteria.find(c => c.id === s.kriteria_id)?.category === 'behavior')
            .map(s => ({ kriteriaId: s.kriteria_id, score: Number(s.score), keterangan: s.keterangan }));
        const kinerjaScores = assessmentForm.scores
            .filter(s => criteria.find(c => c.id === s.kriteria_id)?.category === 'performance')
            .map(s => ({ kriteriaId: s.kriteria_id, score: Number(s.score), keterangan: s.keterangan }));

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/penilaian/staff-assessment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    mahasiswaId: assessmentForm.mahasiswa_id,
                    perilaku: { scores: perilakuScores, feedback: assessmentForm.feedback },
                    kinerja: { scores: kinerjaScores, feedback: assessmentForm.feedback },
                }),
            });

            if (!res.ok) {
                let errMsg = `Gagal menyimpan penilaian (${res.status})`;
                try {
                    const errData = await res.json();
                    errMsg = errData.message || errMsg;
                } catch { /* response body kosong */ }
                throw new Error(errMsg);
            }

            // Simpan ke UI (tanpa final_score — belum dihitung sampai semua assessor menilai)
            const newAssessment = {
                id: `a${Date.now()}`, mahasiswa_id: assessmentForm.mahasiswa_id, studentName: student.name,
                university: student.university, team: student.team, final_score: null,
                feedback: assessmentForm.feedback, assessed_by: 'Admin Utama',
                created_at: new Date().toISOString().split('T')[0],
                scores: assessmentForm.scores.map(s => ({ ...s, score: Number(s.score) }))
            };
            setAssessments([newAssessment, ...assessments]);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Penilaian berhasil disimpan. Nilai akhir akan dihitung setelah semua penilai (Self, Peer, Koordinator, Admin) selesai menilai.',
                confirmButtonColor: '#2563eb'
            });
            setIsAssessmentModalOpen(false);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: err.message || 'Terjadi kesalahan saat menyimpan penilaian.',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    // --- SERTIFIKAT FUNCTIONS ---
    const openCertModal = () => { setCertForm({ mahasiswa_id: '', nomor_sertifikat: '', tanggal_mulai: '', tanggal_selesai: '', nilai_akhir: '', kepala_name: '', kepala_nip: '', instansi: '', jabatan_kepala: '' }); setIsCertModalOpen(true); };

    const handlePreviewCert = (cert) => {
        setSelectedCertForPreview(cert);
        setIsPreviewModalOpen(true);
    };

    // --- SURAT KETERANGAN FUNCTIONS ---
    const openSuratModal = () => {
        setSuratForm({ mahasiswa_id: '', nomor_surat: '', perangkat_daerah: '', tanggal_mulai: '', tanggal_selesai: '', nim: '', kepala_name: '', kepala_nip: '', instansi: '', jabatan_kepala: '' });
        setIsSuratModalOpen(true);
    };

    const handleSaveSurat = (generatedData) => {
        const student = studentList.find(s => s.id === generatedData.mahasiswa_id);
        if (!student) return;
        const newSurat = {
            id: `sk${Date.now()}`,
            mahasiswa_id: generatedData.mahasiswa_id,
            studentName: student.name,
            university: student.university,
            major: student.major,
            nim: generatedData.nim || student.nim || '-',
            nomor_surat: generatedData.nomor_surat,
            perangkat_daerah: generatedData.perangkat_daerah,
            tanggal_mulai: generatedData.tanggal_mulai,
            tanggal_selesai: generatedData.tanggal_selesai,
            tanggal_terbit: generatedData.tanggal_terbit,
            kepala_name: generatedData.kepala_name || '',
            kepala_nip: generatedData.kepala_nip || '',
            instansi: generatedData.instansi || '',
            jabatan_kepala: generatedData.jabatan_kepala || '',
            created_at: new Date().toISOString().split('T')[0]
        };
        setSuratList([newSurat, ...suratList]);
        setIsSuratModalOpen(false);
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Surat Keterangan berhasil diterbitkan.', confirmButtonColor: '#2563eb', timer: 1500, showConfirmButton: false });
    };

    const handlePreviewSurat = (surat) => {
        setSelectedSuratForPreview(surat);
        setIsSuratPreviewOpen(true);
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '-';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const handleSaveCert = (generatedData) => {
        const student = studentList.find(s => s.id === generatedData.mahasiswa_id);
        if (!student) return;

        const newCert = {
            id: `cert${Date.now()}`,
            mahasiswa_id: generatedData.mahasiswa_id,
            studentName: student.name,
            university: student.university,
            nomor_sertifikat: generatedData.nomor_sertifikat,
            fileName: generatedData.file.name,
            fileSize: generatedData.file.size,
            tanggal_terbit: generatedData.tanggal_terbit,
            tanggal_mulai: generatedData.tanggal_mulai,
            tanggal_selesai: generatedData.tanggal_selesai,
            nilai_akhir: generatedData.nilai_akhir || '',
            kepala_name: generatedData.kepala_name || '',
            kepala_nip: generatedData.kepala_nip || '',
            instansi: generatedData.instansi || '',
            jabatan_kepala: generatedData.jabatan_kepala || '',
            created_at: new Date().toISOString().split('T')[0]
        };
        setCertificates([newCert, ...certificates]);
        setIsCertModalOpen(false);
    };

    // --- CRITERIA MANAGEMENT ---
    const openCriteriaModal = () => { setEditingCriteria(null); setCriteriaForm({ name: '', category: 'behavior', bobot: '' }); setIsCriteriaModalOpen(true); };
    const handleEditCriteria = (c) => { setEditingCriteria(c); setCriteriaForm({ name: c.name, category: c.category, bobot: c.bobot || '' }); };
    const handleDeleteCriteria = (id) => { 
        Swal.fire({
            title: 'Hapus Kriteria?',
            text: "Kriteria yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                setCriteria(criteria.filter(c => c.id !== id));
                Swal.fire({
                    title: 'Terhapus!',
                    text: 'Kriteria berhasil dihapus.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    backdrop: `
                      rgba(0,0,0,0.4)
                      backdrop-filter: blur(4px)
                    `,
                    customClass: { popup: 'validator-popup' }
                });
            }
        });
    };
    const handleSaveCriteria = (e) => {
        e.preventDefault();
        if (!criteriaForm.name.trim()) return;
        const bobotValue = Number(criteriaForm.bobot) || 0;
        const category = criteriaForm.category;

        // Hitung total bobot saat ini untuk kategori yang sama
        const maxBobot = category === 'behavior' ? 40 : 60;
        const categoryLabel = category === 'behavior' ? 'Perilaku Kerja' : 'Kinerja';
        let currentBobot = criteria
            .filter(c => c.category === category && (!editingCriteria || c.id !== editingCriteria.id))
            .reduce((sum, c) => sum + (c.bobot || 0), 0);

        if (currentBobot + bobotValue > maxBobot) {
            const sisa = maxBobot - currentBobot;
            Swal.fire({
                icon: 'error',
                title: 'Bobot Melebihi Batas',
                text: `Total bobot ${categoryLabel} tidak boleh melebihi ${maxBobot}%.\nSaat ini: ${currentBobot}%, sisa tersedia: ${sisa}%.\nAnda mencoba menambah ${bobotValue}%.`,
                confirmButtonColor: '#2563eb'
            });
            return;
        }

        if (editingCriteria) {
            setCriteria(criteria.map(c => c.id === editingCriteria.id ? { ...c, name: criteriaForm.name, category: criteriaForm.category, bobot: bobotValue } : c));
            setEditingCriteria(null);
        } else {
            setCriteria([...criteria, { id: `c${Date.now()}`, name: criteriaForm.name, category: criteriaForm.category, bobot: bobotValue }]);
        }
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Kriteria berhasil disimpan.',
            confirmButtonColor: '#2563eb',
            timer: 1500,
            showConfirmButton: false
        });
        setCriteriaForm({ name: '', category: 'behavior', bobot: '' });
    };

    // --- FILTER ---
    const filteredAssessments = assessments.filter(a =>
        a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || a.university.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredCertificates = certificates.filter(c =>
        c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || c.nomor_sertifikat.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredSuratList = suratList.filter(sk =>
        sk.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || sk.nomor_surat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- HELPERS ---
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };
    const getScoreColor = (score) => {
        if (score >= 86) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        if (score >= 71) return 'text-blue-600 bg-blue-50 border-blue-200';
        if (score >= 51) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-blue-600 bg-blue-50 border-blue-200';
    };
    const getScoreLabel = (score) => {
        if (score >= 86) return 'A (Sangat Baik)';
        if (score >= 71) return 'B (Baik)';
        if (score >= 51) return 'C (Cukup)';
        return 'D (Perlu Perbaikan)';
    };

    // Stats
    const assessmentStats = {
        total: assessments.length,
        excellent: assessments.filter(a => a.final_score >= 86).length,
        good: assessments.filter(a => a.final_score >= 71 && a.final_score < 86).length,
        sufficient: assessments.filter(a => a.final_score >= 51 && a.final_score < 71).length,
        poor: assessments.filter(a => a.final_score < 51).length,
    };

    return (
        <>
            <AdminHeader title="Penilaian & Sertifikat" subtitle="Kelola penilaian dan sertifikat mahasiswa magang." />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* Tabs */}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
                            <button onClick={() => handleTabChange('penilaian')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'penilaian' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                Penilaian
                            </button>
                            <button onClick={() => handleTabChange('sertifikat')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'sertifikat' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                Sertifikat
                            </button>
                            <button onClick={() => handleTabChange('surat_keterangan')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'surat_keterangan' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                Surat Keterangan
                            </button>
                        </div>
                        <div className="flex gap-2">
                            {activeTab === 'penilaian' && (
                                <button onClick={openCriteriaModal}
                                    className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:bg-slate-50 hover:text-primary hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                                    title="Kelola Kriteria Penilaian">
                                    <span className="material-symbols-outlined notranslate text-[20px] transition-transform group-hover:rotate-90">settings</span>
                                    <span className="hidden sm:inline">Kelola Kriteria</span>
                                </button>
                            )}
                            <button onClick={
                                activeTab === 'penilaian' ? openAssessmentModal :
                                activeTab === 'sertifikat' ? openCertModal : openSuratModal
                            }
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
                                    activeTab === 'surat_keterangan'
                                        ? 'bg-primary text-white hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]'
                                        : 'bg-primary text-white hover:bg-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]'
                                }`}>
                                <span className="material-symbols-outlined notranslate text-[20px]">
                                    {activeTab === 'penilaian' ? 'rate_review' :
                                     activeTab === 'sertifikat' ? 'workspace_premium' : 'description'}
                                </span>
                                {activeTab === 'penilaian' ? 'Beri Penilaian' :
                                 activeTab === 'sertifikat' ? 'Terbitkan Sertifikat' : 'Terbitkan Surat'}
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards - Penilaian Tab */}
                    {activeTab === 'penilaian' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                <p className="text-xs font-medium text-slate-500 uppercase">Total Penilaian</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{assessmentStats.total}</p>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                <p className="text-xs font-medium text-emerald-600 uppercase">A — Sangat Baik (≥86)</p>
                                <p className="text-2xl font-bold text-emerald-700 mt-1">{assessmentStats.excellent}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                <p className="text-xs font-medium text-blue-600 uppercase">B — Baik (71-85)</p>
                                <p className="text-2xl font-bold text-blue-700 mt-1">{assessmentStats.good}</p>
                            </div>
                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                <p className="text-xs font-medium text-amber-600 uppercase">C — Cukup (51-70)</p>
                                <p className="text-2xl font-bold text-amber-700 mt-1">{assessmentStats.sufficient}</p>
                            </div>
                            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                <p className="text-xs font-medium text-rose-600 uppercase">D — Perlu Perbaikan (&lt;51)</p>
                                <p className="text-2xl font-bold text-rose-700 mt-1">{assessmentStats.poor}</p>
                            </div>
                        </div>
                    )}

                    {/* Stats Cards - Sertifikat Tab */}
                    {activeTab === 'sertifikat' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs font-medium text-slate-500 uppercase">Total Sertifikat Diterbitkan</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{certificates.length}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs font-medium text-slate-500 uppercase">Belum Terbit</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{studentList.length - certificates.length}</p>
                            </div>
                        </div>
                    )}

                    {/* Stats Cards - Surat Keterangan Tab */}
                    {activeTab === 'surat_keterangan' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                <p className="text-xs font-medium text-blue-600 uppercase">Total Surat Diterbitkan</p>
                                <p className="text-2xl font-bold text-blue-700 mt-1">{suratList.length}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                <p className="text-xs font-medium text-slate-500 uppercase">Belum Terbit</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{studentList.length - suratList.length}</p>
                            </div>
                        </div>
                    )}

                    {/* Search */}
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1 sm:max-w-xs">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined notranslate text-[20px]">search</span>
                            <input type="text"
                                placeholder={activeTab === 'penilaian' ? 'Cari nama atau universitas...' : activeTab === 'sertifikat' ? 'Cari nama atau nomor sertifikat...' : 'Cari nama atau nomor surat...'}
                                value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setAnimationClass('animate-page-enter'); }}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Tables */}
                    <div key={`${activeTab}-${searchTerm}`} className={animationClass}>
                        {activeTab === 'penilaian' && (
                            <AssessmentTable assessments={filteredAssessments} onViewDetail={setViewDetail} formatDate={formatDate} getScoreColor={getScoreColor} getScoreLabel={getScoreLabel} />
                        )}
                        {activeTab === 'sertifikat' && (
                            <CertificateTable certificates={filteredCertificates} formatDate={formatDate} formatFileSize={formatFileSize} onPreview={handlePreviewCert} />
                        )}
                        {activeTab === 'surat_keterangan' && (
                            <SuratKeteranganTable suratList={filteredSuratList} formatDate={formatDate} onPreview={handlePreviewSurat} />
                        )}
                    </div>
                </div>

                {/* Modals */}
                <AssessmentFormModal
                    isOpen={isAssessmentModalOpen} onClose={() => setIsAssessmentModalOpen(false)}
                    assessmentForm={assessmentForm} setAssessmentForm={setAssessmentForm}
                    criteria={criteria} studentList={studentList} assessments={assessments}
                    handleScoreChange={handleScoreChange} calculateFinalScore={calculateFinalScore}
                    handleSaveAssessment={handleSaveAssessment} getScoreColor={getScoreColor} getScoreLabel={getScoreLabel}
                />

                <AssessmentDetailModal
                    assessment={viewDetail} criteria={criteria} onClose={() => setViewDetail(null)}
                    getScoreColor={getScoreColor} getScoreLabel={getScoreLabel} formatDate={formatDate}
                />

                <CertificateGenerateModal
                    isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)}
                    certForm={certForm} setCertForm={setCertForm}
                    studentList={studentList} certificates={certificates}
                    handleSaveCert={handleSaveCert}
                />

                <CertificatePreviewModal
                    isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)}
                    certificate={selectedCertForPreview}
                />

                <SuratKeteranganGenerateModal
                    isOpen={isSuratModalOpen} onClose={() => setIsSuratModalOpen(false)}
                    suratForm={suratForm} setSuratForm={setSuratForm}
                    studentList={studentList} suratList={suratList}
                    handleSaveSurat={handleSaveSurat}
                />

                <SuratKeteranganPreviewModal
                    isOpen={isSuratPreviewOpen} onClose={() => setIsSuratPreviewOpen(false)}
                    surat={selectedSuratForPreview}
                />
            </main>

            <CriteriaManagementModal
                isOpen={isCriteriaModalOpen} criteria={criteria} editingCriteria={editingCriteria}
                criteriaForm={criteriaForm} setCriteriaForm={setCriteriaForm} getBobotByCategory={getBobotByCategory}
                onClose={() => setIsCriteriaModalOpen(false)} onSave={handleSaveCriteria}
                onEdit={handleEditCriteria} onDelete={handleDeleteCriteria}
                onCancelEdit={() => { setEditingCriteria(null); setCriteriaForm({ name: '', category: 'behavior', bobot: '' }); }}
            />
        </>
    );
};

export default AssessmentCertificate;

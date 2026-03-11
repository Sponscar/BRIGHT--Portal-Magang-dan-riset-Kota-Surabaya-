import { useState } from 'react';
import { initialActivityTypes } from '../../data/activityTypes';
import AdminHeader from '../../components/admin/AdminHeader';
import LogbookReviewTab from '../../components/admin/review-logbook/LogbookReviewTab';
import ActivityManagementTab from '../../components/admin/review-logbook/ActivityManagementTab';
import LogbookActionModal from '../../components/admin/review-logbook/LogbookActionModal';
import LogbookDetailModal from '../../components/admin/review-logbook/LogbookDetailModal';
import ActivityModal from '../../components/admin/review-logbook/ActivityModal';
import DeleteActivityModal from '../../components/admin/review-logbook/DeleteActivityModal';
import KurikulumReviewTab from '../../components/admin/review-logbook/KurikulumReviewTab';
import KurikulumDetailModal from '../../components/admin/review-logbook/KurikulumDetailModal';

const ReviewLogbook = () => {
    // Mock Data for Logbook Entries
    const [entries, setEntries] = useState([
        {
            id: 1,
            studentName: 'Ahmad Rizki',
            university: 'Universitas Mataram',
            date: 'Senin, 20 Okt 2025',
            type: 'Laporan Harian',
            category: 'Peningkatan Kompetensi SDM',
            activityType: 'Bimbingan teknis SDM dengan biaya APBD',
            activity: 'Mengikuti kegiatan bimbingan teknis untuk pengembangan kompetensi SDM.',
            lokasiNama: 'Kantor BRIGHT',
            lokasiLat: -7.2576937,
            lokasiLng: 112.7474810,
            pembelajaran: 'Saya belajar bagaimana merancang modul pelatihan yang efektif untuk aparatur sipil negara dengan metode yang interaktif.',
            status: 'pending',
            document: null
        },
        {
            id: 2,
            studentName: 'Siti Aminah',
            university: 'Universitas Bumigora',
            date: 'Minggu, 19 Okt 2025',
            type: 'Laporan Mingguan',
            category: 'Kolaborasi',
            activityType: 'Fasilitasi pengabdian masyarakat, magang, dan/atau penugasan dari PTN/PTS',
            activity: 'Melakukan fasilitasi kegiatan pengabdian masyarakat di desa binaan.',
            status: 'approved',
            document: 'laporan_minggu_3.pdf'
        },
        {
            id: 3,
            studentName: 'Budi Santoso',
            university: 'Universitas Mataram',
            date: 'Sabtu, 18 Okt 2025',
            type: 'Laporan Harian',
            category: 'Pemantauan dan Evaluasi',
            activityType: 'Pemantauan dan Evaluasi Riset',
            activity: 'Melakukan pemantauan lapangan terkait progres riset inovasi daerah.',
            status: 'rejected',
            document: null
        },
        {
            id: 4,
            studentName: 'Dewi Lestari',
            university: 'UPN Veteran Jawa Timur',
            date: '11 Feb 2026',
            type: 'Laporan Harian',
            activityType: 'Peliputan',
            activity: 'Rapat koordinasi dengan tim riset mengenai metodologi penelitian.',
            status: 'rejected',
            document: null
        },
        {
            studentName: 'Budi Santoso',
            university: 'PENS',
            date: '11 Feb 2026',
            type: 'Laporan Harian',
            activityType: 'Troubleshooting',
            activity: 'Troubleshooting server database PostgreSQL.',
            status: 'pending',
            document: null
        }
    ]);

    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Kurikulum Magang mock data
    const [kurikulumStudents] = useState([
        {
            id: 1, name: 'Ahmad Rizki', university: 'Universitas Mataram', major: 'Teknik Informatika', team: 'Riset',
            kurikulum: [
                { id: 1, materi: 'Pengolahan data statistik menggunakan SPSS', tanggalInput: '20 Okt 2025' },
                { id: 2, materi: 'Metode penelitian kualitatif dan kuantitatif', tanggalInput: '18 Okt 2025' },
                { id: 3, materi: 'Teknik penulisan laporan ilmiah', tanggalInput: '15 Okt 2025' },
            ]
        },
        {
            id: 2, name: 'Siti Aminah', university: 'Universitas Bumigora', major: 'Kesehatan Masyarakat', team: 'Inovasi',
            kurikulum: [
                { id: 4, materi: 'Analisis data kesehatan masyarakat', tanggalInput: '19 Okt 2025' },
                { id: 5, materi: 'Dashboard monitoring epidemiologi', tanggalInput: '17 Okt 2025' },
            ]
        },
        {
            id: 3, name: 'Budi Santoso', university: 'Universitas Mataram', major: 'Teknik Elektro', team: 'Kesekretariatan',
            kurikulum: [
                { id: 6, materi: 'Perancangan sistem IoT dengan mikrokontroler', tanggalInput: '18 Okt 2025' },
            ]
        },
        {
            id: 4, name: 'Dewi Lestari', university: 'UPN Veteran Jawa Timur', major: 'Sistem Informasi', team: 'Riset',
            kurikulum: [
                { id: 7, materi: 'Pengembangan dashboard visualisasi data', tanggalInput: '16 Okt 2025' },
                { id: 8, materi: 'Database management dengan PostgreSQL', tanggalInput: '14 Okt 2025' },
            ]
        },
    ]);
    const [selectedKurikulumStudent, setSelectedKurikulumStudent] = useState(null);
    const [isKurikulumDetailOpen, setIsKurikulumDetailOpen] = useState(false);

    const handleAction = (entry, type) => {
        setSelectedEntry(entry);
        setActionType(type);
        setFeedback('');
        setIsModalOpen(true);
    };

    const handleSubmitAction = () => {
        setEntries(prev => prev.map(entry => {
            if (entry.id === selectedEntry.id) {
                return { ...entry, status: actionType === 'approve' ? 'approved' : 'rejected' };
            }
            return entry;
        }));
        setIsModalOpen(false);
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-amber-50 text-amber-700 border-amber-200',
            approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            rejected: 'bg-blue-50 text-blue-700 border-blue-200',
        };
        const labels = {
            pending: 'Menunggu Review',
            approved: 'Disetujui',
            rejected: 'Ditolak',
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const [activeTab, setActiveTab] = useState('review');

    // Activity Types Management
    const [activityTypes, setActivityTypes] = useState(initialActivityTypes);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const [currentActivity, setCurrentActivity] = useState({ name: '', description: '' });
    const [editingActivityId, setEditingActivityId] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('sdm');

    const handleSaveActivity = (e) => {
        e.preventDefault();
        if (editingActivityId) {
            setActivityTypes(prev => prev.map(type =>
                type.id === editingActivityId ? { ...type, ...currentActivity } : type
            ));
        } else {
            setActivityTypes(prev => [
                ...prev,
                { id: Date.now(), ...currentActivity, category: currentCategory }
            ]);
        }
        setIsActivityModalOpen(false);
        setCurrentActivity({ name: '', description: '' });
        setEditingActivityId(null);
        setCurrentCategory('sdm');
    };

    const handleEditActivity = (activity) => {
        setCurrentActivity({ name: activity.name, description: activity.description });
        setEditingActivityId(activity.id);
        setIsActivityModalOpen(true);
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState(null);

    const handleDeleteActivity = (id) => {
        const activity = activityTypes.find(t => t.id === id);
        setActivityToDelete(activity);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteActivity = () => {
        if (activityToDelete) {
            setActivityTypes(prev => prev.filter(type => type.id !== activityToDelete.id));
            setIsDeleteModalOpen(false);
            setActivityToDelete(null);
        }
    };

    const openAddActivityModal = (category) => {
        setCurrentActivity({ name: '', description: '' });
        setEditingActivityId(null);
        setCurrentCategory(category);
        setIsActivityModalOpen(true);
    };

    const [selectedDetailEntry, setSelectedDetailEntry] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const handleViewDetail = (entry) => {
        setSelectedDetailEntry(entry);
        setIsDetailModalOpen(true);
    };

    const filteredEntries = entries.filter(entry => {
        const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;
        const matchesSearch = entry.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.activityType.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <>
            <AdminHeader title="Review Logbook" subtitle="Pantau dan review aktivitas harian mahasiswa magang." />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Tabs */}
                    <div className="border-b border-slate-200 mb-6">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('review')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'review'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }`}
                            >
                                Review Logbook
                            </button>
                            <button
                                onClick={() => setActiveTab('activities')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'activities'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }`}
                            >
                                Kelola Jenis Aktivitas
                            </button>
                            <button
                                onClick={() => setActiveTab('kurikulum')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'kurikulum'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }`}
                            >
                                Review Kurikulum Magang
                            </button>
                        </nav>
                    </div>

                    {activeTab === 'review' ? (
                        <LogbookReviewTab
                            entries={entries}
                            filteredEntries={filteredEntries}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            filterStatus={filterStatus}
                            setFilterStatus={setFilterStatus}
                            getStatusBadge={getStatusBadge}
                            onViewDetail={handleViewDetail}
                            onAction={handleAction}
                        />
                    ) : activeTab === 'activities' ? (
                        <ActivityManagementTab
                            activityTypes={activityTypes}
                            onAdd={openAddActivityModal}
                            onEdit={handleEditActivity}
                            onDelete={handleDeleteActivity}
                        />
                    ) : (
                        <KurikulumReviewTab
                            students={kurikulumStudents}
                            onViewDetail={(student) => {
                                setSelectedKurikulumStudent(student);
                                setIsKurikulumDetailOpen(true);
                            }}
                        />
                    )}
                </div>
            </main>

            <LogbookActionModal
                isOpen={isModalOpen}
                selectedEntry={selectedEntry}
                actionType={actionType}
                feedback={feedback}
                setFeedback={setFeedback}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitAction}
            />

            <LogbookDetailModal
                isOpen={isDetailModalOpen}
                entry={selectedDetailEntry}
                getStatusBadge={getStatusBadge}
                onClose={() => setIsDetailModalOpen(false)}
                onAction={handleAction}
            />

            <ActivityModal
                isOpen={isActivityModalOpen}
                editingActivityId={editingActivityId}
                currentActivity={currentActivity}
                setCurrentActivity={setCurrentActivity}
                onClose={() => setIsActivityModalOpen(false)}
                onSave={handleSaveActivity}
            />

            <DeleteActivityModal
                isOpen={isDeleteModalOpen}
                activityToDelete={activityToDelete}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteActivity}
            />

            <KurikulumDetailModal
                isOpen={isKurikulumDetailOpen}
                student={selectedKurikulumStudent}
                onClose={() => setIsKurikulumDetailOpen(false)}
            />
        </>
    );
};

export default ReviewLogbook;

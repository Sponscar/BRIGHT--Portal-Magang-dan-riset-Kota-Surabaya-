import { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import TeamFormModal from '../../components/admin/teams/TeamFormModal';
import TeamCard from '../../components/admin/teams/TeamCard';

const TeamManagement = () => {
    const [teams, setTeams] = useState([
        { id: '1', name: 'Kesekretariatan', slug: 'secretariat', icon: 'folder_shared', short_description: 'Tim yang menangani administrasi dan dokumentasi BRIGHT', full_description: 'Tim Kesekretariatan bertanggung jawab atas pengelolaan administrasi, dokumentasi kegiatan, dan koordinasi internal BRIGHT.', responsibilities: ['Mengelola arsip dan dokumen administrasi', 'Membuat laporan kegiatan berkala'], requirements: ['Teliti dan rapi dalam bekerja', 'Mahir Microsoft Office'], is_active: true },
        { id: '2', name: 'Riset', slug: 'research', icon: 'science', short_description: 'Tim yang fokus pada penelitian dan pengembangan', full_description: 'Tim Riset BRIGHT bertugas melakukan kajian, penelitian, dan analisis data untuk mendukung pengambilan keputusan berbasis bukti.', responsibilities: ['Melakukan penelitian dan kajian', 'Mengumpulkan dan menganalisis data'], requirements: ['Kemampuan analisis data yang kuat', 'Familiar dengan metodologi penelitian'], is_active: true },
        { id: '3', name: 'Inovasi', slug: 'innovation', icon: 'lightbulb', short_description: 'Tim yang mengembangkan solusi inovatif', full_description: 'Tim Inovasi BRIGHT berfokus pada pengembangan ide-ide kreatif dan solusi inovatif untuk tantangan pembangunan daerah.', responsibilities: ['Mengembangkan ide dan konsep inovatif', 'Prototyping solusi digital'], requirements: ['Kreatif dan open-minded', 'Familiar dengan design thinking'], is_active: true }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTeam, setCurrentTeam] = useState(null);
    const [formData, setFormData] = useState({ name: '', slug: '', icon: '', short_description: '', full_description: '', responsibilities: '', requirements: '', is_active: true });

    const openAddModal = () => { setFormData({ name: '', slug: '', icon: 'groups', short_description: '', full_description: '', responsibilities: '', requirements: '', is_active: true }); setCurrentTeam(null); setIsModalOpen(true); };
    const openEditModal = (team) => { setFormData({ ...team, responsibilities: team.responsibilities.join('\n'), requirements: team.requirements.join('\n') }); setCurrentTeam(team); setIsModalOpen(true); };

    const handleSave = (e) => {
        e.preventDefault();
        const newTeamData = { ...formData, id: currentTeam ? currentTeam.id : Date.now().toString(), responsibilities: formData.responsibilities.split('\n').filter(item => item.trim() !== ''), requirements: formData.requirements.split('\n').filter(item => item.trim() !== '') };
        if (currentTeam) { setTeams(teams.map(t => t.id === currentTeam.id ? newTeamData : t)); } else { setTeams([...teams, newTeamData]); }
        setIsModalOpen(false);
    };

    const toggleStatus = (id) => { setTeams(teams.map(t => t.id === id ? { ...t, is_active: !t.is_active } : t)); };

    return (
        <>
            <AdminHeader title="Data Tim" subtitle="Kelola data tim magang BRIGHT.">
                <button onClick={openAddModal} className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                    <span className="material-symbols-outlined notranslate text-[20px]">add</span> Tambah Tim
                </button>
                <div className="h-8 w-px bg-slate-200 mx-2"></div>
            </AdminHeader>

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {teams.map((team) => (
                        <TeamCard key={team.id} team={team} onEdit={openEditModal} onToggleStatus={toggleStatus} />
                    ))}

                    {/* Add New Placeholder Card */}
                    <button onClick={openAddModal} className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all min-h-[300px] group">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-white group-hover:shadow-md">
                            <span className="material-symbols-outlined notranslate text-4xl">add</span>
                        </div>
                        <span className="font-bold text-lg">Tambah Tim Baru</span>
                        <span className="text-sm mt-1 opacity-70">Buat divisi magang baru</span>
                    </button>
                </div>

                <TeamFormModal isOpen={isModalOpen} currentTeam={currentTeam} formData={formData} setFormData={setFormData} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
            </main>
        </>
    );
};

export default TeamManagement;

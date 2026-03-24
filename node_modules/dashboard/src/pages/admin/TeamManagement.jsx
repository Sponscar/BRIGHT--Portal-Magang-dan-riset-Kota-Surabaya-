import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth, isOpdRole } from '../../context/AuthContext';
import { useTeams } from '../../context/TeamContext';
import AdminHeader from '../../components/admin/AdminHeader';
import TeamFormModal from '../../components/admin/teams/TeamFormModal';
import TeamCard from '../../components/admin/teams/TeamCard';

const TeamManagement = () => {
    const { user } = useAuth();
    const isOpd = isOpdRole(user?.role);
    const opdName = user?.opd?.nama || 'OPD';
    const headerSubtitle = isOpd ? `Kelola data tim lokus ${opdName}.` : 'Kelola data tim magang BRIGHT.';
    const { teams, addTeam, updateTeam, toggleTeamStatus } = useTeams();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTeam, setCurrentTeam] = useState(null);
    const [formData, setFormData] = useState({ name: '', slug: '', icon: '', short_description: '', full_description: '', responsibilities: '', requirements: '', is_active: true });

    const openAddModal = () => { setFormData({ name: '', slug: '', icon: 'groups', short_description: '', full_description: '', responsibilities: '', requirements: '', is_active: true }); setCurrentTeam(null); setIsModalOpen(true); };
    const openEditModal = (team) => { setFormData({ ...team, responsibilities: team.responsibilities.join('\n'), requirements: team.requirements.join('\n') }); setCurrentTeam(team); setIsModalOpen(true); };

    const handleSave = (e) => {
        e.preventDefault();
        const newTeamData = { ...formData, id: currentTeam ? currentTeam.id : Date.now().toString(), responsibilities: formData.responsibilities.split('\n').filter(item => item.trim() !== ''), requirements: formData.requirements.split('\n').filter(item => item.trim() !== '') };
        
        if (currentTeam) { 
            updateTeam(currentTeam.id, newTeamData); 
        } else { 
            addTeam(newTeamData); 
        }
        
        setIsModalOpen(false);

        Swal.fire({
            icon: 'success',
            title: 'Berhasil Tersimpan',
            text: 'Data tim telah berhasil diperbarui.',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: { popup: 'validator-popup' },
            backdrop: `rgba(0,0,0,0.4) backdrop-filter: blur(4px)`
        });
    };

    const toggleStatus = (id) => { 
        const team = teams.find(t => t.id === id);
        const newStatus = !team.is_active;

        toggleTeamStatus(id); 

        Swal.fire({
            icon: 'success',
            title: newStatus ? 'Tim Diaktifkan' : 'Tim Dinonaktifkan',
            text: `Tim ${team.name} telah berhasil ${newStatus ? 'diaktifkan' : 'dinonaktifkan'}.`,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: { popup: 'validator-popup' },
            backdrop: `rgba(0,0,0,0.4) backdrop-filter: blur(4px)`
        });
    };

    return (
        <>
            <AdminHeader title="Data Tim" subtitle={headerSubtitle}>
                <button onClick={openAddModal} className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                    <span className="material-symbols-outlined notranslate text-[20px]">add</span> Tambah Tim
                </button>
                <div className="h-8 w-px bg-slate-200 mx-2"></div>
            </AdminHeader>

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-page-enter" key={teams.filter(t => t.is_active).length + teams.length}>
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

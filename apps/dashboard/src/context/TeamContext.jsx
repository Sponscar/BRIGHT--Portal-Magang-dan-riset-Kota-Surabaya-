import { createContext, useContext, useState } from 'react';
import { useAuth, isOpdRole } from './AuthContext';

const TeamContext = createContext();

export const useTeams = () => {
    const context = useContext(TeamContext);
    if (!context) throw new Error('useTeams must be used within TeamProvider');
    return context;
};

export const TeamProvider = ({ children }) => {
    const { user } = useAuth();
    const isOpd = isOpdRole(user?.role);
    const userOpd = user?.opd?.nama || null;

    // All teams across all OPDs — in production this would come from API
    // Each team has an `opd` field: null = BRIDA team, string = OPD-specific team
    const [allTeams, setAllTeams] = useState([
        // BRIDA teams (opd: null)
        { id: '1', opd: null, name: 'Kesekretariatan', slug: 'secretariat', icon: 'folder_shared', short_description: 'Tim yang menangani administrasi dan dokumentasi BRIGHT', full_description: 'Tim Kesekretariatan bertanggung jawab atas pengelolaan administrasi, dokumentasi kegiatan, dan koordinasi internal BRIGHT.', responsibilities: ['Mengelola arsip dan dokumen administrasi', 'Membuat laporan kegiatan berkala'], requirements: ['Teliti dan rapi dalam bekerja', 'Mahir Microsoft Office'], is_active: true },
        { id: '2', opd: null, name: 'Riset', slug: 'research', icon: 'science', short_description: 'Tim yang fokus pada penelitian dan pengembangan', full_description: 'Tim Riset BRIGHT bertugas melakukan kajian, penelitian, dan analisis data untuk mendukung pengambilan keputusan berbasis bukti.', responsibilities: ['Melakukan penelitian dan kajian', 'Mengumpulkan dan menganalisis data'], requirements: ['Kemampuan analisis data yang kuat', 'Familiar dengan metodologi penelitian'], is_active: true },
        { id: '3', opd: null, name: 'Inovasi', slug: 'innovation', icon: 'lightbulb', short_description: 'Tim yang mengembangkan solusi inovatif', full_description: 'Tim Inovasi BRIGHT berfokus pada pengembangan ide-ide kreatif dan solusi inovatif untuk tantangan pembangunan daerah.', responsibilities: ['Mengembangkan ide dan konsep inovatif', 'Prototyping solusi digital'], requirements: ['Kreatif dan open-minded', 'Familiar dengan design thinking'], is_active: true },
    ]);

    // Scoped teams: OPD users only see their own OPD's teams, BRIDA sees BRIDA teams (opd: null)
    const teams = isOpd
        ? allTeams.filter(t => t.opd === userOpd)
        : allTeams.filter(t => t.opd === null);

    // Active teams only (for dropdowns)
    const activeTeams = teams.filter(t => t.is_active);

    const addTeam = (team) => {
        // Auto-tag with current user's OPD
        const taggedTeam = { ...team, opd: isOpd ? userOpd : null };
        setAllTeams(prev => [...prev, taggedTeam]);
    };

    const updateTeam = (id, updatedTeam) => {
        setAllTeams(prev => prev.map(t => t.id === id ? { ...updatedTeam, opd: t.opd } : t));
    };

    const toggleTeamStatus = (id) => {
        setAllTeams(prev => prev.map(t => t.id === id ? { ...t, is_active: !t.is_active } : t));
    };

    return (
        <TeamContext.Provider value={{ teams, activeTeams, addTeam, updateTeam, toggleTeamStatus }}>
            {children}
        </TeamContext.Provider>
    );
};

export default TeamContext;

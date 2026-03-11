const TeamCard = ({ team, onEdit, onToggleStatus }) => {
    return (
        <div className={`bg-white rounded-2xl border transition-all hover:shadow-lg group relative overflow-hidden ${team.is_active ? 'border-slate-200' : 'border-slate-200 bg-slate-50 opacity-75'}`}>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${team.is_active ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-500'}`}>
                        <span className="material-symbols-outlined notranslate text-3xl">{team.icon}</span>
                    </div>
                    <div className="flex gap-1">
                        <button onClick={() => onEdit(team)} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="Edit Tim">
                            <span className="material-symbols-outlined notranslate text-[20px]">edit</span>
                        </button>
                        <button onClick={() => onToggleStatus(team.id)}
                            className={`p-2 rounded-lg transition-colors ${team.is_active ? 'text-emerald-500 hover:bg-emerald-50 hover:text-emerald-700' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                            title={team.is_active ? "Non-aktifkan Tim" : "Aktifkan Tim"}>
                            <span className="material-symbols-outlined notranslate text-[20px]">{team.is_active ? 'toggle_on' : 'toggle_off'}</span>
                        </button>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1">{team.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 h-10 mb-4">{team.short_description}</p>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="material-symbols-outlined notranslate text-[16px] text-slate-400">assignment</span>
                        <span>{team.responsibilities.length} Tugas Utama</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="material-symbols-outlined notranslate text-[16px] text-slate-400">verified</span>
                        <span>{team.requirements.length} Persyaratan</span>
                    </div>
                </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs font-medium">
                <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">{team.slug}</span>
                <button onClick={() => onToggleStatus(team.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${team.is_active ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${team.is_active ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                    {team.is_active ? 'Aktif' : 'Non-aktif'}
                </button>
            </div>
        </div>
    );
};

export default TeamCard;

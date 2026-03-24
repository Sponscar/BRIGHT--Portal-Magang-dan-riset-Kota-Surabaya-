const VerificationTable = ({
    mode = 'brida',
    students, adminData,
    teamSelections, teamDropdownOpen, teamOptions,
    enablerSubOptions, risetSubOptions, inovasiSubOptions,
    pengelolaankebunrayamangroveSubOptions, kesekretariatanSubOptions,
    onTeamToggle, onRisetTypeToggle, onEnablerTypeToggle,
    onInovasiTypeToggle, onPengelolaanKebunRayaTypeToggle,
    onKesekretariatanTypeToggle, onLainnyaTextChange,
    onToggleTeamDropdown, onAction, onForwardToOpd,
    onViewAdmin, getStatusBadge
}) => {
    const isOpdMode = mode === 'opd';

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-200">
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Mahasiswa</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Perguruan Tinggi / Prodi</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Dokumen</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                                {isOpdMode ? 'Plotting Perangkat Daerah' : 'Ploting Tim'}
                            </th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Administrasi</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                            <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right whitespace-nowrap">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-sm border border-primary/10">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <span className="block font-semibold text-slate-900">{student.name}</span>
                                            <span className="text-xs text-slate-500">{student.date}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900">{student.university}</span>
                                        <span className="text-xs text-slate-500">{student.major}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex gap-2">
                                        <a href={student.documents.cv} target="_blank" rel="noopener noreferrer" title="Lihat CV" className="p-1.5 text-slate-500 hover:text-primary bg-slate-100 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center">
                                            <span className="material-symbols-outlined notranslate text-[18px]">badge</span>
                                        </a>
                                        <a href={student.documents.letter} target="_blank" rel="noopener noreferrer" title="Lihat Surat Pengantar" className="p-1.5 text-slate-500 hover:text-primary bg-slate-100 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center">
                                            <span className="material-symbols-outlined notranslate text-[18px]">article</span>
                                        </a>
                                        <a href={student.documents.proposal} target="_blank" rel="noopener noreferrer" title="Lihat Proposal" className="p-1.5 text-slate-500 hover:text-primary bg-slate-100 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center">
                                            <span className="material-symbols-outlined notranslate text-[18px]">description</span>
                                        </a>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    {isOpdMode ? (
                                        /* === OPD MODE: Show OPD name + kelurahan === */
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-medium text-slate-800">{student.opd}</span>
                                            {student.kelurahanOpd && (
                                                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                                                    <span className="material-symbols-outlined notranslate text-[12px]">pin_drop</span>
                                                    Kel. {student.kelurahanOpd}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        /* === BRIDA MODE: Team assignment dropdown === */
                                        student.status === 'pending' || student.status === 'revision' ? (
                                            <TeamAssignmentCell
                                                student={student}
                                                teamSelections={teamSelections}
                                                teamDropdownOpen={teamDropdownOpen}
                                                teamOptions={teamOptions}
                                                enablerSubOptions={enablerSubOptions}
                                                risetSubOptions={risetSubOptions}
                                                inovasiSubOptions={inovasiSubOptions}
                                                pengelolaankebunrayamangroveSubOptions={pengelolaankebunrayamangroveSubOptions}
                                                kesekretariatanSubOptions={kesekretariatanSubOptions}
                                                onTeamToggle={onTeamToggle}
                                                onRisetTypeToggle={onRisetTypeToggle}
                                                onEnablerTypeToggle={onEnablerTypeToggle}
                                                onInovasiTypeToggle={onInovasiTypeToggle}
                                                onPengelolaanKebunRayaTypeToggle={onPengelolaanKebunRayaTypeToggle}
                                                onKesekretariatanTypeToggle={onKesekretariatanTypeToggle}
                                                onLainnyaTextChange={onLainnyaTextChange}
                                                onToggleTeamDropdown={onToggleTeamDropdown}
                                            />
                                        ) : (
                                            <span className="text-sm font-medium text-slate-700">{student.team}</span>
                                        )
                                    )}
                                </td>
                                <td className="py-4 px-6">
                                    {(() => {
                                        const admin = adminData.find(a => a.studentId === student.id);
                                        return admin ? (
                                            <button
                                                onClick={() => onViewAdmin(admin)}
                                                className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-bold rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-all flex items-center gap-1.5"
                                            >
                                                <span className="material-symbols-outlined notranslate text-[16px]">visibility</span>
                                                View
                                            </button>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">Belum ada</span>
                                        );
                                    })()}
                                </td>
                                <td className="py-4 px-6">
                                    {getStatusBadge(student.status)}
                                </td>
                                <td className="py-4 px-6 text-right">
                                    {isOpdMode ? (
                                        /* === OPD MODE ACTIONS === */
                                        student.status === 'pending' || student.status === 'revision' ? (
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => onAction(student, 'revision')} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Minta Revisi">
                                                    <span className="material-symbols-outlined notranslate text-[20px]">edit_note</span>
                                                </button>
                                                <button onClick={() => onAction(student, 'approve')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Setujui">
                                                    <span className="material-symbols-outlined notranslate text-[20px]">check_circle</span>
                                                </button>
                                            </div>
                                        ) : student.status === 'approved' && onForwardToOpd ? (
                                            <button onClick={() => onForwardToOpd(student)}
                                                className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-1.5 ml-auto"
                                                title="Kirim ke OPD">
                                                <span className="material-symbols-outlined notranslate text-[16px]">send</span>
                                                Kirim ke OPD
                                            </button>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">
                                                {student.status === 'forwarded_to_opd' ? 'Sudah dikirim' : 'Selesai'}
                                            </span>
                                        )
                                    ) : (
                                        /* === BRIDA MODE ACTIONS === */
                                        student.status === 'pending' || student.status === 'revision' ? (
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => onAction(student, 'revision')} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Minta Revisi">
                                                    <span className="material-symbols-outlined notranslate text-[20px]">edit_note</span>
                                                </button>
                                                <button onClick={() => onAction(student, 'approve')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Setujui">
                                                    <span className="material-symbols-outlined notranslate text-[20px]">check_circle</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">Selesai</span>
                                        )
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <p className="text-xs text-slate-500">Menampilkan {students.length} data</p>
                <div className="flex gap-1">
                    <button className="p-1 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">Prev</button>
                    <button className="p-1 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">Next</button>
                </div>
            </div>
        </div>
    );
};

// Sub-component for the team assignment dropdown cell
const TeamAssignmentCell = ({
    student, teamSelections, teamDropdownOpen, teamOptions,
    enablerSubOptions, risetSubOptions, inovasiSubOptions,
    pengelolaankebunrayamangroveSubOptions, kesekretariatanSubOptions,
    onTeamToggle, onRisetTypeToggle, onEnablerTypeToggle,
    onInovasiTypeToggle, onPengelolaanKebunRayaTypeToggle,
    onKesekretariatanTypeToggle, onLainnyaTextChange, onToggleTeamDropdown
}) => {
    const sel = teamSelections[student.id] || { teams: [], risetTypes: [], enablerTypes: [], inovasiTypes: [], pengelolaankebunrayamangroveTypes: [], kesekretariatanTypes: [], lainnyaCustomText: '' };

    const subOptionsMap = {
        'Riset': { options: risetSubOptions, types: sel.risetTypes, handler: onRisetTypeToggle },
        'Enabler / Faktor Pendorong': { options: enablerSubOptions, types: sel.enablerTypes, handler: onEnablerTypeToggle },
        'Inovasi': { options: inovasiSubOptions, types: sel.inovasiTypes, handler: onInovasiTypeToggle },
        'Pengelolaan Kebun Raya Mangrove': { options: pengelolaankebunrayamangroveSubOptions, types: sel.pengelolaankebunrayamangroveTypes, handler: onPengelolaanKebunRayaTypeToggle },
        'Kesekretariatan': { options: kesekretariatanSubOptions, types: sel.kesekretariatanTypes, handler: onKesekretariatanTypeToggle },
    };

    const getTagLabel = (t) => {
        if (t === 'Riset' && sel.risetTypes.length > 0) return `Riset (${sel.risetTypes.join(', ')})`;
        if (t === 'Enabler / Faktor Pendorong' && sel.enablerTypes.length > 0) return `Enabler (${sel.enablerTypes.join(', ')})`;
        if (t === 'Inovasi' && sel.inovasiTypes.length > 0) return `Inovasi (${sel.inovasiTypes.join(', ')})`;
        if (t === 'Pengelolaan Kebun Raya Mangrove' && sel.pengelolaankebunrayamangroveTypes.length > 0) return `Kebun Raya (${sel.pengelolaankebunrayamangroveTypes.join(', ')})`;
        if (t === 'Kesekretariatan' && sel.kesekretariatanTypes.length > 0) return `Kesekretariatan (${sel.kesekretariatanTypes.join(', ')})`;
        if (t === 'Lainnya' && sel.lainnyaCustomText) return `Lainnya (${sel.lainnyaCustomText})`;
        return t;
    };

    return (
        <div className="relative">
            <button
                onClick={() => onToggleTeamDropdown(student.id)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary flex items-center gap-2 min-w-[140px] justify-between"
            >
                <span className="truncate max-w-[160px]">
                    {sel.teams.length === 0 ? 'Pilih Tim...' : `${sel.teams.length} tim dipilih`}
                </span>
                <span className="material-symbols-outlined notranslate text-[16px] text-slate-400">
                    {teamDropdownOpen[student.id] ? 'expand_less' : 'expand_more'}
                </span>
            </button>
            {teamDropdownOpen[student.id] && (
                <div className="absolute z-30 top-full left-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg py-2 min-w-[220px] max-h-[280px] overflow-y-auto">
                    {teamOptions.map(team => {
                        const isChecked = sel.teams.includes(team);
                        return (
                            <div key={team}>
                                <label className="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 cursor-pointer transition-colors">
                                    <input type="checkbox" checked={isChecked} onChange={() => onTeamToggle(student.id, team)}
                                        className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary" />
                                    <span className="text-xs font-medium text-slate-700">{team}</span>
                                </label>
                                {subOptionsMap[team] && isChecked && (
                                    <div className="ml-9 mr-3 mb-1 bg-slate-50 rounded-lg border border-slate-100 p-2 space-y-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jenis Penugasan</span>
                                        {subOptionsMap[team].options.map(sub => (
                                            <label key={sub} className="flex items-center gap-2 py-1 cursor-pointer">
                                                <input type="checkbox" checked={subOptionsMap[team].types.includes(sub)}
                                                    onChange={() => subOptionsMap[team].handler(student.id, sub)}
                                                    className="w-3.5 h-3.5 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary" />
                                                <span className="text-xs text-slate-600">{sub}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {team === 'Lainnya' && isChecked && (
                                    <div className="ml-9 mr-3 mb-1 bg-slate-50 rounded-lg border border-slate-100 p-2 space-y-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jenis Penugasan</span>
                                        <input type="text" placeholder="Ketik jenis penugasan..."
                                            value={sel.lainnyaCustomText || ''}
                                            onChange={(e) => onLainnyaTextChange(student.id, e.target.value)}
                                            className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            {sel.teams.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                    {sel.teams.map(t => (
                        <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-bold rounded-md border border-primary/10">
                            {getTagLabel(t)}
                            <button onClick={(e) => { e.stopPropagation(); onTeamToggle(student.id, t); }} className="text-primary/50 hover:text-primary ml-0.5">×</button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VerificationTable;

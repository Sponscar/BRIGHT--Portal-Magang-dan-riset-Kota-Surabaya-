const StudentManagementTable = ({
    activeTab, filteredStudents, filteredPermissions,
    selectedDate, getLogForDate, formatDateDisplay,
    getAttendanceColor, getPermissionColor,
    handleAction, handlePermissionAction
}) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="font-bold text-slate-900">
                    {activeTab === 'presensi' ? 'Daftar Presensi Mahasiswa' : 'Daftar Pengajuan Izin'}
                </h2>
            </div>
            <div className="overflow-x-auto">
                {activeTab === 'presensi' ? (
                    <AttendanceTable
                        students={filteredStudents} selectedDate={selectedDate}
                        getLogForDate={getLogForDate} formatDateDisplay={formatDateDisplay}
                        getAttendanceColor={getAttendanceColor} handleAction={handleAction}
                    />
                ) : (
                    <PermissionTable
                        permissions={filteredPermissions} formatDateDisplay={formatDateDisplay}
                        getPermissionColor={getPermissionColor} getAttendanceColor={getAttendanceColor}
                        handlePermissionAction={handlePermissionAction}
                    />
                )}
            </div>
        </div>
    );
};

const AttendanceTable = ({ students, selectedDate, getLogForDate, formatDateDisplay, getAttendanceColor, handleAction }) => (
    <table className="w-full text-left border-collapse">
        <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Mahasiswa</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Perguruan Tinggi / Prodi</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Tim Kerja</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Waktu Presensi</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Aksi</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
            {students.length > 0 ? students.map((student) => {
                const logOnDate = getLogForDate(student, selectedDate);
                return (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm border border-slate-200">
                                    {student.name.charAt(0)}
                                </div>
                                <span className="font-semibold text-slate-900">{student.name}</span>
                            </div>
                        </td>
                        <td className="py-4 px-6">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900">{student.university}</span>
                                <span className="text-xs text-slate-500">{student.major}</span>
                            </div>
                        </td>
                        <td className="py-4 px-6">
                            <span className="text-sm text-slate-700">{student.team}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                            {logOnDate ? (
                                <div className="flex flex-col items-center">
                                    <span className="text-sm font-medium text-slate-900">{formatDateDisplay(logOnDate.date)}</span>
                                    <span className="text-xs text-slate-500">{logOnDate.time}</span>
                                </div>
                            ) : (
                                <span className="text-slate-300 text-sm">-</span>
                            )}
                        </td>
                        <td className="py-4 px-6 text-right">
                            {logOnDate && logOnDate.status === 'pending' ? (
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => handleAction(student.id, logOnDate.date, 'reject')} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">Ditolak</button>
                                    <button onClick={() => handleAction(student.id, logOnDate.date, 'approve')} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors">Disetujui</button>
                                </div>
                            ) : logOnDate && logOnDate.status !== 'pending' ? (
                                <div className="flex justify-end">
                                    <span className={`text-xs font-semibold px-2 py-1 rounded border inline-block ${getAttendanceColor(logOnDate.status)}`}>
                                        {logOnDate.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-slate-300 text-xs italic">Belum absen</span>
                            )}
                        </td>
                    </tr>
                );
            }) : (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Tidak ada data ditemukan.</td></tr>
            )}
        </tbody>
    </table>
);

const PermissionTable = ({ permissions, formatDateDisplay, getPermissionColor, getAttendanceColor, handlePermissionAction }) => (
    <table className="w-full text-left border-collapse">
        <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Mahasiswa</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal & Jenis</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Keterangan</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Bukti</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Status Validasi</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
            {permissions.length > 0 ? permissions.map((perm) => (
                <tr key={perm.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                        <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">{perm.studentName}</span>
                            <span className="text-xs text-slate-500">{perm.university}</span>
                        </div>
                    </td>
                    <td className="py-4 px-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-slate-900">{formatDateDisplay(perm.date)}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded border w-fit ${getPermissionColor(perm.type)}`}>{perm.type}</span>
                        </div>
                    </td>
                    <td className="py-4 px-6">
                        <p className="text-sm text-slate-600 max-w-xs truncate" title={perm.description}>{perm.description}</p>
                    </td>
                    <td className="py-4 px-6 text-center">
                        {perm.proofLink ? (
                            <a href={perm.proofLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-primary hover:text-white transition-colors">
                                <span className="material-symbols-outlined notranslate text-[18px]">link</span>
                            </a>
                        ) : (
                            <span className="text-slate-300 text-xs">-</span>
                        )}
                    </td>
                    <td className="py-4 px-6 text-right">
                        {perm.status === 'pending' ? (
                            <div className="flex justify-end gap-2">
                                <button onClick={() => handlePermissionAction(perm.id, 'reject')} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">Ditolak</button>
                                <button onClick={() => handlePermissionAction(perm.id, 'approve')} className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors">Terima</button>
                            </div>
                        ) : (
                            <div className="flex justify-end">
                                <span className={`text-xs font-semibold px-2 py-1 rounded border inline-block ${getAttendanceColor(perm.status)}`}>
                                    {perm.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                                </span>
                            </div>
                        )}
                    </td>
                </tr>
            )) : (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Tidak ada pengajuan izin ditemukan.</td></tr>
            )}
        </tbody>
    </table>
);

export default StudentManagementTable;

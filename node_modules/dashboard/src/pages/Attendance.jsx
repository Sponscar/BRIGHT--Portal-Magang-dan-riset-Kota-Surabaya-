import { useState, useEffect } from 'react';
import Sidebar from '../components/mahasiswa/Sidebar';
import MobileHeader from '../components/mahasiswa/MobileHeader';
import AttendanceHistoryTable from '../components/mahasiswa/attendance/AttendanceHistoryTable';
import PermissionHistoryTable from '../components/mahasiswa/attendance/PermissionHistoryTable';
import PermissionModal from '../components/mahasiswa/attendance/PermissionModal';

const Attendance = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [attendanceStatus, setAttendanceStatus] = useState('not_started');
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [permissionType, setPermissionType] = useState('izin');
    const [permissionDescription, setPermissionDescription] = useState('');
    const [permissionLink, setPermissionLink] = useState('');

    const [history, setHistory] = useState([
        { id: 1, date: '12 Februari 2026', rawDate: '2026-02-12', checkIn: '07:55', status: 'Hadir', type: '-', description: 'Tepat Waktu' },
        { id: 2, date: '11 Februari 2026', rawDate: '2026-02-11', checkIn: '08:00', status: 'Hadir', type: '-', description: 'Tepat Waktu' },
        { id: 3, date: '10 Februari 2026', rawDate: '2026-02-10', checkIn: '-', status: 'Izin', type: 'Sakit', description: 'Demam tinggi', proofLink: 'https://drive.google.com/file/d/...' },
    ]);

    const [filterDateStart, setFilterDateStart] = useState('');
    const [filterDateEnd, setFilterDateEnd] = useState('');
    const [filterAttDateStart, setFilterAttDateStart] = useState('');
    const [filterAttDateEnd, setFilterAttDateEnd] = useState('');

    useEffect(() => { const timer = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(timer); }, []);

    const handleCheckIn = () => {
        const newRecord = { id: history.length + 1, date: currentTime.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), rawDate: currentTime.toISOString().split('T')[0], checkIn: currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), status: 'Hadir', type: '-', description: 'Tepat Waktu' };
        setHistory([newRecord, ...history]);
        setAttendanceStatus('checked_in');
    };

    const handlePermissionSubmit = (e) => {
        e.preventDefault();
        const newRecord = { id: history.length + 1, date: currentTime.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), rawDate: currentTime.toISOString().split('T')[0], checkIn: '-', status: 'Izin', type: permissionType === 'sakit' ? 'Sakit' : 'Izin', description: permissionDescription, proofLink: permissionLink };
        setHistory([newRecord, ...history]);
        setAttendanceStatus('permission');
        setShowPermissionModal(false);
        setPermissionType('izin'); setPermissionDescription(''); setPermissionLink('');
    };

    return (
        <div className="flex h-screen w-full bg-[#fafafa] text-[#1b0d0d] font-display overflow-hidden">
            <Sidebar />
            <div className="flex h-full flex-1 flex-col overflow-hidden">
                <MobileHeader title="Presensi" />
                <main className="flex-1 overflow-y-auto bg-[#fafafa] p-6 lg:p-8">
                    <div className="w-full max-w-6xl mx-auto space-y-8">
                        {/* Page Header */}
                        <div className="border-b border-[#f3e7e7] pb-6">
                            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#1b0d0d]">Presensi</h2>
                            <p className="text-[#9a4c4c] text-sm font-medium mt-1">Catat kehadiran harian Anda atau ajukan izin jika berhalangan.</p>
                        </div>

                        {/* Attendance Card */}
                        <div className="bg-white rounded-xl border border-[#f3e7e7] p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
                            <div>
                                <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mb-2">Waktu Saat Ini</p>
                                <h3 className="text-5xl font-bold text-slate-900 tracking-tight">{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</h3>
                                <p className="text-slate-500 mt-2 font-medium">{currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div className="flex gap-4 w-full max-w-md">
                                <button onClick={handleCheckIn} disabled={attendanceStatus !== 'not_started'}
                                    className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${attendanceStatus === 'not_started' ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 hover:-translate-y-1' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                                    <span className="material-symbols-outlined notranslate">login</span>Presensi Masuk
                                </button>
                                <button onClick={() => setShowPermissionModal(true)} disabled={attendanceStatus !== 'not_started'}
                                    className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${attendanceStatus === 'not_started' ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 hover:-translate-y-1' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                                    <span className="material-symbols-outlined notranslate">event_busy</span>Ajukan Izin
                                </button>
                            </div>
                            {attendanceStatus === 'checked_in' && <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium animate-pulse">Anda sudah melakukan presensi masuk hari ini. Selamat beraktivitas!</div>}
                            {attendanceStatus === 'permission' && <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">Pengajuan izin Anda telah berhasil dicatat.</div>}
                        </div>

                        {/* Attendance History */}
                        <AttendanceHistoryTable records={history} filterDateStart={filterAttDateStart} filterDateEnd={filterAttDateEnd}
                            onFilterDateStartChange={setFilterAttDateStart} onFilterDateEndChange={setFilterAttDateEnd}
                            onResetFilter={() => { setFilterAttDateStart(''); setFilterAttDateEnd(''); }} />

                        {/* Permission History */}
                        <PermissionHistoryTable records={history} filterDateStart={filterDateStart} filterDateEnd={filterDateEnd}
                            onFilterDateStartChange={setFilterDateStart} onFilterDateEndChange={setFilterDateEnd}
                            onResetFilter={() => { setFilterDateStart(''); setFilterDateEnd(''); }} />
                    </div>
                </main>

                <PermissionModal isOpen={showPermissionModal} permissionType={permissionType} permissionDescription={permissionDescription} permissionLink={permissionLink}
                    onTypeChange={setPermissionType} onDescriptionChange={setPermissionDescription} onLinkChange={setPermissionLink}
                    onClose={() => setShowPermissionModal(false)} onSubmit={handlePermissionSubmit} />
            </div>
        </div>
    );
};

export default Attendance;

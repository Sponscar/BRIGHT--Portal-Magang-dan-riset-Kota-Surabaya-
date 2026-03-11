import { useState, useRef, useEffect } from 'react';

const PeerAssessmentForm = ({ peers, criteria, onSubmit }) => {
    const [selectedPeer, setSelectedPeer] = useState('');
    const [scores, setScores] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    // Search dropdown states
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handlePeerChange = (peerId) => {
        setSelectedPeer(peerId);
        setScores(criteria.map(c => ({ kriteriaId: c.id, kriteriaName: c.name, score: '', keterangan: '' })));
        setFeedback('');
    };

    const handleScoreChange = (kriteriaId, field, value) => {
        setScores(prev =>
            prev.map(s =>
                s.kriteriaId === kriteriaId
                    ? { ...s, [field]: field === 'score' ? Math.min(100, Math.max(0, Number(value) || '')) : value }
                    : s
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedPeer) { alert('Pilih teman magang terlebih dahulu.'); return; }
        const hasEmpty = scores.some(s => s.score === '' || s.score === 0);
        if (hasEmpty) { alert('Harap isi semua nilai kriteria.'); return; }
        setIsSubmitting(true);
        try {
            await onSubmit({
                mahasiswaId: selectedPeer,
                scores: scores.map(s => ({ ...s, score: Number(s.score) })),
                feedback,
            });
            // Reset form
            setSelectedPeer('');
            setScores([]);
            setFeedback('');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getAvgScore = () => {
        const valid = scores.filter(s => s.score !== '' && s.score > 0);
        if (valid.length === 0) return 0;
        return (valid.reduce((sum, s) => sum + Number(s.score), 0) / valid.length).toFixed(1);
    };

    const availablePeers = peers.filter(p => !p.alreadyAssessed);
    const assessedPeers = peers.filter(p => p.alreadyAssessed);

    const filteredPeers = availablePeers.filter(p =>
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.university.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (peers.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-5">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined notranslate text-amber-500 text-[22px]">group</span>
                    <div>
                        <h3 className="text-base font-bold text-gray-800">Penilaian Teman Magang</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Belum ada teman magang dalam tusi yang sama.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined notranslate text-amber-500 text-[22px]">group</span>
                    <div className="text-left">
                        <h3 className="text-base font-bold text-gray-800">Penilaian Teman Magang</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Nilai perilaku kerja teman sesama tusi</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {assessedPeers.length > 0 && (
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-200">
                            {assessedPeers.length}/{peers.length} dinilai
                        </span>
                    )}
                    <span className={`material-symbols-outlined notranslate text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        expand_more
                    </span>
                </div>
            </button>

            {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="mt-4 mb-4 relative" ref={dropdownRef}>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Pilih Teman Magang</label>
                        <div className="relative">
                            <div
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white cursor-pointer flex justify-between items-center"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span className={selectedPeer ? 'text-gray-900' : 'text-gray-500'}>
                                    {selectedPeer
                                        ? (() => {
                                            const peer = availablePeers.find(p => p.id === selectedPeer);
                                            return peer ? `${peer.fullName} — ${peer.university}` : 'Pilih Teman';
                                        })()
                                        : '-- Pilih Teman --'}
                                </span>
                                <span className="material-symbols-outlined notranslate text-gray-400 text-[20px]">
                                    {isDropdownOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </div>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden flex flex-col">
                                    <div className="p-2 border-b border-gray-100 shrink-0 sticky top-0 bg-white">
                                        <div className="relative flex items-center">
                                            <span className="material-symbols-outlined notranslate absolute left-3 text-gray-400 text-[18px]">search</span>
                                            <input
                                                type="text"
                                                className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
                                                placeholder="Cari nama / asal universitas..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                    </div>
                                    <div className="overflow-y-auto flex-1 p-1">
                                        {filteredPeers.length > 0 ? (
                                            filteredPeers.map(p => (
                                                <div
                                                    key={p.id}
                                                    className={`px-3 py-2 text-sm cursor-pointer rounded-md hover:bg-amber-50 ${selectedPeer === p.id ? 'bg-amber-50 text-amber-600 font-medium' : 'text-gray-700'}`}
                                                    onClick={() => {
                                                        handlePeerChange(p.id);
                                                        setIsDropdownOpen(false);
                                                        setSearchQuery('');
                                                    }}
                                                >
                                                    {p.fullName} <span className="text-gray-400 text-xs ml-1">— {p.university}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-3 py-4 text-sm text-center text-gray-500">
                                                Tidak ada teman yang cocok
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {availablePeers.length === 0 && (
                            <p className="text-xs text-emerald-600 mt-1 font-medium">✅ Semua teman sudah dinilai!</p>
                        )}
                    </div>

                    {/* Already assessed list */}
                    {assessedPeers.length > 0 && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Sudah Dinilai</p>
                            <div className="flex flex-wrap gap-2">
                                {assessedPeers.map(p => (
                                    <span key={p.id} className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium border border-emerald-200">
                                        <span className="material-symbols-outlined notranslate text-[12px]">check</span>
                                        {p.fullName}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Score form */}
                    {selectedPeer && (
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-3">
                                {scores.map(s => (
                                    <div key={s.kriteriaId} className="grid grid-cols-12 gap-3 items-center bg-gray-50 rounded-xl p-3 border border-gray-100">
                                        <div className="col-span-5 sm:col-span-5">
                                            <span className="text-sm font-medium text-gray-700">{s.kriteriaName}</span>
                                        </div>
                                        <div className="col-span-3 sm:col-span-2">
                                            <input
                                                type="number" min="1" max="100" placeholder="0-100"
                                                className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-amber-200 focus:border-amber-400 outline-none"
                                                value={s.score}
                                                onChange={(e) => handleScoreChange(s.kriteriaId, 'score', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-4 sm:col-span-5">
                                            <input
                                                type="text" placeholder="Keterangan..."
                                                className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-200 focus:border-amber-400 outline-none"
                                                value={s.keterangan}
                                                onChange={(e) => handleScoreChange(s.kriteriaId, 'keterangan', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Feedback + Average */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="md:col-span-2">
                                    <textarea
                                        rows="2" placeholder="Catatan untuk teman (opsional)..."
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-200 focus:border-amber-400 outline-none resize-none"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center bg-amber-50 rounded-xl border border-amber-200 p-3">
                                    <span className="text-xs font-medium text-amber-500 uppercase">Rata-rata</span>
                                    <span className="text-2xl font-bold text-amber-600">{getAvgScore()}</span>
                                </div>
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    type="submit" disabled={isSubmitting}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-200 disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined notranslate text-[18px]">save</span>
                                    {isSubmitting ? 'Menyimpan...' : 'Simpan Penilaian'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default PeerAssessmentForm;

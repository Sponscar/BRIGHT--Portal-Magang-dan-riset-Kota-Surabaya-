import { useState } from 'react';

const KurikulumMagangForm = ({ onSubmit }) => {
    const [materiList, setMateriList] = useState(['']);

    const handleAddMateri = () => {
        setMateriList(prev => [...prev, '']);
    };

    const handleRemoveMateri = (index) => {
        setMateriList(prev => prev.filter((_, i) => i !== index));
    };

    const handleChangeMateri = (index, value) => {
        setMateriList(prev => prev.map((item, i) => i === index ? value : item));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validMateri = materiList.filter(m => m.trim() !== '');
        if (validMateri.length === 0) return;
        onSubmit(validMateri);
        setMateriList(['']);
    };

    return (
        <section className="space-y-4">
            <h3 className="text-xl font-semibold text-[#1b0d0d]">Form Kurikulum Magang</h3>
            <div className="bg-white rounded-xl border border-[#f3e7e7] shadow-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-700">
                            Materi yang diperoleh / diterapkan selama magang di BRIDA
                        </label>
                        {materiList.map((materi, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="flex-1 relative">
                                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                        <span className="material-symbols-outlined notranslate text-[18px]">school</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={materi}
                                        onChange={(e) => handleChangeMateri(index, e.target.value)}
                                        placeholder={`Materi ke-${index + 1}, contoh: Pengolahan data statistik menggunakan SPSS`}
                                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#1b0d0d] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                                {materiList.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveMateri(index)}
                                        className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Hapus materi"
                                    >
                                        <span className="material-symbols-outlined notranslate text-[20px]">close</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleAddMateri}
                            className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-slate-300 text-slate-600 rounded-xl text-sm font-semibold hover:border-primary hover:text-primary hover:bg-blue-50/50 transition-all"
                        >
                            <span className="material-symbols-outlined notranslate text-[18px]">add_circle</span>
                            Tambah Materi
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200/50"
                        >
                            <span className="material-symbols-outlined notranslate text-[18px]">save</span>
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default KurikulumMagangForm;

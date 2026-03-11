import React from 'react';

const ProfileForm = ({ profileData, isEditing, onInputChange, onSave, onCancel, onEditClick }) => {
    return (
        <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-6 border-b border-[#f3e7e7] pb-4">
                <h3 className="text-lg font-bold text-[#1b0d0d] flex items-center gap-2">
                    <span className="material-symbols-outlined notranslate text-primary">badge</span>
                    Informasi Pribadi & Akademik
                </h3>
                {!isEditing && (
                    <button
                        onClick={onEditClick}
                        className="text-sm font-bold text-primary hover:text-[#d41111] flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined notranslate text-[18px]">edit</span>
                        Edit
                    </button>
                )}
            </div>

            <form onSubmit={onSave} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Nama Lengkap</label>
                        <input
                            type="text"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={onInputChange}
                            disabled={!isEditing}
                            className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">NIK (Nomor Induk Kependudukan)</label>
                        <input
                            type="text"
                            name="nik"
                            value={profileData.nik || ''}
                            onChange={onInputChange}
                            disabled={!isEditing}
                            className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={onInputChange}
                            disabled={true} // Email usually shouldn't be changed easily
                            className="w-full text-sm rounded-lg border-[#e0d0d0] bg-slate-50 text-gray-500 shadow-sm px-3 py-2 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Nomor Telepon</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={onInputChange}
                            disabled={!isEditing}
                            className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">No. WhatsApp</label>
                        <input
                            type="tel"
                            name="whatsapp"
                            value={profileData.whatsapp || ''}
                            onChange={onInputChange}
                            disabled={!isEditing}
                            className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Alamat KTP / Sesuai Identitas</label>
                        <textarea
                            name="address"
                            value={profileData.address || ''}
                            onChange={onInputChange}
                            disabled={!isEditing}
                            rows={2}
                            className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2 resize-none"
                        />
                    </div>
                </div>

                <div className="border-t border-[#f3e7e7] pt-5 mt-5">
                    <h4 className="text-sm font-bold text-[#1b0d0d] mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined notranslate text-primary text-[18px]">location_on</span>
                        Alamat Domisili
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Provinsi</label>
                            <input
                                type="text"
                                name="provinsi"
                                value={profileData.provinsi || ''}
                                onChange={onInputChange}
                                disabled={!isEditing}
                                className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Kota / Kabupaten</label>
                            <input
                                type="text"
                                name="kotaKabupaten"
                                value={profileData.kotaKabupaten || ''}
                                onChange={onInputChange}
                                disabled={!isEditing}
                                className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Kecamatan</label>
                            <input
                                type="text"
                                name="kecamatan"
                                value={profileData.kecamatan || ''}
                                onChange={onInputChange}
                                disabled={!isEditing}
                                className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Kelurahan</label>
                            <input
                                type="text"
                                name="kelurahan"
                                value={profileData.kelurahan || ''}
                                onChange={onInputChange}
                                disabled={!isEditing}
                                className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Alamat Lengkap</label>
                            <textarea
                                name="alamatLengkap"
                                value={profileData.alamatLengkap || ''}
                                onChange={onInputChange}
                                disabled={!isEditing}
                                rows={2}
                                className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2 resize-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#f3e7e7] pt-5 mt-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Asal Universitas</label>
                            <input
                                type="text"
                                name="university"
                                value={profileData.university || ''}
                                onChange={onInputChange}
                                disabled={!isEditing}
                                className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Program Studi</label>
                            <input
                                type="text"
                                name="major"
                                value={profileData.major || ''}
                                onChange={onInputChange}
                                disabled={!isEditing}
                                className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Alamat Universitas</label>
                            <textarea
                                name="universityAddress"
                                value={profileData.universityAddress || ''}
                                onChange={onInputChange}
                                disabled={!isEditing}
                                rows={2}
                                className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2 resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Kecamatan Universitas</label>
                            <input
                                type="text"
                                name="uniKecamatan"
                                value={profileData.uniKecamatan || ''}
                                onChange={onInputChange}
                                disabled={!isEditing}
                                className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Kelurahan Universitas</label>
                            <input
                                type="text"
                                name="uniKelurahan"
                                value={profileData.uniKelurahan || ''}
                                onChange={onInputChange}
                                disabled={!isEditing}
                                className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">NIM / NPM</label>
                            <input
                                type="text"
                                name="nim"
                                value={profileData.nim || ''}
                                onChange={onInputChange}
                                disabled={!isEditing}
                                className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Semester</label>
                            <input
                                type="text"
                                name="semester"
                                value={profileData.semester || ''}
                                onChange={onInputChange}
                                disabled={!isEditing}
                                className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                            />
                        </div>
                    </div>
                </div>

                {(profileData.internshipType === 'Magang KP' || profileData.internshipType === 'Magang MBKM') && (
                    <div className="border-t border-[#f3e7e7] pt-5 mt-5">
                        <h4 className="text-sm font-bold text-[#1b0d0d] mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined notranslate text-primary text-[18px]">work_history</span>
                            Detail Magang
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Durasi Magang</label>
                                <input
                                    type="text"
                                    name="internshipDuration"
                                    placeholder="Contoh: 3 Bulan / 6 Bulan"
                                    value={profileData.internshipDuration}
                                    onChange={onInputChange}
                                    disabled={!isEditing}
                                    className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#1b0d0d] mb-1.5">Konversi SKS</label>
                                <input
                                    type="text"
                                    name="conversionType"
                                    placeholder="Contoh: 20 SKS"
                                    value={profileData.conversionType}
                                    onChange={onInputChange}
                                    disabled={!isEditing}
                                    className="w-full text-sm rounded-lg border-[#e0d0d0] bg-white disabled:bg-slate-50 disabled:text-gray-500 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary px-3 py-2"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {isEditing && (
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-5 py-2 rounded-lg border border-[#e0d0d0] text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-[#d41111] transition-all shadow-md shadow-blue-200/50"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProfileForm;

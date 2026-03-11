import React from 'react';

const ProfileCard = ({ profileData, isEditing, onImageChange }) => {
    return (
        <div className="w-full md:w-auto flex flex-col items-center gap-4 shrink-0">
            <div className="relative group">
                <div className="h-32 w-32 rounded-full border-4 border-blue-50 bg-blue-50 flex items-center justify-center overflow-hidden">
                    {profileData.profileImage ? (
                        <img src={profileData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <span className="material-symbols-outlined notranslate text-primary text-[64px]">person</span>
                    )}
                </div>
                {isEditing && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                        <span className="material-symbols-outlined notranslate text-white text-[32px]">photo_camera</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onImageChange}
                        />
                    </label>
                )}
            </div>
            <div className="text-center">
                <h2 className="text-xl font-bold text-[#1b0d0d]">{profileData.fullName}</h2>
                <p className="text-sm text-[#9a4c4c]">{profileData.email}</p>
            </div>
            <div className="px-4 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200 flex items-center gap-1.5">
                <span className="material-symbols-outlined notranslate text-[14px]">work</span>
                {profileData.internshipType || 'Belum dipilih'}
            </div>
            <div className="mt-2 px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200 flex items-center gap-1.5">
                <span className="material-symbols-outlined notranslate text-[14px]">groups</span>
                {profileData.timKerja || 'Tim belum ditentukan'}
            </div>
        </div>
    );
};

export default ProfileCard;

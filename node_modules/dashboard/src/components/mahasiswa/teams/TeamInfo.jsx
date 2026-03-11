import React from 'react';

const TeamInfo = ({ team }) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined notranslate text-primary text-2xl">{team.icon}</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[#1b0d0d]">Tim {team.name}</h1>
                        <p className="text-sm text-[#9a4c4c]">{team.short_description}</p>
                    </div>
                </div>
            </div>

            {/* Deskripsi */}
            <div className="bg-white rounded-xl shadow-sm border border-[#f3e7e7] p-6">
                <h2 className="text-lg font-bold text-[#1b0d0d] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined notranslate text-primary text-xl">info</span>
                    Tentang Tim
                </h2>
                <p className="text-gray-600 leading-relaxed">{team.full_description}</p>
            </div>
        </div>
    );
};

export default TeamInfo;

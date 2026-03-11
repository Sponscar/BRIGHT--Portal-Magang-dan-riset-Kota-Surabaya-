import React from 'react';

const TeamResponsibilities = ({ responsibilities }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-[#f3e7e7] p-6">
            <h2 className="text-lg font-bold text-[#1b0d0d] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined notranslate text-primary text-xl">task_alt</span>
                Tugas & Tanggung Jawab
            </h2>
            <ul className="space-y-3">
                {responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="material-symbols-outlined notranslate text-green-600 text-sm">check</span>
                        </span>
                        <span className="text-gray-600">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamResponsibilities;

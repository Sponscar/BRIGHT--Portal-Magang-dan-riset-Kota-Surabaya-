import React from 'react';

const TeamRequirements = ({ requirements }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-[#f3e7e7] p-6">
            <h2 className="text-lg font-bold text-[#1b0d0d] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined notranslate text-primary text-xl">checklist</span>
                Persyaratan & Skill
            </h2>
            <ul className="space-y-3">
                {requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="material-symbols-outlined notranslate text-blue-600 text-sm">star</span>
                        </span>
                        <span className="text-gray-600">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamRequirements;

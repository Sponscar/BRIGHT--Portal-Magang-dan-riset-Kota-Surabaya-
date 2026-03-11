const StatsGrid = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div key={index} className={`bg-white rounded-2xl p-6 shadow-sm border ${stat.border} hover:shadow-md transition-shadow relative overflow-hidden group`}>
                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
                        <span className="material-symbols-outlined notranslate text-6xl">{stat.icon}</span>
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
                            <span className="material-symbols-outlined notranslate text-2xl">{stat.icon}</span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{stat.value}</h3>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;

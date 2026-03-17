const StatsGrid = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div key={index} className={`${stat.bg} rounded-2xl p-6 shadow-sm border ${stat.border} hover:shadow-md transition-all duration-300 relative overflow-hidden group`}>
                    <div className={`absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 ${stat.color}`}>
                        <span className="material-symbols-outlined notranslate text-8xl">{stat.icon}</span>
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/60 backdrop-blur-sm ${stat.color} shadow-sm`}>
                            <span className="material-symbols-outlined notranslate text-2xl">{stat.icon}</span>
                        </div>
                        <div>
                            <h3 className={`text-3xl font-bold tracking-tight mb-1 ${stat.darkText || 'text-slate-900'}`}>{stat.value}</h3>
                            <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;

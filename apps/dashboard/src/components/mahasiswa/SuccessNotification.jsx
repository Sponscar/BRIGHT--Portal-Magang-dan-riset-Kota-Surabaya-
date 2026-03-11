const SuccessNotification = ({ message, show }) => {
    if (!show) return null;

    return (
        <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in-down shadow-sm">
            <span className="material-symbols-outlined notranslate text-[20px]">check_circle</span>
            <span className="text-sm font-bold">{message}</span>
        </div>
    );
};

export default SuccessNotification;

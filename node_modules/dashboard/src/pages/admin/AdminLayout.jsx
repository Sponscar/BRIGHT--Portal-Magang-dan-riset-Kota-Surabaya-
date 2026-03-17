import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

const AdminLayout = () => {
    const location = useLocation();
    
    return (
        <div className="flex h-screen w-full bg-[#f8f9fa] text-slate-800 font-display overflow-hidden">
            <Sidebar role="admin" />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div key={location.pathname} className="animate-page-enter h-full flex flex-col overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

const AdminLayout = () => {
    return (
        <div className="flex h-screen w-full bg-[#f8f9fa] text-slate-800 font-display overflow-hidden">
            <Sidebar role="admin" />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;

import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from '../context/SidebarContext';
import Sidebar from '../components/mahasiswa/Sidebar';

const StudentLayout = () => {
    const location = useLocation();

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full bg-[#fafafa] text-[#1b0d0d] font-display overflow-hidden">
                <Sidebar />
                <div key={location.pathname} className="flex h-full flex-1 flex-col overflow-hidden animate-page-enter">
                    <Outlet />
                </div>
            </div>
        </SidebarProvider>
    );
};

export default StudentLayout;

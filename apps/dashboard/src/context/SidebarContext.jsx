import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isSidebarBlurred, setIsSidebarBlurred] = useState(false);

    return (
        <SidebarContext.Provider value={{ isSidebarBlurred, setIsSidebarBlurred }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    return useContext(SidebarContext);
};

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for existing session
        const savedUser = localStorage.getItem('brida_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password, role, userData = {}) => {
        // Mock authentication - in real app, this would call an API
        const mockUser = {
            id: Date.now(),
            email,
            role, // 'admin' or 'student'
            name: userData.name || (role === 'admin' ? 'Admin BRIDA' : 'Mahasiswa'),
            ...userData
        };
        setUser(mockUser);
        localStorage.setItem('brida_user', JSON.stringify(mockUser));
        return mockUser;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('brida_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Default admin account untuk testing
const DEFAULT_ADMIN = {
    email: 'admin@brida.com',
    password: 'admin123',
    name: 'Administrator',
    role: 'admin',
};

// Ambil semua user yang terdaftar dari localStorage
const getRegisteredUsers = () => {
    const users = [];

    // Admin default
    users.push(DEFAULT_ADMIN);

    // User dari registrasi
    const regData = localStorage.getItem('brida_registered_users');
    if (regData) {
        try {
            const parsed = JSON.parse(regData);
            users.push(...parsed);
        } catch { /* ignore */ }
    }

    return users;
};

// Simpan user baru ke daftar registered users
export const registerUser = (userData) => {
    const regData = localStorage.getItem('brida_registered_users');
    const users = regData ? JSON.parse(regData) : [];
    users.push({
        email: userData.email,
        password: userData.password,
        name: userData.name || userData.fullName,
        role: 'student',
        ...userData,
    });
    localStorage.setItem('brida_registered_users', JSON.stringify(users));
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('brida_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const registeredUsers = getRegisteredUsers();

        // Cari user yang cocok email & password
        const found = registeredUsers.find(
            u => u.email === email && u.password === password
        );

        if (!found) {
            throw new Error('Email atau password salah. Pastikan Anda sudah terdaftar.');
        }

        const loggedInUser = {
            id: Date.now().toString(),
            email: found.email,
            role: found.role || 'student',
            name: found.name,
        };

        setUser(loggedInUser);
        localStorage.setItem('brida_user', JSON.stringify(loggedInUser));
        localStorage.setItem('token', `mock-token-${loggedInUser.id}`);
        return loggedInUser;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('brida_user');
        localStorage.removeItem('token');
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

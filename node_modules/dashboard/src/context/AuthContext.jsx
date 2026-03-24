import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Default admin account untuk testing
const DEFAULT_ADMIN = {
    email: 'admin@brida.com',
    password: 'admin123',
    name: 'Administrator BRIDA',
    role: 'admin',
    opd: null,
};

// Default OPD accounts untuk testing
const DEFAULT_OPD_ACCOUNTS = [
    {
        email: 'admin.brida@surabaya.go.id',
        password: 'admin123',
        name: 'Admin Magang BRIDA',
        role: 'admin_opd',
        opd: { nama: 'Badan Riset dan Inovasi Daerah', slug: 'brida' },
    },
    {
        email: 'koordinator.brida@surabaya.go.id',
        password: 'admin123',
        name: 'Koordinator BRIDA',
        role: 'koordinator_opd',
        opd: { nama: 'Badan Riset dan Inovasi Daerah', slug: 'brida' },
    },
    {
        email: 'admin.diskominfo@surabaya.go.id',
        password: 'admin123',
        name: 'Admin Magang Diskominfo',
        role: 'admin_opd',
        opd: { nama: 'Dinas Komunikasi dan Informatika', slug: 'diskominfo' },
    },
    {
        email: 'koordinator.diskominfo@surabaya.go.id',
        password: 'admin123',
        name: 'Koordinator Diskominfo',
        role: 'koordinator_opd',
        opd: { nama: 'Dinas Komunikasi dan Informatika', slug: 'diskominfo' },
    },
];

// Helper: determine dashboard path based on role
export const getDashboardPath = (role) => {
    if (role === 'admin' || role === 'admin_opd' || role === 'koordinator_opd') return '/admin';
    return '/student';
};

// Helper: is admin-level role (BRIDA)
export const isBridaAdmin = (role) => role === 'admin';

// Helper: is OPD-level role
export const isOpdRole = (role) => role === 'admin_opd' || role === 'koordinator_opd';

// Ambil semua user yang terdaftar dari localStorage
const getRegisteredUsers = () => {
    const users = [];

    // Admin default + OPD accounts
    users.push(DEFAULT_ADMIN);
    users.push(...DEFAULT_OPD_ACCOUNTS);

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
        opd: null,
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
            opd: found.opd || null,
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

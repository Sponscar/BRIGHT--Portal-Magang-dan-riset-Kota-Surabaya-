import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const socketRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Connect ke backend WebSocket
        const savedUser = localStorage.getItem('brida_user');
        const userRole = savedUser ? JSON.parse(savedUser).role : 'student';

        const newSocket = io(window.location.origin, {
            auth: { token },
            query: { role: userRole },
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 2000,
        });

        newSocket.on('connect', () => {
            console.log('🔌 WebSocket connected:', newSocket.id);
            setConnected(true);
        });

        newSocket.on('disconnect', (reason) => {
            console.log('❌ WebSocket disconnected:', reason);
            setConnected(false);
        });

        newSocket.on('connect_error', (err) => {
            console.warn('⚠️ WebSocket connect error:', err.message);
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
            socketRef.current = null;
        };
    }, []);

    // Reconnect ketika token berubah (login/logout)
    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem('token');
            if (!token && socketRef.current) {
                socketRef.current.disconnect();
                setSocket(null);
                setConnected(false);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <SocketContext.Provider value={{ socket, connected }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;

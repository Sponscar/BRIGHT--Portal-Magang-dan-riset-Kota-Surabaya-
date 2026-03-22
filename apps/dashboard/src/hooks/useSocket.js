import { useEffect, useRef } from 'react';
import { useSocket } from '../contexts/SocketContext';

/**
 * Custom hook untuk subscribe ke WebSocket events dengan auto-cleanup.
 * 
 * @param {string} eventName - Nama event dari server (e.g. 'penilaian:submitted')
 * @param {function} callback - Handler yang dipanggil saat event diterima
 * 
 * @example
 * useSocketEvent('penilaian:submitted', (data) => {
 *     console.log('Penilaian baru:', data);
 *     toast.info(`${data.assessorName} telah menilai ${data.mahasiswaName}`);
 * });
 */
export const useSocketEvent = (eventName, callback) => {
    const { socket } = useSocket() || {};
    const callbackRef = useRef(callback);

    // Update ref setiap render agar tidak perlu re-subscribe
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!socket) return;

        const handler = (data) => callbackRef.current(data);
        socket.on(eventName, handler);

        return () => {
            socket.off(eventName, handler);
        };
    }, [socket, eventName]);
};

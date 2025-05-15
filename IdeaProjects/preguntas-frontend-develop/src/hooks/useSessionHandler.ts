import { useAppStore } from './useAppStore';
import { AuthenticationResponse } from '../models/users.models';
// Servicios para manejar el JWT en cookies
import {
    getJwtToken,
    removeJwtToken,
    setJwtToken,
    decodeJwtToken,
} from '../services/cookies.service';

export const useSessionHandler = () => {
    const sessionContext = useAppStore(store => store.session);
    const setSessionContext = useAppStore(store => store.setSession);
    const clearSessionContext = useAppStore(store => store.clearSession);

    // Verifica si hay un JWT válido
    const isSessionValid = (): boolean => {
        const jwtToken = getJwtToken();
        if (!jwtToken) return false;
        const decodedToken = decodeJwtToken(jwtToken);
        return decodedToken && decodedToken.exp > Date.now() / 1000; // Verificar expiración
    };

    // Establece el JWT tanto en el estado global como en el servicio (cookies o almacenamiento)
    const setSessionStore = (response: AuthenticationResponse) => {
        const { token } = response;

        setSessionContext({ token }); // Guardar token en el estado global
        setJwtToken(token); // Guardar token en cookie o almacenamiento local
    };

    // Limpia la sesión en ambos lugares
    const clearSession = () => {
        clearSessionContext();
        removeJwtToken(); // Limpiar JWT del servicio (cookies, almacenamiento)
    };

    // Carga la sesión desde el almacenamiento (cookie o memoria) al estado global
    const loadSessionFromStorage = () => {
        const jwtToken = getJwtToken();

        if (jwtToken) {
            const decodedToken = decodeJwtToken(jwtToken);
            if (decodedToken) {
                setSessionContext({ token: jwtToken }); // Guardar el token decodificado
            }
        }
    };

    const getRoleFromToken = (token: string | null): string | null => {
        if (!token) return null;
    
        try {
            const decoded: any = decodeJwtToken(token);
            return decoded.role || null;
        } catch (e) {
            console.error('Error al decodificar el token', e);
            return null;
        }
    };

    return {
        isSessionValid,
        sessionContext,
        setSessionStore,
        clearSession,
        loadSessionFromStorage,
        getRoleFromToken
    };
};

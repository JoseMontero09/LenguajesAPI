import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const COOKIE_NAME = 'jwtToken';

// Guarda el JWT en la cookie
export const setJwtToken = (token: string) => {
    Cookies.set(COOKIE_NAME, token, {
        expires: 1, // Expira en 1 día
        secure: true, // Solo se envía por HTTPS
        sameSite: 'Strict', // Previene ataques CSRF
    });
};

// Obtiene el JWT desde la cookie
export const getJwtToken = (): string | undefined => {
    return Cookies.get(COOKIE_NAME);
};

// Elimina el JWT de la cookie
export const removeJwtToken = () => {
    Cookies.remove(COOKIE_NAME);
};

// Decodifica el JWT (sin verificar la firma)
export const decodeJwtToken = (token: string): any => {
    try {
        return jwtDecode(token);
    } catch (e) {
        return null;
    }
};
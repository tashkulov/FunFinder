import { UserRole } from './types';

const TOKEN_KEY = 'accessToken';
const EMAIL_KEY = 'userEmail';

export const userStorage = {
    getToken: () => localStorage.getItem(TOKEN_KEY),
    setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    removeToken: () => localStorage.removeItem(TOKEN_KEY),

    getEmail: () => localStorage.getItem(EMAIL_KEY),
    setEmail: (email: string) => localStorage.setItem(EMAIL_KEY, email),
    removeEmail: () => localStorage.removeItem(EMAIL_KEY),

    clearAll: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(EMAIL_KEY);
    },
};

export const getUserRole = (): UserRole | null => {
    // можно хранить в localStorage или брать с бэка
    return localStorage.getItem('userRole') as UserRole | null;
};

export const setUserRole = (role: UserRole) => {
    localStorage.setItem('userRole', role);
};

export const removeUserRole = () => {
    localStorage.removeItem('userRole');
};

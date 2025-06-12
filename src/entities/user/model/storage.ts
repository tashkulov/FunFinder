const TOKEN_KEY = 'accessToken';
const EMAIL_KEY = 'userEmail';
const ROLE_KEY = 'userRole';
const USER_ID_KEY = 'userId';
const REFRESH_TOKEN_KEY = 'refreshToken';

const notifyAuthChanged = () => {
    window.dispatchEvent(new Event('authChanged'));
};

export const userStorage = {
    getToken: () => localStorage.getItem(TOKEN_KEY),
    setToken: (token: string) => {
        localStorage.setItem(TOKEN_KEY, token);
        notifyAuthChanged();
    },
    removeToken: () => {
        localStorage.removeItem(TOKEN_KEY);
        notifyAuthChanged();
    },

    getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
    setRefreshToken: (token: string) => {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
    },
    removeRefreshToken: () => {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },

    getEmail: () => localStorage.getItem(EMAIL_KEY),
    setEmail: (email: string) => {
        localStorage.setItem(EMAIL_KEY, email);
        notifyAuthChanged();
    },
    removeEmail: () => {
        localStorage.removeItem(EMAIL_KEY);
        notifyAuthChanged();
    },

    getUserId: () => localStorage.getItem(USER_ID_KEY),
    setUserId: (id: string) => {
        localStorage.setItem(USER_ID_KEY, id);
        notifyAuthChanged();
    },
    removeUserId: () => {
        localStorage.removeItem(USER_ID_KEY);
        notifyAuthChanged();
    },

    clearAll: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(EMAIL_KEY);
        localStorage.removeItem(ROLE_KEY);
        localStorage.removeItem(USER_ID_KEY);
        notifyAuthChanged();
    },
};

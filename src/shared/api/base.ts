import {API_URL} from "../config/env.ts";

export const api = {
    get: async (url: string, token?: string) => {
        const res = await fetch(`${API_URL}${url}`, {
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) throw new Error('Ошибка запроса');
        return res.json();
    },

    post: async (url: string, body: unknown, token?: string) => {
        const res = await fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Ошибка');
        return data;
    },
};

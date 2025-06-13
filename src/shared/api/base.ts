import { API_URL } from "../config/env.ts";

const parseResponse = async (res: Response) => {
    const text = await res.text();

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
};

const handleResponse = async (res: Response) => {
    const data = await parseResponse(res);

    if (!res.ok) {
        const errorMessage =
            (data && typeof data === 'object' && 'message' in data) ? data.message :
                (typeof data === 'string' ? data : 'Ошибка запроса');
        throw new Error(errorMessage);
    }

    return data;
};

export const api = {
    get: async (url: string, token?: string) => {
        const res = await fetch(`${API_URL}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });

        return handleResponse(res);
    },

    post: async (url: string, body: unknown = {}, token?: string) => {
        const res = await fetch(`${API_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(body),
        });

        return handleResponse(res);
    },

    delete: async (url: string, body?: unknown, token?: string) => {
        const res = await fetch(`${API_URL}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        return handleResponse(res);
    },
};


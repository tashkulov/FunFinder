import { API_URL } from "../../../shared/config/env.ts";
import {  userStorage } from "../../../entities/user/model/storage.ts";

type LoginPayload = { email: string; password: string };
type RegisterPayload = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    phone_number: string;
    role: string;
};

export const login = async (payload: LoginPayload) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Ошибка авторизации');

    // ✅ сохраняем всё
    userStorage.setToken(data.accessToken);
    userStorage.setRefreshToken(data.refreshToken); // <— 🔥 важно
    userStorage.setEmail(data.email);
    userStorage.setUserId(data.id);

    return data;
};
export const register = async (payload: RegisterPayload) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Ошибка регистрации');

    return data;
};

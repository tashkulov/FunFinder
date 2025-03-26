import {API_URL} from "../../../shared/config/env.ts";
import {setUserRole, userStorage} from "../../../entities/user/model/storage.ts";

type LoginPayload = { email: string; password: string };
type RegisterPayload = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: string;
};

export const login = async (payload: LoginPayload) => {
    const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    userStorage.setToken(data.accessToken);
    userStorage.setEmail(data.email);
    setUserRole(data.role);
    return data;
};

export const register = async (payload: RegisterPayload) => {
    const res = await fetch(`${API_URL}/users/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
};

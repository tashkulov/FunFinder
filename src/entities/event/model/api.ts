import { EventEntity } from './types';
import {api} from "../../../shared/api/base.ts";
import {userStorage} from "../../user/model/storage.ts";
import {API_URL} from "../../../shared/config/env.ts";

export const fetchEvents = async (): Promise<EventEntity[]> => {
    return api.get('/events');
};

export const fetchSavedEvents = async (): Promise<EventEntity[]> => {
    const token = localStorage.getItem('accessToken');
    return api.get('/events/saved', token ?? undefined);
};
export const likeEvent = async (id: number | string): Promise<void> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Нет токена');

    return api.post(`/events/like/${id}`, {}, token);
};

export const dislikeEvent = async (id: number | string): Promise<void> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Нет токена');

    return api.post(`/events/dislike/${id}`, {}, token);
};

export const commentEvent = async (id: number | string, comment: string): Promise<void> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Нет токена');

    return api.post(`/events/comment/${id}`, { comment }, token);
};



export const fetchEventById = async (id: number): Promise<EventEntity> => {
    return api.get(`/events/${id}`);
};
export const saveEventAsBookmark = async (id: string | number): Promise<void> => {
    const token = userStorage.getToken();
    if (!token) throw new Error('Нет токена');

    const res = await fetch(`${API_URL}/events/save-as-bookmark/${id}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        let errorMessage = 'Ошибка при сохранении';

        try {
            const text = await res.text();
            if (text) {
                const data = JSON.parse(text);
                errorMessage = data.message || errorMessage;
            }
        } catch {
            // тело пустое или не JSON — оставим дефолтное сообщение
        }

        throw new Error(errorMessage);
    }
};

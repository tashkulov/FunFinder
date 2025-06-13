import { EventEntity} from './types';
import {api} from "../../../shared/api/base.ts";

export const fetchEvents = async (): Promise<EventEntity[]> => {

    return api.get('/events',);
};
export const fetchEvent = async (id: string): Promise<EventEntity> => {
    const token = localStorage.getItem('accessToken');
    console.log(token)
    if (!token) throw new Error('Нет токена');
    return  await api.get(`/events/${id}`,token ?? undefined);

};


export const fetchSavedEvents = async (): Promise<EventEntity[]> => {
    const token = localStorage.getItem('accessToken');
    return api.get('/events/saved', token ?? undefined);
};
export const fetchLikedEvents = async (): Promise<EventEntity[]> => {
    const token = localStorage.getItem('accessToken');
    return api.get('/events/liked', token ?? undefined);
};


export const likeEvent = async (id: number | string): Promise<void> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Нет токена');
    return api.post(`/events/like/${id}`, {}, token);
};


export const removeLike = async (id: number | string): Promise<void> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Нет токена');

    return api.delete(`/events/remove-like/${id}`, {}, token);
};

export const commentEvent = async (id: string | number, comment: string): Promise<void> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Нет токена');

    const encodedComment = encodeURIComponent(comment);
    return api.post(`/events/comment/${id}?comment=${encodedComment}`, {}, token);
};



export const fetchEventById = async (id: number): Promise<EventEntity> => {
    return api.get(`/events/${id}`);
};

export const saveEventAsBookmark = async (id: string | number): Promise<void> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Нет токена');
    return api.post(`/events/save-as-bookmark/${id}`, {}, token);
};


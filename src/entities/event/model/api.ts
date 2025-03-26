import { EventEntity } from './types';
import {api} from "../../../shared/api/base.ts";

export const fetchEvents = async (): Promise<EventEntity[]> => {
    return api.get('/events');
};

export const fetchEventById = async (id: number): Promise<EventEntity> => {
    return api.get(`/events/${id}`);
};

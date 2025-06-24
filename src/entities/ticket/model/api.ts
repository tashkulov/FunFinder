import {api} from "../../../shared/api/base.ts";

export interface SoldTicket {
    id: string;
    number: number;
    used: boolean;
    eventTitle: string;
    userFullName: string;
}

export const fetchSoldTickets = async (eventId: string): Promise<SoldTicket[]> => {
    const res = await api.get(`/api/tickets/sold-tickets/${eventId}`);
    return res.data;
};

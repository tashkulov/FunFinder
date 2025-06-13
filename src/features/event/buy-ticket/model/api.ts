import {BuyTicketPayload} from "../../../../entities/event/model/types.ts";
import {api} from "../../../../shared/api/base.ts";

export const buyTicket = async (eventId: string | number, payload: BuyTicketPayload): Promise<void> => {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Нет токена');

    return api.post(`/events/buy-ticket/${eventId}`, payload, token);
}
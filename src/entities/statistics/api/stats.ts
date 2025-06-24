import { API_URL } from "../../../shared/config/env";
import {userStorage} from "../../user/model/storage.ts";

export const fetchSalesStatsByEvents = async () => {
    const res = await fetch(`${API_URL}/events/stats/sales-for-events`, {
        headers: {
            Authorization: `Bearer ${userStorage.getToken()}`,
        },
    });

    if (!res.ok) throw new Error("Ошибка при загрузке статистики по мероприятиям");
    return res.json();
};

export const fetchSalesStatsByParticipants = async () => {
    const res = await fetch(`${API_URL}/events/stats/sales-by-participants`, {
        headers: {
            Authorization: `Bearer ${userStorage.getToken()}`,
        },
    });

    if (!res.ok) throw new Error("Ошибка при загрузке статистики по участникам");
    return res.json();
};

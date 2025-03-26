import {userStorage} from "../../../../entities/user/model/storage.ts";
import {API_URL} from "../../../../shared/config/env.ts";

type CreateEventPayload = {
    title: string;
    description: string;
    location: string;
    minimum_age: number;
    start_time: string;
    price: number;
    price_currency: string;
    amount_of_places: number;
    categories: string[];
};

export const createEvent = async (data: CreateEventPayload, image: File) => {
    const fd = new FormData();
    fd.append('event', JSON.stringify(data));
    fd.append('image', image);

    const token = userStorage.getToken();
    console.log(token);

    const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: fd,
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Ошибка при создании');

    return json;
};

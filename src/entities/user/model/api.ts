import {api} from "../../../shared/api/base.ts";
import {userStorage} from "./storage.ts";
import {Category} from "../../category/model/types.ts";

export const fetchCategories = async (): Promise<Category[]> => {
    return api.get('/categories');
};

export const fetchEventsByCategory = async (categoryId: number): Promise<Event[]> => {
    return api.get(`/categories/${categoryId}/events`);
};



export const getUserProfile = async (id: string) => {
    const token = userStorage.getToken();
    if (!token) throw new Error('Нет токена');

    return api.get(`/users/${id}`);
};
export const fetchAllUsers = async () => {
    const token = userStorage.getToken();
    if (!token) throw new Error('Нет токена');
    return api.get(`/users`);
};

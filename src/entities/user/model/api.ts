import { Category } from './types';
import {api} from "../../../shared/api/base.ts";

export const fetchCategories = async (): Promise<Category[]> => {
    return api.get('/categories');
};

export const fetchEventsByCategory = async (categoryId: number): Promise<Event[]> => {
    return api.get(`/categories/${categoryId}/events`);
};

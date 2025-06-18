import React, { useEffect, useState } from 'react';
import { EventCard } from "../../entities/event/ui/EventCard.tsx";
import { EventEntity } from "../../entities/event/model/types.ts";

interface Category {
    id: number;
    name: string;
}

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [events, setEvents] = useState<EventEntity[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://events-app-backend-937b6e6df475.herokuapp.com/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error('Ошибка при загрузке категорий', err);
            }
        };

        fetchCategories();
    }, []);

    const handleSelectCategory = async (category: Category) => {
        setSelectedCategory(category);
        setLoading(true);
        try {
            const res = await fetch(
                `https://events-app-backend-937b6e6df475.herokuapp.com/api/events/category?category=${encodeURIComponent(category.name)}`
            );
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.error('Ошибка при загрузке событий по категории', err);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    // временно-заглушка для onClick
    const handleOpenEvent = (id: string) => {
        console.log("Открыть событие:", id);
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Категории событий</h1>
            <p className="text-center text-gray-500 mb-10">Выберите интересующую категорию</p>

            <div className="max-w-5xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        onClick={() => handleSelectCategory(category)}
                        className={`cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 ${
                            selectedCategory?.id === category.id ? 'border-2 border-indigo-500' : ''}`}
                    >
                        <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                        <p className="text-gray-500">Нажмите, чтобы посмотреть события</p>
                    </div>
                ))}
            </div>

            {selectedCategory && (
                <div className="max-w-6xl mx-auto mt-12 bg-white p-6 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
                        {selectedCategory.name} мероприятия
                    </h3>

                    {loading ? (
                        <p className="text-gray-500">Загрузка...</p>
                    ) : events.length > 0 ? (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onClick={() => handleOpenEvent(event.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Нет мероприятий в этой категории.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;

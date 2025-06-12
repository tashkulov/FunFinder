import React, { useEffect, useState } from 'react';
import {
    commentEvent,
    fetchEvents,
    likeEvent, removeLike,
    saveEventAsBookmark
} from "../../entities/event/model/api.ts";
import { EventCard } from "../../entities/event/ui/EventCard.tsx";
import { EventEntity } from "../../entities/event/model/types.ts";
import { toast } from "react-toastify";

const HomePage: React.FC = () => {
    const [events, setEvents] = useState<EventEntity[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<EventEntity | null>(null);
    const [likedEventIds, setLikedEventIds] = useState<number[]>([]);
    const [savedEventIds, setSavedEventIds] = useState<number[]>([]);

    useEffect(() => {
        fetchEvents()
            .then(setEvents)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filteredEvents = events.filter(
        (event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLike = async (eventId: number) => {
        try {
            if (likedEventIds.includes(eventId)) {

                await removeLike(eventId);
                setLikedEventIds((prev) => prev.filter((id) => id !== eventId));
                toast.success("Лайк снят");
            } else {
                await likeEvent(eventId);
                setLikedEventIds((prev) => [...prev, eventId]);
                toast.success("Лайк поставлен");
            }
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : 'Ошибка при обновлении лайка';
            toast.error(message);
        }
    };


    const handleSave = async (eventId: number) => {
        try {
            await saveEventAsBookmark(eventId);
            setSavedEventIds((prev) =>
                prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
            );
            toast.success("Сохранено");
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : 'Ошибка при сохранении';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Добро пожаловать в FunFinder 🎉</h1>
                <p className="text-gray-500 mb-4">Находите и организовывайте события легко!</p>
                <input
                    type="text"
                    placeholder="Поиск событий..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-sm p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
            </header>

            <section className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Предстоящие события</h2>

                {loading ? (
                    <p className="text-center text-gray-500">Загрузка событий...</p>
                ) : filteredEvents.length === 0 ? (
                    <p className="text-center text-gray-500">Ничего не найдено по запросу: "{searchTerm}"</p>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onClick={() => setSelectedEvent(event)}
                                liked={likedEventIds.includes(event.id)}
                                saved={savedEventIds.includes(event.id)}
                                onLike={handleLike}
                                onSave={handleSave}
                            />
                        ))}
                    </div>
                )}
            </section>

            {selectedEvent && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
                    onClick={() => setSelectedEvent(null)}
                >
                    <div
                        className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative animate-fade-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                        >
                            ×
                        </button>

                        {selectedEvent.image_url && (
                            <img
                                src={selectedEvent.image_url}
                                alt={selectedEvent.title}
                                className="rounded-lg w-full h-48 object-cover mb-4"
                            />
                        )}
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedEvent.title}</h2>
                        <p className="text-gray-600 mb-1">📅 <b>Дата:</b> {selectedEvent.start_time}</p>
                        <p className="text-gray-600 mb-1">📍 <b>Локация:</b> {selectedEvent.location}</p>
                        {selectedEvent.price && (
                            <p className="text-gray-600 mb-1">💸 <b>Цена:</b> {selectedEvent.price} {selectedEvent.price_currency}</p>
                        )}
                        {selectedEvent.minimum_age && (
                            <p className="text-gray-600 mb-1">🔞 <b>Возраст:</b> {selectedEvent.minimum_age}+</p>
                        )}
                        {selectedEvent.amount_of_places && (
                            <p className="text-gray-600 mb-1">👥 <b>Мест:</b> {selectedEvent.amount_of_places}</p>
                        )}
                        <p className="text-gray-700 mt-4">{selectedEvent.description}</p>

                        <div className="flex gap-6 justify-center text-2xl text-gray-600 mt-6">
                            <button
                                onClick={() => handleLike(selectedEvent.id)}
                                className={`transition text-3xl ${
                                    likedEventIds.includes(selectedEvent.id) ? 'text-red-500' : 'text-gray-500'
                                }`}
                                title="Лайк"
                            >
                                {likedEventIds.includes(selectedEvent.id) ? '❤️' : '🤍'}
                            </button>

                            <button
                                onClick={async () => {
                                    try {
                                        await removeLike(selectedEvent.id);
                                        toast.info('Вы поставили дизлайк.');
                                    } catch (e: any) {
                                        toast.error(e.message || 'Ошибка при дизлайке');
                                    }
                                }}
                                className="hover:text-red-500 transition"
                                title="Дизлайк"
                            >
                                👎
                            </button>

                            <button
                                onClick={async () => {
                                    const comment = prompt('Введите ваш комментарий:');
                                    if (!comment) return;
                                    try {
                                        await commentEvent(selectedEvent.id, comment);
                                        toast.success('Комментарий отправлен!');
                                    } catch (e: any) {
                                        toast.error(e.message || 'Ошибка при отправке комментария');
                                    }
                                }}
                                className="hover:text-indigo-500 transition"
                                title="Комментировать"
                            >
                                💬
                            </button>

                            <button
                                onClick={() => handleSave(selectedEvent.id)}
                                className={`transition text-3xl ${
                                    savedEventIds.includes(selectedEvent.id) ? 'text-yellow-400' : 'text-gray-500'
                                }`}
                                title="Сохранить"
                            >
                                {savedEventIds.includes(selectedEvent.id) ? '⭐' : '☆'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;

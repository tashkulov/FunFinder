import React, { useEffect, useState } from 'react';
import { fetchLikedEvents } from "../../entities/event/model/api.ts";
import { EventCard } from "../../entities/event/ui/EventCard.tsx";
import { EventEntity } from "../../entities/event/model/types.ts";

const LikedPage: React.FC = () => {
    const [events, setEvents] = useState<EventEntity[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<EventEntity | null>(null);

    useEffect(() => {
        fetchLikedEvents()
            .then(setEvents)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filteredEvents = events.filter(
        (event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Понравившиеся</h1>
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
                                liked={true} // в лайкнутых всегда true
                                saved={false} // можно подтягивать при желании отдельно
                                onLike={() => {}}
                                onSave={() => {}}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Модалка деталей */}
            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
                     onClick={() => setSelectedEvent(null)}>
                    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative animate-fade-in"
                         onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                            aria-label="Закрыть">×
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
                            <p className="text-gray-600 mb-1">💸 <b>Цена:</b> {selectedEvent.price} {selectedEvent.price_currency}</p>)}
                        {selectedEvent.minimum_age && (<p className="text-gray-600 mb-1">🔞 <b>Возраст:</b> {selectedEvent.minimum_age}+</p>)}
                        {selectedEvent.amount_of_places && (<p className="text-gray-600 mb-1">👥 <b>Мест:</b> {selectedEvent.amount_of_places}</p>)}
                        <p className="text-gray-700 mt-4">{selectedEvent.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LikedPage;

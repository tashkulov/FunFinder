import React, { useEffect, useState } from 'react';
import {fetchEvents} from "../../entities/event/model/api.ts";
import {EventCard} from "../../entities/event/ui/EventCard.tsx";
import {EventEntity} from "../../entities/event/model/types.ts";

const HomePage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<EventEntity | null>(null);

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
                            <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
                        ))}
                    </div>
                )}
            </section>

            {/* Модалка — опционально */}
            {selectedEvent && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
                    onClick={() => setSelectedEvent(null)}
                >
                    <div
                        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-semibold mb-4">{selectedEvent.title}</h2>
                        <p className="text-gray-500 mb-2">📅 {selectedEvent.date}</p>
                        <p className="text-gray-500 mb-4">📍 {selectedEvent.location}</p>
                        <p className="text-gray-700 mb-6">{selectedEvent.description}</p>
                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;

import React, { useEffect, useState } from 'react';
import {
    fetchEvents,
    fetchEvent
} from "../../entities/event/model/api.ts";
import { EventCard } from "../../entities/event/ui/EventCard.tsx";
import { EventEntity } from "../../entities/event/model/types.ts";
import { toast } from "react-toastify";
import { EventDetails } from "../../entities/event/ui/EventDetails";

const HomePage: React.FC = () => {
    const [events, setEvents] = useState<EventEntity[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [, setSelectedEventId] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<EventEntity | null>(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState<string | null>(null);

    useEffect(() => {
        fetchEvents()
            .then(setEvents)
            .catch(() => toast.error("Ошибка при загрузке событий"))
            .finally(() => setLoading(false));
    }, []);

    const handleOpenEvent = async (id: string) => {
        setDetailsModalOpen(true);
        setSelectedEventId(id);

        setDetailsLoading(true);
        setDetailsError(null);
        try {
            const res = await fetchEvent(id.toString());
            setSelectedEvent(res);
        } catch (e: unknown) {
            if (e instanceof Error) {
                setDetailsError(e.message);
            } else {
                setDetailsError("Не удалось загрузить детали события");
            }
        }
        finally {
            setDetailsLoading(false);
        }
    };

    const handleCloseEvent = () => {
        setDetailsModalOpen(false);
        setSelectedEvent(null);
        setSelectedEventId(null);
        setDetailsError(null);
    };

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
                            <EventCard
                                key={event.id}
                                event={event}
                                onClick={() => handleOpenEvent(event.id)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {detailsModalOpen && (
                <EventDetails
                    event={selectedEvent ?? undefined}
                    loading={detailsLoading}
                    error={detailsError ?? undefined}
                    onClose={handleCloseEvent}
                />
            )}
        </div>
    );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { fetchSoldTickets, SoldTicket } from "../../entities/ticket/model/api";
import { fetchEvents } from "../../entities/event/model/api";
import { EventEntity } from "../../entities/event/model/types";
import { EventCard } from "../../entities/event/ui/EventCard";
import { toast } from "react-toastify";

const SoldTicketsPage: React.FC = () => {
    const [events, setEvents] = useState<EventEntity[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [tickets, setTickets] = useState<SoldTicket[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [loadingTickets, setLoadingTickets] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchEvents()
            .then(setEvents)
            .catch(() => toast.error("Ошибка при загрузке событий"))
            .finally(() => setLoadingEvents(false));
    }, []);

    const handleSelectEvent = async (eventId: string) => {
        setSelectedEventId(eventId);
        setTickets([]);
        setLoadingTickets(true);
        setError(null);
        try {
            const res = await fetchSoldTickets(eventId);
            setTickets(res);
        } catch {
            setError("Не удалось загрузить проданные билеты");
        } finally {
            setLoadingTickets(false);
        }
    };

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Проданные билеты</h1>

            <input
                type="text"
                placeholder="Поиск событий..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-sm p-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            {loadingEvents ? (
                <p className="text-center text-gray-500">Загрузка событий...</p>
            ) : filteredEvents.length === 0 ? (
                <p className="text-center text-gray-500">
                    Ничего не найдено по запросу: "{searchTerm}"
                </p>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
                    {filteredEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onClick={() => handleSelectEvent(event.id)}
                        />
                    ))}
                </div>
            )}

            {selectedEventId && (
                <>
                    <h2 className="text-2xl font-semibold mb-4">
                        Билеты для события ID: {selectedEventId}
                    </h2>

                    {loadingTickets ? (
                        <p className="text-center text-gray-500">Загрузка билетов...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : tickets.length === 0 ? (
                        <p className="text-center text-gray-500">Нет проданных билетов</p>
                    ) : (
                        <table className="w-full border border-gray-300">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">#</th>
                                <th className="border p-2">ФИО</th>
                                <th className="border p-2">Номер билета</th>
                                <th className="border p-2">Использован</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tickets.map((ticket, index) => (
                                <tr key={ticket.id} className="text-center">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{ticket.userFullName}</td>
                                    <td className="border p-2">{ticket.number}</td>
                                    <td className="border p-2">{ticket.used ? "Да" : "Нет"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
};

export default SoldTicketsPage;

import React, { useEffect, useState } from 'react';

type Event = {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
    image: string;
};

const HomePage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('https://events-app-backend-937b6e6df475.herokuapp.com/api/events');
                const data = await res.json();
                setEvents(data);
            } catch (err) {
                console.error('Ошибка при загрузке событий', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleOpenModal = (event: Event) => setSelectedEvent(event);
    const handleCloseModal = () => setSelectedEvent(null);

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
                    <div className="">
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                                >
                                    <div className="h-48 w-full overflow-hidden">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{event.title}</h3>
                                        <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                                            📅 <span>{event.date}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                                            📍 <span className="line-clamp-1">{event.location}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                                        <div className="mt-auto">
                                            <button
                                                onClick={() => handleOpenModal(event)}
                                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-md transition-all"
                                            >
                                                Подробнее
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                )}
            </section>

            {selectedEvent && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
                    onClick={handleCloseModal}
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
                            onClick={handleCloseModal}
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

import React from 'react';

const CollectionsPage: React.FC = () => {
    const collections = [
        { title: 'Масленица', events: 17, poster: 'https://via.placeholder.com/300x200?text=Масленица' },
        { title: 'Выходные', events: 38, poster: 'https://via.placeholder.com/300x200?text=Выходные' },
        { title: 'Зимой', events: 24, poster: 'https://via.placeholder.com/300x200?text=Зимой' },
        { title: 'Искусство', events: 32, poster: 'https://via.placeholder.com/300x200?text=Искусство' },
        { title: 'Мастер-классы', events: 31, poster: 'https://via.placeholder.com/300x200?text=Мастер-классы' },
        { title: 'Экскурсии', events: 33, poster: 'https://via.placeholder.com/300x200?text=Экскурсии' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Подборки событий</h1>
            <p className="text-center text-gray-500 mb-10">Идеи для досуга в одном месте!</p>

            <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {collections.map((collection, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform hover:scale-105"
                    >
                        <img
                            src={collection.poster}
                            alt={collection.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{collection.title}</h2>
                            <p className="text-gray-500">{collection.events} событий</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionsPage;

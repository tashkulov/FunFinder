import React from 'react';

const CollectionsPage: React.FC = () => {
    const collections = [
        { title: 'Масленица', events: 17, poster: 'https://via.placeholder.com/300x200?text=Масленица' },
        { title: 'Куда сходить в выходные', events: 38, poster: 'https://via.placeholder.com/300x200?text=Куда+сходить+в+выходные' },
        { title: 'Куда сходить зимой', events: 24, poster: 'https://via.placeholder.com/300x200?text=Куда+сходить+зимой' },
        { title: 'Где смотреть искусство', events: 32, poster: 'https://via.placeholder.com/300x200?text=Где+смотреть+искусство' },
        { title: 'Мастер-классы', events: 31, poster: 'https://via.placeholder.com/300x200?text=Мастер-классы' },
        { title: 'Экскурсии Москвы', events: 33, poster: 'https://via.placeholder.com/300x200?text=Экскурсии+Москвы' },
        { title: 'Куда сходить с детьми', events: 31, poster: 'https://via.placeholder.com/300x200?text=Куда+сходить+с+детьми' },
        { title: 'Афиша концертов', events: 27, poster: 'https://via.placeholder.com/300x200?text=Афиша+концертов' },
        { title: 'Бизнес и развитие', events: 34, poster: 'https://via.placeholder.com/300x200?text=Бизнес+и+развитие' },
        { title: 'Хочу все знать', events: 25, poster: 'https://via.placeholder.com/300x200?text=Хочу+все+знать' },
        { title: 'STAND UP', events: 16, poster: 'https://via.placeholder.com/300x200?text=STAND+UP' },
        { title: 'Новые знания и навыки', events: 19, poster: 'https://via.placeholder.com/300x200?text=Новые+знания+и+навыки' },
        { title: 'Лекции о культуре и искусстве', events: 25, poster: 'https://via.placeholder.com/300x200?text=Лекции+о+культуре+и+искусстве' },
        { title: 'Естественная наука', events: 10, poster: 'https://via.placeholder.com/300x200?text=Естественная+наука' },
        { title: 'Книжный клуб', events: 8, poster: 'https://via.placeholder.com/300x200?text=Книжный+клуб' },
    ];

    return (
        <div className="bg-gray-900 text-white min-h-screen py-10">
            <h2 className="text-3xl font-bold text-center mb-6">Подборки событий в Москве</h2>
            <p className="text-center text-gray-400 mb-10">Здесь вы найдете различные подборки событий.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
                {collections.map((collection, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={collection.poster}
                            alt={collection.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{collection.title}</h3>
                            <p className="text-gray-400">{collection.events} событий</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionsPage;

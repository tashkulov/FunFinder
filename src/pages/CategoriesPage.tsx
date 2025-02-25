import React from 'react';

const CategoriesPage: React.FC = () => {
    const categories = [
        'Концерты',
        'Вечеринки',
        'Бизнес',
        'Искусство и культура',
        'Для детей',
        'Театры',
    ];

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Категории событий</h2>
                <p className="text-center text-gray-400 mb-6">Здесь будут различные категории событий.</p>
                <ul className="space-y-4">
                    {categories.map((category, index) => (
                        <li key={index} className="text-lg font-medium text-purple-400 hover:text-purple-500 cursor-pointer">
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoriesPage;

import React from 'react';
import { EventEntity } from "../model/types.ts";

interface Props {
    event: EventEntity;
    onClick: () => void;
    onSave?: (event: EventEntity) => void;
}

export const EventCard: React.FC<Props> = ({ event, onClick, onSave }) => {
    return (
        <div
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col"
            onClick={onClick}
        >
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-1">📅 {event.date}</p>
                <p className="text-sm text-gray-500 mb-2">📍 {event.location}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                <div className="mt-auto flex gap-2">
                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-md transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                    >
                        Подробнее
                    </button>

                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-3 text-gray-500 text-xl">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('like', event.id);
                                }}
                                title="Лайк"
                                className="hover:text-green-600 transition"
                            >
                                👍
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('dislike', event.id);
                                }}
                                title="Дизлайк"
                                className="hover:text-red-500 transition"
                            >
                                👎
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('comment', event.id);
                                }}
                                title="Комментировать"
                                className="hover:text-indigo-500 transition"
                            >
                                💬
                            </button>
                        </div>

                        {onSave && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSave(event);
                                }}
                                title="Сохранить"
                                className="text-yellow-500 hover:text-yellow-600 text-xl transition"
                            >
                                ⭐
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

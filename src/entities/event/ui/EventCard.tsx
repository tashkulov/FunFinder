import React from 'react';
import { EventEntity } from "../model/types.ts";

interface Props {
    event: EventEntity;
    onClick: () => void;
    liked: boolean;
    saved: boolean;
    onLike: (eventId: number) => void;
    onSave: (eventId: number) => void;
}

export const EventCard: React.FC<Props> = ({ event, onClick, liked, saved, onLike, onSave }) => {


    return (
        <div
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col relative"
            onClick={onClick}
        >
            <div className="h-48 w-full overflow-hidden relative group">
                <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />

                {/* Лайк */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onLike(event.id);
                    }}
                    className={`absolute top-3 right-3 text-4xl transition ${
                        liked ? 'text-red-500 scale-110' : 'text-white/90'
                    } hover:scale-125`}
                    title="Лайк"
                >
                    {liked ? '❤️' : '🤍'}
                </button>

                {/* Сохранённое */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSave(event.id);
                    }}
                    className={`absolute top-3 left-3 text-3xl transition ${
                        saved ? 'text-yellow-400 scale-110' : 'text-white/90'
                    } hover:scale-125`}
                    title="Сохранить"
                >
                    {saved ? '⭐' : '☆'}
                </button>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-1">📅 {event.date}</p>
                <p className="text-sm text-gray-500 mb-2">📍 {event.location}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                <button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-md transition-all mt-auto"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                >
                    Подробнее
                </button>
            </div>
        </div>
    );
};

import React from 'react';
import {EventEntity} from "../model/types.ts";

interface Props {
    event: EventEntity;
    onClick: () => void;
}

export const EventCard: React.FC<Props> = ({ event, onClick }) => {
    return (
        <div
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col"
            onClick={onClick}
        >
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
            </div>
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-1">📅 {event.date}</p>
                <p className="text-sm text-gray-500 mb-2">📍 {event.location}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                <div className="mt-auto">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-md transition-all">
                        Подробнее
                    </button>
                </div>
            </div>
        </div>
    );
};

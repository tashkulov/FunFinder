import React, { useEffect, useRef, useState } from "react";
import {
    fetchSalesStatsByEvents,
    fetchSalesStatsByParticipants,
} from "../../entities/statistics/api/stats";
import { toast } from "react-toastify";

export const StatsPage: React.FC = () => {
    const [eventStats, setEventStats] = useState([]);
    const [participantStats, setParticipantStats] = useState([]);
    const fetchedOnce = useRef(false);

    useEffect(() => {
        if (fetchedOnce.current) return;
        fetchedOnce.current = true;

        fetchSalesStatsByEvents()
            .then(setEventStats)
            .catch(() => toast.error("Ошибка при загрузке статистики по событиям"));

        fetchSalesStatsByParticipants()
            .then(setParticipantStats)
            .catch(() => toast.error("Ошибка при загрузке статистики по участникам"));
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                📊 Панель статистики
            </h1>

            {/* Статистика по событиям */}
            <section>
                <h2 className="text-2xl font-semibold text-indigo-700 mb-6">
                    🎟 Статистика по событиям
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventStats.map((stat: any) => (
                        <div
                            key={stat.event_id}
                            className="bg-white border border-indigo-100 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <h3 className="text-lg font-bold text-indigo-600 mb-3 truncate">
                                {stat.event_name}
                            </h3>
                            <div className="space-y-1 text-sm text-gray-700">
                                <p>
                                    🎫 <span className="font-medium">Продано билетов:</span>{" "}
                                    {stat.number_of_sailed_tickets}
                                </p>
                                <p>
                                    📈 <span className="font-medium">Процент продаж:</span>{" "}
                                    {stat.percent_of_sailed_tickets}%
                                </p>
                                <p>
                                    💰 <span className="font-medium">Выручка:</span>{" "}
                                    {stat.amount_of_money} сом
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Статистика по участникам */}
            <section className="mt-14">
                <h2 className="text-2xl font-semibold text-purple-700 mb-6">
                    🧑‍🤝‍🧑 Статистика по участникам
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {participantStats.map((stat: any, i: number) => (
                        <div
                            key={i}
                            className="bg-white border border-purple-100 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <h3 className="text-lg font-bold text-purple-600 mb-3 truncate">
                                {stat.participant_first_name} {stat.participant_last_name}
                            </h3>
                            <div className="space-y-1 text-sm text-gray-700">
                                <p>
                                    🎟 <span className="font-medium">Куплено билетов:</span>{" "}
                                    {stat.number_of_bought_tickets}
                                </p>
                                <p>
                                    💸 <span className="font-medium">Потрачено:</span>{" "}
                                    {stat.sum_of_wasted_money} сом
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default StatsPage;

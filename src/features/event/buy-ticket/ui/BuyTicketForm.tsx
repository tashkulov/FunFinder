import React, { useState } from 'react';
import { buyTicket } from "../model/api.ts";
import { toast } from "react-toastify";

interface Props {
    eventId: string | number;
    price: number;
    onClose: () => void;
}

export const BuyTicketForm: React.FC<Props> = ({ eventId, price, onClose }) => {
    const [card_number, setCardNumber] = useState('');
    const [card_holder, setCardHolder] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount_of_tickets, setAmountOfTickets] = useState(1);
    const [loading, setLoading] = useState(false);

    const amount_of_money = amount_of_tickets * price;

    const handleSubmit = async () => {
        if (!card_number || !card_holder || !expiry_date || !cvv || amount_of_tickets <= 0) {
            toast.warning("Пожалуйста, заполните все поля");
            return;
        }

        try {
            setLoading(true);
            await buyTicket(eventId, {
                card_number,
                card_holder,
                expiry_date,
                cvv,
                amount_of_money,
                amount_of_tickets
            });
            toast.success("Билет успешно куплен!");
            onClose();
        } catch (e: any) {
            toast.error(e.message || "Ошибка при покупке");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 text-gray-800">
            <h2 className="text-2xl font-semibold text-center mb-4">Оплата билетов</h2>

            <div className="space-y-3">
                <div className="flex gap-3">
                    <input
                        value={card_number}
                        onChange={e => setCardNumber(e.target.value)}
                        placeholder="Номер карты"
                        className="border w-2/3 p-3 rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
                    />
                    <input
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                        placeholder="CVV"
                        className="border w-1/3 p-3 rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
                    />
                </div>

                <input
                    value={card_holder}
                    onChange={e => setCardHolder(e.target.value)}
                    placeholder="Владелец карты"
                    className="border w-full p-3 rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
                />

                <input
                    value={expiry_date}
                    onChange={e => setExpiryDate(e.target.value)}
                    placeholder="Срок действия (MM/YY)"
                    className="border w-full p-3 rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
                />

                <div className="flex gap-3">
                    <input
                        type="number"
                        value={amount_of_tickets}
                        onChange={e => setAmountOfTickets(Number(e.target.value))}
                        placeholder="Количество билетов"
                        className="border w-1/2 p-3 rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
                    />
                    <div className="border w-1/2 p-3 rounded-lg bg-gray-100 text-center font-medium shadow-inner">
                        {amount_of_money} сом
                    </div>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg font-semibold transition"
            >
                {loading ? "Оплата..." : "Купить"}
            </button>
        </div>
    );
};

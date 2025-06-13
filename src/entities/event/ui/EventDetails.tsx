import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { toast } from "react-toastify";
import { EventEntity } from "../model/types.ts";
import {likeEvent, removeLike, commentEvent, saveEventAsBookmark} from "../model/api.ts";
import {BuyTicketForm} from "../../../features/event/buy-ticket/ui/BuyTicketForm.tsx";

interface Props {
    event?: EventEntity;
    loading: boolean;
    error?: string;
    onClose: () => void;
}

export const EventDetails: React.FC<Props> = ({ event, loading, error, onClose }) => {
    const [isLiked, setIsLiked] = useState(event?.isLiked ?? false);
    const [likesCount, setLikesCount] = useState(event?.amount_of_likes ?? 0);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showBuyModal, setShowBuyModal] = useState(false);

    const [comments, setComments] = useState(event?.comments ?? []);
    const [commentInput, setCommentInput] = useState("");
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        if (event) {
            setIsLiked(event.isLiked);
            setLikesCount(event.amount_of_likes);
            setComments(event.comments);
        }
    }, [event]);

    const handleLikeToggle = async () => {
        if (!event) return;

        try {
            setSaving(true);
            if (isLiked) {
                await removeLike(event.id);
                setIsLiked(false);
                setLikesCount(likesCount - 1);
            } else {
                await likeEvent(event.id);
                setIsLiked(true);
                setLikesCount(likesCount + 1);
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error('Ошибка при лайке');
            }
        }
        finally {
            setSaving(false);
        }
    };

    const handleSaveToggle = async () => {
        if (!event) return;

        try {
            setSaving(true);
            await saveEventAsBookmark(event.id);
            setSaved(true);
            toast.success('Сохранено');
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error('Ошибка при сохранении');
            }
        }
        finally {
            setSaving(false);
        }
    };

    const handleCommentSubmit = async () => {
        if (!event || !commentInput.trim()) {
            toast.warning("Введите комментарий");
            return;
        }

        try {
            await commentEvent(event.id, commentInput.trim());
            toast.success("Комментарий отправлен");

            // после успешной отправки — добавляем комментарий локально
            setComments(prev => [
                ...prev,
                {
                    authorId: "you",  // можно потом получить из auth
                    authorImage: "",
                    authorFirstName: "Вы",
                    authorLastName: "",
                    commentId: `${Date.now()}`, // временный id
                    comment: commentInput.trim(),
                    commentDate: new Date().toISOString()
                }
            ]);

            setCommentInput("");
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error('Ошибка отправке комментарии');
            }
        }

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center text-2xl">
                    ×
                </button>

                {loading && (
                    <div className="flex justify-center items-center h-80">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                    </div>
                )}

                {error && <p className="text-center text-red-500 font-medium">{error}</p>}

                {event && !loading && !error && (
                    <>
                        {event.image && (
                            <img src={event.image} alt={event.title} className="w-full h-72 object-cover" />
                        )}

                        <div className="p-6 space-y-4">
                            <h2 className="text-3xl font-bold text-gray-800">{event.title}</h2>

                            <div className="space-y-2 text-gray-700 text-[15px]">
                                <div><span
                                    className="font-semibold">📅 Дата:</span> {dayjs(event.start_time).locale('ru').format('DD.MM.YYYY HH:mm')}
                                </div>
                                <div><span className="font-semibold">📍 Локация:</span> {event.location}</div>
                                <div><span className="font-semibold">💸 Цена:</span> {event.price} {event.price_currency}
                                </div>
                                <div><span className="font-semibold">🔞 Возраст:</span> {event.minimum_age}+</div>
                                <div><span
                                    className="font-semibold">👥 Мест:</span> {event.amount_of_places} (Доступно: {event.amount_of_available_places})
                                </div>
                            </div>

                            {event.categories?.length > 0 && (
                                <div className="mt-2">
                                    <div className="font-semibold mb-1">Категории:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {event.categories.map((cat, idx) => (
                                            <span key={idx}
                                                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                                                {cat.name.trim() || 'Без категории'}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <p className="text-gray-600">{event.description}</p>
                            <button
                                onClick={() => setShowBuyModal(true)}
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg font-semibold transition"
                            >
                                Купить билет
                            </button>
                            <div className="flex justify-around items-center text-lg pt-4 border-t border-gray-200">
                                <button onClick={handleLikeToggle} disabled={saving}
                                        className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} transition`}>
                                    {isLiked ? '❤️' : '🤍'} <span className="text-base font-medium">{likesCount}</span>
                                </button>


                                <div
                                    onClick={() => setShowComments(prev => !prev)}
                                    className="flex items-center gap-1 text-blue-500 cursor-pointer transition hover:opacity-80"
                                >
                                    💬 <span className="text-base font-medium">{comments.length}</span>
                                </div>


                                <button
                                    onClick={handleSaveToggle}
                                    className={`flex items-center gap-1 ${saved ? 'text-yellow-400' : 'text-gray-500'} transition`}
                                >
                                    {saved ? '⭐' : '☆'}
                                </button>

                            </div>

                            {/* Комментарии */}
                            {showComments && (
                                <div className="mt-6 space-y-3">
                                    <div className="font-semibold mb-2">Комментарии:</div>

                                    {comments.length === 0 &&
                                        <p className="text-gray-500 text-sm">Пока нет комментариев</p>}

                                    {comments.map(c => (
                                        <div key={c.commentId} className="p-3 bg-gray-100 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-800">{c.authorFirstName} {c.authorLastName}</p>
                                            <p className="text-sm text-gray-700 mt-1">{c.comment}</p>
                                            <p className="text-xs text-gray-400 mt-1">{dayjs(c.commentDate).format('DD.MM.YYYY HH:mm')}</p>
                                        </div>
                                    ))}

                                    <div className="flex gap-2">
                                        <input
                                            value={commentInput}
                                            onChange={(e) => setCommentInput(e.target.value)}
                                            placeholder="Написать комментарий..."
                                            className="flex-1 border rounded-lg p-2 text-sm"
                                        />
                                        <button
                                            onClick={handleCommentSubmit}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
                                        >
                                            Отправить
                                        </button>
                                    </div>
                                </div>
                            )}
                            {showBuyModal && (
                                <div
                                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
                                        <button onClick={() => setShowBuyModal(false)}
                                                className="absolute top-2 right-3 text-xl">×
                                        </button>
                                        <h2 className="text-2xl font-bold mb-4">Покупка билета</h2>

                                        <BuyTicketForm eventId={event.id} price={event.price}
                                                       onClose={() => setShowBuyModal(false)}/>
                                    </div>
                                </div>
                            )}


                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

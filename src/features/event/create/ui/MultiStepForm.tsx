// src/features/event/ui/MultiStepForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createEvent } from '../model/useCreateEvent';
import {TextField} from "../../../../shared/ui/TextField.tsx";

export const MultiStepForm: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        minimumAge: 0,
        startTime: '',
        price: 0,
        priceCurrency: '$',
        amountOfPlaces: 1,
        categories: [] as string[],
        imageFile: null as File | null,
        imagePreview: null as string | null,
    });

    const categoryOptions = [
        'СПОРТ', 'МУЗЫКА', 'АНИМЕ', 'IT',
        'НАУКА И ОБРАЗОВАНИЕ', 'ИСКУССТВО И КУЛЬТУРА',
        'БИЗНЕС И СТАРТАПЫ', 'ГАСТРОНОМИЯ',
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryToggle = (cat: string) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat],
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                imageFile: file,
                imagePreview: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageFile) return toast.error('Пожалуйста, загрузите изображение.');

        try {
            await createEvent(
                {
                    title: formData.title,
                    description: formData.description,
                    location: formData.location,
                    minimum_age: formData.minimumAge,
                    start_time: formData.startTime,
                    price: formData.price,
                    price_currency: formData.priceCurrency,
                    amount_of_places: formData.amountOfPlaces,
                    categories: formData.categories,
                },
                formData.imageFile
            );
            toast.success('Событие успешно создано!');
            navigate('/');
        } catch (err: any) {
            toast.error(err.message || 'Произошла ошибка при создании события.');
        }
    };

    const next = () => setStep(s => Math.min(s + 1, 4));
    const back = () => setStep(s => Math.max(s - 1, 1));

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <div className="text-center space-y-1">
                <h1 className="text-3xl font-bold text-gray-900">Создание мероприятия</h1>
                <p className="text-sm text-gray-500">Шаг {step} из 4</p>
            </div>

            {step === 1 && (
                <section className="space-y-6">
                    <TextField label="Название мероприятия" name="title"
                               value={formData.title} onChange={handleChange} required placeholder="Введите название" />
                    <div className="space-y-1">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Описание <span className="text-red-500">*</span></label>
                        <textarea
                            id="description" name="description" value={formData.description}
                            onChange={handleChange} required placeholder="Опишите мероприятие"
                            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500
                             focus:ring-indigo-500 sm:text-sm px-3 py-2 resize-none min-h-[96px]" />
                    </div>
                    <TextField label="Локация" name="location" value={formData.location}
                               onChange={handleChange} required placeholder="Адрес проведения" />
                    <div className="grid grid-cols-2 gap-4">
                        <TextField label="Минимальный возраст" name="minimumAge"
                                   type="number" value={formData.minimumAge} onChange={handleChange} required />
                        <TextField label="Дата и время начала" name="startTime"
                                   type="datetime-local" value={formData.startTime} onChange={handleChange} required />
                    </div>
                </section>
            )}

            {step === 2 && (
                <section className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <TextField label="Цена" name="price" type="number" value={formData.price}
                                   onChange={handleChange} required placeholder="0.00" />
                        <TextField label="Валюта" name="priceCurrency" value={formData.priceCurrency}
                                   onChange={handleChange} required placeholder="$" />
                    </div>
                    <TextField label="Количество мест" name="amountOfPlaces" type="number"
                               value={formData.amountOfPlaces} onChange={handleChange}
                               required placeholder="Например: 50" />
                </section>
            )}

            {step === 3 && (
                <section className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Категории</label>
                        <div className="flex flex-wrap gap-2">
                            {categoryOptions.map(cat => (
                                <button key={cat} type="button" onClick={() => handleCategoryToggle(cat)} className={`inline-flex 
                                items-center px-4 py-1.5 border rounded-full text-sm font-medium transition-all duration-150 ${
                                    formData.categories.includes(cat)
                                        ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                                }`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">Обложка мероприятия</label>
                        <input type="file" id="imageFile" accept="image/*" onChange={handleImageChange} required className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2" />
                        {formData.imagePreview && (
                            <div className="mt-4">
                                <img src={formData.imagePreview} alt="Предпросмотр" className="rounded-md max-h-48 w-full object-cover border" />
                            </div>
                        )}
                    </div>
                </section>
            )}

            {step === 4 && (
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Проверьте данные:</h2>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-gray-800">
                        <p><strong>Название:</strong> {formData.title}</p>
                        <p><strong>Описание:</strong> {formData.description}</p>
                        <p><strong>Локация:</strong> {formData.location}</p>
                        <p><strong>Возраст:</strong> {formData.minimumAge}</p>
                        <p><strong>Дата начала:</strong> {formData.startTime}</p>
                        <p><strong>Цена:</strong> {formData.price} {formData.priceCurrency}</p>
                        <p><strong>Мест:</strong> {formData.amountOfPlaces}</p>
                        <p><strong>Категории:</strong> {formData.categories.join(', ')}</p>
                        {formData.imagePreview && (
                            <img src={formData.imagePreview} alt="preview" className="rounded-md max-h-32 object-cover" />
                        )}
                    </div>
                </section>
            )}

            <div className="flex justify-between pt-6">
                {step > 1 && (
                    <button type="button" onClick={back} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100">
                        Назад
                    </button>
                )}
                {step < 4 ? (
                    <button type="button" onClick={next} className="ml-auto inline-flex items-center px-6 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                        Далее
                    </button>
                ) : (
                    <button type="submit" className="ml-auto inline-flex items-center px-6 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-md shadow">
                        Создать мероприятие
                    </button>
                )}
            </div>
        </form>
    );
};

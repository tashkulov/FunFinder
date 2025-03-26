import React, { useState } from 'react';
import { createEvent } from '../model/useCreateEvent';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

    const categoryOptions = ['Music', 'Sport', 'Party', 'Education'];

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
        if (!formData.imageFile) return toast.error('Загрузите изображение');

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

            toast.success('Событие создано!');
            navigate('/');
        } catch (err: unknown) {
            const error = err as Error;
            toast.error(error.message || 'Ошибка');
        }

    };

    const next = () => setStep(s => Math.min(s + 1, 4));
    const back = () => setStep(s => Math.max(s - 1, 1));

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Создать мероприятие</h1>
            <p className="text-center text-gray-500">Шаг {step} из 4</p>

            {step === 1 && (
                <section className="space-y-4">
                    <input name="title" placeholder="Название" value={formData.title} onChange={handleChange} required className="input-field" />
                    <textarea name="description" placeholder="Описание" value={formData.description} onChange={handleChange} required className="input-field h-24 resize-none" />
                    <input name="location" placeholder="Локация" value={formData.location} onChange={handleChange} required className="input-field" />
                    <input name="minimumAge" type="number" placeholder="Минимальный возраст" value={formData.minimumAge} onChange={handleChange} required className="input-field" />
                    <input name="startTime" type="datetime-local" value={formData.startTime} onChange={handleChange} required className="input-field" />
                </section>
            )}

            {step === 2 && (
                <section className="space-y-4">
                    <div className="flex gap-4">
                        <input name="price" type="number" placeholder="Цена" value={formData.price} onChange={handleChange} required className="input-field w-1/2" />
                        <input name="priceCurrency" type="text" placeholder="Валюта" value={formData.priceCurrency} onChange={handleChange} required className="input-field w-1/2" />
                    </div>
                    <input name="amountOfPlaces" type="number" placeholder="Количество мест" value={formData.amountOfPlaces} onChange={handleChange} required className="input-field" />
                </section>
            )}

            {step === 3 && (
                <section className="space-y-4">
                    <div className="space-y-2">
                        <h2 className="font-medium text-gray-700">Категории</h2>
                        <div className="flex flex-wrap gap-2">
                            {categoryOptions.map(cat => (
                                <button
                                    type="button"
                                    key={cat}
                                    onClick={() => handleCategoryToggle(cat)}
                                    className={`px-4 py-1.5 text-sm rounded-full border transition ${
                                        formData.categories.includes(cat)
                                            ? 'bg-purple-600 text-white border-purple-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Обложка</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} required className="text-sm" />
                        {formData.imagePreview && (
                            <img src={formData.imagePreview} alt="preview" className="mt-3 rounded-lg max-h-40 object-cover w-full" />
                        )}
                    </div>
                </section>
            )}

            {step === 4 && (
                <section className="space-y-3 text-sm text-gray-700">
                    <h2 className="font-medium text-lg text-gray-800 mb-2">Проверьте данные:</h2>
                    <ul className="space-y-1">
                        <li><b>Название:</b> {formData.title}</li>
                        <li><b>Описание:</b> {formData.description}</li>
                        <li><b>Локация:</b> {formData.location}</li>
                        <li><b>Возраст:</b> {formData.minimumAge}</li>
                        <li><b>Дата и время:</b> {formData.startTime}</li>
                        <li><b>Цена:</b> {formData.price} {formData.priceCurrency}</li>
                        <li><b>Места:</b> {formData.amountOfPlaces}</li>
                        <li><b>Категории:</b> {formData.categories.join(', ')}</li>
                    </ul>
                </section>
            )}

            <div className="flex justify-between">
                {step > 1 && <button type="button" onClick={back} className="bg-gray-200 px-4 py-2 rounded-md">Назад</button>}
                {step < 4
                    ? <button type="button" onClick={next} className="bg-purple-600 text-white px-6 py-2 rounded-md">Далее</button>
                    : <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-md">Создать</button>
                }
            </div>
        </form>
    );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const CreateEventPage: React.FC = () => {
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

    const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

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
        if (!formData.imageFile) return toast.error("Загрузите изображение");

        const payload = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            minimum_age: formData.minimumAge,
            start_time: formData.startTime,
            price: formData.price,
            price_currency: formData.priceCurrency,
            amount_of_places: formData.amountOfPlaces,
            categories: formData.categories,
        };

        const fd = new FormData();
        fd.append("event", JSON.stringify(payload));
        fd.append("image", formData.imageFile);

        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("https://events-app-backend-937b6e6df475.herokuapp.com/api/events", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: fd,
            });

            if (!response.ok) throw new Error("Ошибка при создании события");

            toast.success("Событие создано!");
            navigate('/');
        } catch (err) {
            toast.error("Ошибка при создании события");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex justify-center items-start py-10 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Создать мероприятие</h1>
                <p className="text-center text-gray-500">Шаг {step} из 4</p>

                {step === 1 && (
                    <section className="space-y-4">
                        <input name="title" placeholder="Название" value={formData.title} onChange={handleChange} required className="input-field" />
                        <textarea name="description" placeholder="Описание" value={formData.description} onChange={handleChange} required className="input-field resize-none h-24" />
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
                        <div className="space-y-3">
                            <h2 className="text-xl font-semibold text-gray-700">Категории</h2>
                            <div className="flex flex-wrap gap-3">
                                {categoryOptions.map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => handleCategoryToggle(cat)}
                                        className={`px-4 py-2 rounded-full border transition-all text-sm font-medium ${
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
                            <h2 className="text-xl font-semibold text-gray-700">Обложка мероприятия</h2>
                            <input type="file" accept="image/*" onChange={handleImageChange} required className="text-sm" />
                            {formData.imagePreview && (
                                <div className="mt-2 overflow-hidden rounded-lg border border-gray-200">
                                    <img src={formData.imagePreview} alt="preview" className="w-full max-h-64 object-cover" />
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {step === 4 && (
                    <section>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Подтвердите информацию</h2>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li><strong>Название:</strong> {formData.title}</li>
                            <li><strong>Описание:</strong> {formData.description}</li>
                            <li><strong>Локация:</strong> {formData.location}</li>
                            <li><strong>Возраст:</strong> {formData.minimumAge}</li>
                            <li><strong>Дата и время:</strong> {formData.startTime}</li>
                            <li><strong>Цена:</strong> {formData.price} {formData.priceCurrency}</li>
                            <li><strong>Мест:</strong> {formData.amountOfPlaces}</li>
                            <li><strong>Категории:</strong> {formData.categories.join(', ')}</li>
                        </ul>
                        {formData.imagePreview && (
                            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
                                <img src={formData.imagePreview} alt="preview" className="w-full max-h-64 object-cover" />
                            </div>
                        )}
                    </section>
                )}

                <div className="flex justify-between">
                    {step > 1 && <button type="button" onClick={handleBack} className="bg-gray-200 px-4 py-2 rounded-md">Назад</button>}
                    {step < 4
                        ? <button type="button" onClick={handleNext} className="bg-purple-600 text-white px-6 py-2 rounded-md">Далее</button>
                        : <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-md">Создать мероприятие</button>
                    }
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default CreateEventPage;

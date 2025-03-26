import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');

    const API_URL = 'https://events-app-backend-937b6e6df475.herokuapp.com/api/users';

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roleFromURL = params.get('role');
        if (roleFromURL) setRole(roleFromURL);
    }, [location.search]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const endpoint = isRegister ? `${API_URL}/sign-up` : `${API_URL}/login`;
        const payload = isRegister
            ? {
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                email,
                password,
                role,
            }
            : { email, password };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Ошибка');

            if (!isRegister) {
                localStorage.setItem('accessToken', data.accessToken);
                toast.success('Успешный вход!');
                navigate('/');
            } else {
                toast.success('Регистрация успешна! Теперь войдите');
                setIsRegister(false);
            }
        } catch (err) {
            const msg = (err as Error).message;
            setError(msg);
            toast.error(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-500 to-indigo-600 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    {isRegister ? 'Регистрация' : 'Вход'}
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegister && (
                        <>
                            <div>
                                <label className="text-gray-700 text-sm mb-1 block">Имя</label>
                                <input
                                    type="text"
                                    placeholder="Имя"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm mb-1 block">Фамилия</label>
                                <input
                                    type="text"
                                    placeholder="Фамилия"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm mb-1 block">Телефон</label>
                                <input
                                    type="tel"
                                    placeholder="Телефон"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm mb-1 block">Роль</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                    className="input"
                                >
                                    <option value="" disabled>Выберите роль</option>
                                    <option value="USER">Гость</option>
                                    <option value="ORGANIZER">Организатор</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div>
                        <label className="text-gray-700 text-sm mb-1 block">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 text-sm mb-1 block">Пароль</label>
                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-all"
                    >
                        {isRegister ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                </form>

                <p className="text-center text-sm mt-6 text-gray-600">
                    {isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-indigo-600 hover:underline font-medium transition"
                    >
                        {isRegister ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </p>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AuthPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');

    const API_URL = 'http://157.230.252.74:8081/api/users';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const endpoint = isRegister ? `${API_URL}/sign-up` : `${API_URL}/sign-in`;
        const payload = isRegister
            ? { first_name: firstName, last_name: lastName, phone_number: phoneNumber, email, password, role }
            : { email, password };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Ошибка');

            if (!isRegister) navigate('/');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center">{isRegister ? 'Регистрация' : 'Вход'}</h2>
                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                <form onSubmit={handleSubmit} className="mt-4">
                    {isRegister && (
                        <>
                            <input
                                type="text"
                                placeholder="Имя"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="Фамилия"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 mt-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="tel"
                                placeholder="Номер телефона"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 mt-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="Роль"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 mt-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 mt-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 mt-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md mt-4">
                        {isRegister ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                </form>
                <p
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-sm text-purple-400 text-center mt-4 cursor-pointer hover:underline"
                >
                    {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                </p>
            </div>
        </div>
    );
};

export default AuthPage;

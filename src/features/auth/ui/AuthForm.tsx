import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, register } from '../model/useAuth';
import { toast } from 'react-toastify';
import {Input} from "../../../shared/ui/Input.tsx";
import {Button} from "../../../shared/ui/Button.tsx";

export const AuthForm: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isRegister, setIsRegister] = useState(false);
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roleFromURL = params.get('role');
        if (roleFromURL) setRole(roleFromURL);
    }, [location.search]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isRegister) {
                await register({
                    email, password, first_name: firstName, last_name: lastName, phone_number: phoneNumber, role
                });
                toast.success('Регистрация успешна!');
                setIsRegister(false);
            } else {
                await login({ email, password });
                toast.success('Успешный вход!');
                navigate('/');
            }
        } catch (err: any) {
            toast.error(err.message || 'Ошибка');
        }
    };

    return (
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                {isRegister ? 'Регистрация' : 'Вход'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && (
                    <>
                        <Input placeholder="Имя" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                        <Input placeholder="Фамилия" value={lastName} onChange={e => setLastName(e.target.value)} required />
                        <Input placeholder="Телефон" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
                        <select
                            className="input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="" disabled>Выберите роль</option>
                            <option value="USER">Гость</option>
                            <option value="ORGANIZER">Организатор</option>
                        </select>
                    </>
                )}

                <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
                <Input placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} type="password" required />

                <Button type="submit">{isRegister ? 'Зарегистрироваться' : 'Войти'}</Button>
            </form>

            <p className="text-center text-sm mt-6 text-gray-600">
                {isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
                <button onClick={() => setIsRegister(!isRegister)} className="text-indigo-600 hover:underline">
                    {isRegister ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </p>
        </div>
    );
};

import React, { useEffect, useState } from 'react';
import {userStorage} from "../../entities/user/model/storage.ts";
import {getUserProfile} from "../../entities/user/model/api.ts";

const ProfilePage: React.FC = () => {
    const userId = userStorage.getUserId();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;
            try {
                const data = await getUserProfile(userId);
                setProfile(data);
            } catch (e) {
                console.error('Ошибка получения профиля:', e);
            }
        };
        fetchData();
    }, [userId]);

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
                Загрузка...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                {profile.image && (
                    <div className="mb-4 flex justify-center">
                        <img
                            src={profile.image}
                            alt="Аватар"
                            className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500 shadow-md"
                        />
                    </div>
                )}
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Мой аккаунт</h1>
                <div className="text-left space-y-2 text-gray-700 text-sm">
                    <p><span className="font-semibold">Имя:</span> {profile.first_name}</p>
                    <p><span className="font-semibold">Фамилия:</span> {profile.last_name}</p>
                    <p><span className="font-semibold">Email:</span> {profile.email}</p>
                    <p><span className="font-semibold">Телефон:</span> {profile.phone_number}</p>
                    <p><span className="font-semibold">Дата рождения:</span> {profile.date_of_birth}</p>
                </div>
                <button
                    className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition"
                    onClick={() => {
                        userStorage.clearAll();
                        window.location.href = "/auth";
                    }}
                >
                    Выйти
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;

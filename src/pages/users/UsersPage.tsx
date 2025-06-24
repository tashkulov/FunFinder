import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchAllUsers } from "../../entities/user/model/api.ts";

interface User {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    date_of_birth: string;
    email: string;
    image: string;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchAllUsers()
            .then((data) => {
                setUsers(data);
                setFilteredUsers(data);
            })
            .catch(() => toast.error("Не удалось загрузить пользователей"))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const term = search.toLowerCase();
        const filtered = users.filter((user) =>
            `${user.first_name} ${user.last_name} ${user.email}`
                .toLowerCase()
                .includes(term)
        );
        setFilteredUsers(filtered);
    }, [search, users]);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                👥 Пользователи
            </h1>

            <input
                type="text"
                placeholder="🔍 Поиск по имени или email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md mx-auto block p-3 mb-8 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {loading ? (
                <p className="text-center text-gray-500">Загрузка пользователей...</p>
            ) : filteredUsers.length === 0 ? (
                <p className="text-center text-gray-500">
                    Не найдено пользователей по запросу: <strong>{search}</strong>
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition"
                        >
                            <img
                                src={user.image || "https://via.placeholder.com/96"}
                                alt={`${user.first_name} ${user.last_name}`}
                                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border"
                            />
                            <h3 className="text-lg font-semibold text-gray-800">
                                {user.first_name} {user.last_name}
                            </h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-sm text-gray-500">
                                {user.phone_number || "Телефон не указан"}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                🎂 {user.date_of_birth}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UsersPage;

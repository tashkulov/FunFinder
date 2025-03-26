import React from 'react';

const ProfilePage: React.FC = () => {
    const userEmail = localStorage.getItem("userEmail");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Мой аккаунт</h1>
                <div className="text-gray-700 space-y-2">
                    <p><strong>Email:</strong> {userEmail || 'example@mail.com'}</p>
                    <p><strong>Роль:</strong> organizer / guest</p>
                </div>
                <button
                    className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                    onClick={() => {
                        localStorage.clear();
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

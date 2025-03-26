import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        setIsAuthorized(Boolean(localStorage.getItem("accessToken")));
    }, []);

    return (
        <header className="bg-gray-900 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                <Link to="/" className="text-2xl font-bold">
                    FunFinder
                </Link>
                <nav className="flex gap-6 items-center">
                    <Link to="/collections" className="hover:text-purple-400">
                        Подборки
                    </Link>
                    <Link to="/categories" className="hover:text-purple-400">
                        Категории
                    </Link>
                </nav>
                <div className="flex gap-4 items-center">
                    <button
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
                        onClick={() => {
                            if (!isAuthorized) {
                                navigate("/auth");
                            } else {
                                navigate("/create-event");
                            }
                        }}
                    >
                        Создать событие
                    </button>

                    {isAuthorized && (
                        <button
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition"
                            onClick={() => navigate("/profile")}
                        >
                            Мой аккаунт
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

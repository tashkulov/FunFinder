import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../model/useAuthStatus.ts";
import { Button } from "../../../shared/ui/Button.tsx";
import profile from "../../../../public/user.png";
const Header = () => {
    const { isAuthorized } = useAuthStatus();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const role = localStorage.getItem("userRole");
    const isOrganizer = role === "ROLE_ORGANIZER";
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-gray-900 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                <Link to="/" className="text-2xl font-bold">FunFinder</Link>

                <nav className="flex gap-6 items-center">
                    <Link to="/categories" className="hover:text-purple-400">Категории</Link>
                    {isOrganizer && (
                        <>
                    <Link to="/stats" className="hover:text-purple-400">Статистика</Link>
                    <Link to="/users" className="hover:text-purple-400">Пользователи</Link>
                        </>
                    )}
                </nav>


                <div className="flex items-center gap-4 relative" ref={menuRef}>
                    {isOrganizer && (
                        <Button
                            variant="primary"
                            onClick={() => navigate('/create-event')}
                        >
                            Создать событие
                        </Button>
                    )}

                    {isAuthorized && (
                        <>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <img src={profile} alt={'profile'} width={40} height={40}/>
                            </button>

                            {isMenuOpen && (
                                <div
                                    className="absolute right-0 top-12 bg-white text-gray-900 shadow-xl rounded-md w-48 py-2 z-50">
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">👤 Профиль</Link>
                                    <Link to="/tickets" className="block px-4 py-2 hover:bg-gray-100">🎟 Мои
                                        билеты</Link>
                                    <Link to="/saved" className="block px-4 py-2 hover:bg-gray-100">❤️
                                        Понравившиеся</Link>
                                    <Link to="/liked" className="block px-4 py-2 hover:bg-gray-100">⭐ Сохраненные</Link>
                                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">⚙️
                                        Настройки</Link>

                                    {isOrganizer && (
                                        <>
                                            <Link to="/sold-tickets" className="block px-4 py-2 hover:bg-gray-100">💳
                                                Проданные билеты</Link>
                                            <Link to="/my-events" className="block px-4 py-2 hover:bg-gray-100">📋 Мои
                                                мероприятия</Link>
                                        </>
                                    )}

                                    <button
                                        onClick={() => {
                                            localStorage.clear(); // удалить и role тоже
                                            navigate("/login");
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        🚪 Выход
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

            </div>
        </header>
    );
};

export default Header;

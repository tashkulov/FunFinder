import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="bg-gray-900  text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                <Link to="/" className="text-2xl font-bold">FunFinder</Link>
                <nav className="flex gap-6">
                    <Link to="/collections" className="hover:text-gray-400">Подборки</Link>
                    <Link to="/categories" className="hover:text-gray-400">Категории</Link>
                    <input
                        type="text"
                        placeholder="Поиск событий"
                        className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </nav>
                <div className="flex gap-4">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                        Создать событие
                    </button>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        onClick={() => navigate('/auth')}
                    >
                        Войти
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

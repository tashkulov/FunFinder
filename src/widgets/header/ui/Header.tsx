import { Link, useNavigate } from 'react-router-dom';
import {Button} from "../../../shared/ui/Button.tsx";
import {useAuthStatus} from "../model/useAuthStatus.ts";

 const Header = () => {
    const navigate = useNavigate();
    const { isAuthorized } = useAuthStatus();

    return (
        <header className="bg-gray-900 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                <Link to="/" className="text-2xl font-bold">FunFinder</Link>

                <nav className="flex gap-6 items-center">
                    <Link to="/collections" className="hover:text-purple-400">Подборки</Link>
                    <Link to="/categories" className="hover:text-purple-400">Категории</Link>
                </nav>

                <div className="flex gap-4 items-center">
                    <Button
                        variant="primary"
                        onClick={() => navigate(isAuthorized ? '/create-event' : '/auth')}
                    >
                        Создать событие
                    </Button>

                    {isAuthorized && (
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/profile')}
                        >
                            Мой аккаунт
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};
export default Header;

import { useEffect, useState } from 'react';
import { userStorage } from '../../../entities/user/model/storage';

export const useAuthStatus = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    const updateStatus = () => {
        setIsAuthorized(!!userStorage.getToken());
    };

    useEffect(() => {
        updateStatus();
        window.addEventListener('authChanged', updateStatus);
        return () => window.removeEventListener('authChanged', updateStatus);
    }, []);

    return { isAuthorized };
};

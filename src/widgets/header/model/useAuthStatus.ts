import { useEffect, useState } from 'react';
import {userStorage} from "../../../entities/user/model/storage.ts";

export const useAuthStatus = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        setIsAuthorized(!!userStorage.getToken());
    }, []);

    return { isAuthorized };
};

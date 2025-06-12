import {removeUserRole, userStorage} from "../../../../entities/user/model/storage.ts";

export const logout = () => {
    userStorage.clearAll();
    removeUserRole();
};

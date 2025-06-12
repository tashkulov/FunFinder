import React, {JSX} from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthorized = Boolean(localStorage.getItem("accessToken"));

    return isAuthorized ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;

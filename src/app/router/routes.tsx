import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from "../../shared/lib/ProtectedRoute.tsx";
import AuthPage from "../../pages/auth";
import HomePage from "../../pages/home";
import CategoriesPage from "../../pages/categories";
import CreateEventPage from "../../pages/create-event";
import CollectionsPage from "../../pages/collections";
import ProfilePage from "../../pages/profile";
import Header from "../../widgets/header/ui/Header.tsx";

export const AppRouter = () => (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
            <Route path="/create-event" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} />
            <Route path="/collections" element={<ProtectedRoute><CollectionsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
    </BrowserRouter>
);

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./widgets/Header.tsx";
import HomePage from "./pages/Homepage.tsx";
import CollectionsPage from "./pages/CollectionsPage.tsx";
import CategoriesPage from "./pages/CategoriesPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import CreateEventPage from "./pages/CreateEventPage.tsx";

function App() {
    return (
        <Router>
            <Header />

            <Routes>
                <Route path="/auth" element={<AuthPage />} />

                <Route path="/" element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } />
                <Route path="/collections" element={
                    <ProtectedRoute>
                        <CollectionsPage />
                    </ProtectedRoute>
                } />
                <Route path="/categories" element={
                    <ProtectedRoute>
                        <CategoriesPage />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                } />
                <Route path="/create-event" element={
                    <ProtectedRoute>
                        <CreateEventPage />
                    </ProtectedRoute>
                } />

            </Routes>
        </Router>
    );
}

export default App;

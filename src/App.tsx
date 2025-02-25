import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./widgets/Header.tsx";
import HomePage from "./pages/Homepage.tsx";
import CollectionsPage from "./pages/CollectionsPage.tsx";
import CategoriesPage from "./pages/CategoriesPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />

                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
            </Routes>
        </Router>
    );
}

export default App;
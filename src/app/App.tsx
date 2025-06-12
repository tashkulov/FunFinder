import { ToastContainer } from 'react-toastify';
import {AppRouter} from "./router/routes.tsx";

const App = () => {
    return (
        <>
            <AppRouter />
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default App;

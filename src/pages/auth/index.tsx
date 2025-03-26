import {AuthForm} from "../../features/auth/ui/AuthForm.tsx";

const AuthPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-500 to-indigo-600 px-4">
            <AuthForm />
        </div>
    );
};

export default AuthPage;

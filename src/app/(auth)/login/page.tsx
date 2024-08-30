import { SigninForm } from "@/components/Forms/LoginForm";
import NavBar from "@/components/NavBar";

export default function Login() {
    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <SigninForm />
            </div>
        </>);
}
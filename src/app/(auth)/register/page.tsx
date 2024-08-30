
import { SignupForm } from "@/components/Forms/RegisterForm";
import NavBar from "@/components/NavBar";

export default function Register() {
    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <SignupForm/>
            </div>
        </>);
}
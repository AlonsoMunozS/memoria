import { Card } from "primereact/card";
import LoginForm from "./components/LoginForm";
import { useEffect } from "react";
import { useRouter } from "next/router";


export const Login = () => {
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem('authToken') !== null) {
            router.push('/');
        }
    }, []);

    return (
        <div className="background">
            <div>
                <Card className="card-body" >
                    <LoginForm />
                </Card>
            </div>
        </div>
    );
}

export default Login;
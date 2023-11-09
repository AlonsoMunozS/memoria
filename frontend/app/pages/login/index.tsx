import { Card } from "primereact/card";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


export const Login = () => {
    const router = useRouter();
    const [noLoggedUser, setNoLoggedUser] = useState<boolean>(false);
    useEffect(() => {
        if (localStorage.getItem('authToken') !== null) {
            router.push('/');
        }
        else {
            setNoLoggedUser(true);
        }
    }, []);

    return (
        <div>
            {noLoggedUser && (
                <div className="background">
                    <div>
                        <Card className="card-body" >
                            <LoginForm />
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
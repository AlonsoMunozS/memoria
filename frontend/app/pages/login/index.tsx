import { Card } from "primereact/card";
import LoginForm from "./components/LoginForm";


export const Login = () => {

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
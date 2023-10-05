import { Card } from "primereact/card";
import LoginForm from "./components/LoginForm";


export const Login = () => {

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        }}>
            <div>
                <Card title="Inicio de sesión" style={{ width: '25rem', textAlign: 'center' }}>
                    <LoginForm />
                </Card>
            </div>
        </div>
    );
}

export default Login;
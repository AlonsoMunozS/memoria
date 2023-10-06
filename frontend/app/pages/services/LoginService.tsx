interface User {
    email: string,
    password: string
}
const login = async (body: User, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        setLoading(false);
        return response.status
    }
    catch (error) {
        setLoading(false);
    }
}
export default login;
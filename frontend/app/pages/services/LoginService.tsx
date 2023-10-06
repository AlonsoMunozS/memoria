interface User {
    email: string,
    password: string
}
const login = async (body: User, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const response = await fetch('http://192.168.1.82:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        const infoBody = await response.json()
        localStorage['authToken'] = infoBody.accessToken;
        return response.status
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
export default login;
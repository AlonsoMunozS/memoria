interface User {
    email: string,
    password: string
}
const login = async (body: User) => {
    try {
        const response = await fetch('http://localhost:3000/users/login', {
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
    }
}
export default login;
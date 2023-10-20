interface User {
    email: string,
    password: string
}
const login = async (body: User) => {
    let status = null;
    await fetch('http://52.255.142.208:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            status = response.status;
            if (!response.ok) {
                throw new Error(`La solicitud falló con código de estado ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            localStorage['authToken'] = data.accessToken;
        })
        .catch(error => {
            //console.error('Error de solicitud:', error.message);
        });

    /*try {
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
        return 401;
    }*/
    return status;
}
export default login;
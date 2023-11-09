interface User {
    email: string,
    password: string
}
const login = async (body: User) => {
    let status = null;
    await fetch('http://localhost:3000/users/login', {
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
            getUser(data.accessToken);
        })
        .catch(error => {
            //console.error('Error de solicitud:', error.message);
        });

    return status;
}

const getUser = async (authtoken: String) => {
    const tokenSections = (authtoken || '').split('.')
    const payloadJSON = Buffer.from(tokenSections[1], 'base64').toString('utf8')
    const payload = JSON.parse(payloadJSON)
    console.log("payload:", payload)

    const userId = payload['sub']
    try {
        const response = await fetch(`http://localhost:3000/users/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${authtoken}`
            }
        });
        const jsonData = await response.json();
        localStorage['dataUser'] = JSON.stringify(jsonData);;
        console.log("jsonData:", jsonData.email)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
export default login;
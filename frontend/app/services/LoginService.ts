interface User {
    email: string,
    password: string
}
const login = async (body: User) => {
    const response = await fetch('http://191.233.245.250:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        return response.status;
    }
    const data = await response.json();
    localStorage['authToken'] = data.accessToken;
    localStorage['expirationTime'] = data.expirationTime;
    await getUser(data.accessToken);
    return response.status;

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
        localStorage['dataUser'] = JSON.stringify(await jsonData);;
        console.log("jsonData:", jsonData.email)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
export default login;
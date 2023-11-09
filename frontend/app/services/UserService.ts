type newUser = {
    userAttributes: {
        rut: string,
        email: string,
        userPermits?: {
            tenders?: {
                create: boolean,
                remove: boolean,
                update: boolean,
                read: boolean
            },
            contracts?: {
                create: boolean,
                remove: boolean,
                update: boolean,
                read: boolean
            }
        },
        role?: string
    },
    password: string

}

const getUserNotifications = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await fetch('http://localhost:3000/notifications/findByUser/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const jsonData = await response.json();

        return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const createUser = async (body: newUser) => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await fetch('http://localhost:3000/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(body)
        });

        return response.status
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const getUser = async (userId: number) => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await fetch(`http://localhost:3000/users/user/:${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const jsonData = await response.json();

        return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const getUsers = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await fetch('http://localhost:3000/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const jsonData = await response.json();

        return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export {
    getUserNotifications,
    createUser,
    getUser,
    getUsers
};
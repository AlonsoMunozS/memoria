import { Tender } from '../pages/tenders/tender/models/Tender';

const createTender = async (body: Tender) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3000/tenders/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(body)
        });

        return response.status
    } catch (error) {
    }
}

const getTenders = async () => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3000/tenders/', {
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

const getTender = async (id: number) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:3000/tenders/tender/${id}`, {
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
    createTender,
    getTenders,
    getTender
};

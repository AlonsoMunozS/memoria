import { Tender } from '../tenders/tender/models/Tender';
import { refreshLogin } from './LoginService';
const createTender = async (body: Tender) => {
    refreshLogin();
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
    refreshLogin();
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
export {
    createTender,
    getTenders
};

import { Tender } from '../tenders/tender/models/Tender';

const createTender = async (body: Tender, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
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
        setLoading(false);
        return response.status
    } catch (error) {
        setLoading(false);
    }
}

const getTenders = async (setTenders: React.Dispatch<React.SetStateAction<Array<Tender>>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3000/tenders/', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        const jsonData = await response.json();
        setTenders(jsonData);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
export {
    createTender,
    getTenders
};

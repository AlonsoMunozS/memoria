import { Tender } from '../tenders/tender/models/Tender';

const createTender = async (body: Tender, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    // Cambiar setIsLoading a true antes de la solicitud
    setLoading(true);
    try {
<<<<<<< Updated upstream
        const response = await fetch('http://localhost:3000/tenders/create', {
=======
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('http://192.168.1.82:3000/tenders/create', {
>>>>>>> Stashed changes
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        setLoading(false);
        return response.status
    } catch (error) {
        setLoading(false);
    }
}
<<<<<<< Updated upstream
export default createTender;
=======

const getTenders = async (setTenders: React.Dispatch<React.SetStateAction<Array<Tender>>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('http://192.168.1.82:3000/tenders/', {
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
>>>>>>> Stashed changes

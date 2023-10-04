import { Tender } from '../tenders/tender/models/Tender';

const createTender = async (body: Tender, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    // Cambiar setIsLoading a true antes de la solicitud
    setLoading(true);
    try {
        const response = await fetch('http://localhost:3000/tenders/create', {
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
export default createTender;

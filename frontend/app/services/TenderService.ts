import { Tender } from '../pages/tenders/tender/models/Tender';
export type UpdateTenderValue = {
    name?: string,
    safi?: string,
    region?: string,
    province?: string,
    commune?: string,
    address?: string,
    currentStage?: number,
    mercadoPublicoId?: string,
    category?: string,
}

const createTender = async (body: Tender) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('http://191.233.245.250:3000/tenders/create', {
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
        const response = await fetch('http://191.233.245.250:3000/tenders/', {
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
        const response = await fetch(`http://191.233.245.250:3000/tenders/tender/${id}`, {
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

const updateTender = async (id: number, body: UpdateTenderValue) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`http://191.233.245.250:3000/tenders/tender/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(body)
        });
        return response.status
    }
    catch (error) {
    }
}

const requestRemoveTender = async (id: string) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:3000/tenders/tender/requestRemove/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.status
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
export {
    createTender,
    getTenders,
    getTender,
    updateTender,
    requestRemoveTender
};

import { Tender } from '../tenders/tender/models/Tender';

const createTender = async (body: Tender) => {
    const response = await fetch('http://localhost:3000/tenders/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Especifica el tipo de contenido del cuerpo
        },
        body: JSON.stringify(body)
    })
}
export default createTender;
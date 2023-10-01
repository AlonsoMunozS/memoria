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

        // Verificar si la solicitud fue exitosa (código de estado HTTP 2xx)
        if (response.ok) {
            // Puedes hacer algo con la respuesta aquí si es necesario
            // ...
        } else {
            // Manejar errores si la solicitud no fue exitosa
            // ...
        }
    } catch (error) {
        // Manejar errores de red u otros errores inesperados
        // ...
    } finally {
        // Cambiar setIsLoading a false después de recibir la respuesta o manejar errores
        setLoading(false);
    }
}

export default createTender;

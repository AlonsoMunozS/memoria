
const getUserNotifications = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await fetch('http://52.255.142.208:3000/notifications/findByUser/', {
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
export default getUserNotifications;
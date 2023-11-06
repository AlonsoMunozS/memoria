
const getUserNotifications = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await fetch('http://191.233.245.250:3000/notifications/findByUser/', {
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
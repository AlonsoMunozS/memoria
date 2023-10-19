type CommentBody = {
    stageId: number
    post: string
}

const getTenderStages = async (tenderId: number) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:3000/tenders/tender/stage/${tenderId}`, {
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
    getTenderStages
};


type StageComment = {
    stageId: number
    createdBy: string
    createdAt: number
    post: string
}

type newStage = {
    tenderId: number,
    name: number,
    toDate: number
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
const uploadFile = async (tenderId: number, stageId: number, file: File) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:3000/tenders/tender/stage/file/upload/${tenderId}/${stageId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            body: formData,
        });
        return response.status
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
const getStageComments = async (stageId: number) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:3000/tenders/tender/stage/comment/${stageId}`, {
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

const createNewStage = async (body: newStage) => {
    try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3000/tenders/tender/stage/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(body)
        });
        return response.status
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

export {
    getTenderStages,
    uploadFile,
    getStageComments,
    createNewStage
};

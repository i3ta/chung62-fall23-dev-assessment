// All API calls

// Fetch database data from api
async function fetchData () {
    try {
        const response = await fetch('/api/data', {
            method: 'GET',
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error: ', error);
        return [];
    }
}

// Delete database row 
async function deleteData (userID) {
    try {
        const response = await fetch(`/api/data`, {
            method: 'POST',
            body: JSON.stringify({type: 'DELETE', id: userID})
        });
        return true;
    } catch (error) {
        console.error('Error: ', error);
        return false;
    }
}

// Modify database data
async function modifyData () {
    try {
        const response = await fetch('/api/data', {
            method: 'POST',
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error: ', error);
        return [];
    }
}

export { fetchData, deleteData, modifyData };
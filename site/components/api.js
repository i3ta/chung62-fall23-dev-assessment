// All API calls

// Fetch database data from api
async function fetchData () {
    try {
        const response = await fetch('/api/data', {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: ', error);
        return [];
    }
}

async function fetchUser (id) {
    try {
        const response = await fetch(`/api/user/${id}`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: ', error);
        return [];
    }
}

export { fetchData, fetchUser };
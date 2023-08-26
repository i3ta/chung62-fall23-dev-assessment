// Fetch database data from api
async function fetchData () {
    try {
        const response = await fetch('/api');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error: ', error);
        return [];
    }
}

export default function Page () {
    return (
        <div>Hello world!</div>
    );
}
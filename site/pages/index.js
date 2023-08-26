import { useState, useEffect } from 'react';
import Table from '../components/table';

// Fetch database data from api
async function fetchData () {
    try {
        const response = await fetch('/api/users', {
            method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error: ', error);
        return [];
    }
}

export default function Page () {
    const [data, setData] = useState([]);;

    useEffect(() => {
        async function fetchDataAsync() {
            const fetchedData = await fetchData();
            setData(fetchedData);
            console.log('fetched data');
        }

        fetchDataAsync();
    }, []);

    return (
        <Table key={data.id} tableData={data} />
    );
}
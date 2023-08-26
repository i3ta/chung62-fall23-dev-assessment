import { useState, useEffect } from 'react';
import { fetchData } from '../components/api';
import Header from '../components/header';
import Table from '../components/table';

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
        <>
            <Header />
            <Table key={data.id} tableData={data} />
        </>
    );
}
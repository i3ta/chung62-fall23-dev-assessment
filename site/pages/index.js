import { useState, useEffect } from 'react';
import { fetchData } from '../components/api';
import Header from '../components/header';
import Utils from '../components/utils';
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

    function addNew(){}

    return (
        <>
            <Header />
            <Utils addNew={addNew} />
            <Table key={data.id} tableData={data} />
        </>
    );
}
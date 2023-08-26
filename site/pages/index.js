import { useState, useEffect } from "react";
import { fetchData } from "../components/api";
import Header from "../components/header";
import Utils from "../components/utils";
import Table from "../components/table";
import Overlay from "../components/overlay";

function getPreset (id) {
    console.log(`preset for ID: ${id}`);
    const idString = id.toString();
    console.log(idString);
    return ({
        "name": "",
        "avatar": "",
        "hero_project": "",
        "notes": "",
        "email": "",
        "phone": "",
        "rating": "",
        "status": false,
        "id": idString,
    });
}

export default function Page() {
    const [data, setData] = useState([]);
    const [overlayOpen, setOverlayOpen] = useState(false);
    const [currentID, setCurrentID] = useState(0);
    const [user, setUser] = useState({
        "name": "",
        "avatar": "",
        "hero_project": "",
        "notes": "",
        "email": "",
        "phone": "",
        "rating": "",
        "status": false,
        "id": "-1",
    });

    console.log('type of user: ');
    console.log(typeof user);

    useEffect(() => {
        async function fetchDataAsync() {
            const fetchedData = await fetchData();
            setData(fetchedData);
            var maxID = 0;
            for (var i = 0; i < fetchedData.length; i++) {
                const user = fetchedData[i];
                maxID = Math.max(maxID, parseInt(user['id']));
            }
            console.log(maxID);
            setCurrentID(maxID + 1);
            console.log("fetched data");
            console.log(`Current ID: ${currentID}`);
        }

        fetchDataAsync();
    }, []);

    const openOverlay = () => {
        console.log("open overlay");
        setOverlayOpen(true);
    };

    const closeOverlay = () => {
        console.log("close overlay");
        setOverlayOpen(false);
    };

    const changeUser = (id) => {
        console.log(`modifiying ${id}`);
        setUser(data.filter(user => user['id'] === id)[0]);
        openOverlay();
    }
    
    const modifyUser = () => {
        console.log(user);
        deleteUser(user['id']);
        console.log([...data, user]);
        setData([...data, user]);
        if(parseInt(user['id']) === currentID) {
            setCurrentID(currentID + 1);
        }
        setUser(getPreset(currentID + 1));
    };
    
    const deleteUser = (id) => {
        console.log(id);
        setData(data.filter(user => user.id !== id));
    };
    
    const newUser = () => {
        setUser(getPreset(currentID));
        openOverlay();
    };

    return (
        <>
            <Header />
            <Utils addNew={newUser} />
            <Table key={data.id} tableData={data} />
            <Overlay
                user={user}
                setUser={setUser}
                visibility={overlayOpen}
                closeOverlay={closeOverlay}
                modifyUser={modifyUser}
            />
        </>
    );
}

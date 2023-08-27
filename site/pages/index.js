import { useState, useEffect } from "react";
import { fetchData } from "../components/api";
import Header from "../components/header";
import Utils from "../components/utils";
import Table from "../components/table";
import Overlay from "../components/overlay";
import ContextMenu from "../components/contextMenu";

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
    const [showContext, setShowContext] = useState(false);
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

    useEffect(() => {
        async function fetchDataAsync() {
            const fetchedData = await fetchData();
            setData(fetchedData);
            var maxID = 0;
            for (var i = 0; i < fetchedData.length; i++) {
                const user = fetchedData[i];
                maxID = Math.max(maxID, parseInt(user['id']));
            }
            setCurrentID(maxID + 1);
        }

        fetchDataAsync();
    }, []);

    const openOverlay = () => {
        setOverlayOpen(true);
    };

    const closeOverlay = () => {
        setOverlayOpen(false);
    };

    const changeUser = (id) => {
        setUser(data.filter(user => user['id'] === id)[0]);
        openOverlay();
    }
    
    const modifyUser = () => {
        deleteUser(user['id']);
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

    const onRightClick = (id, e) => {
        console.log(`Recieved click ${id}`);
        setShowContext(true);
    }

    return (
        <>
            <Header />
            <Utils addNew={newUser} />
            <Table key={data.id} tableData={data} rightClickAction={onRightClick} />
            <Overlay
                user={user}
                setUser={setUser}
                visibility={overlayOpen}
                closeOverlay={closeOverlay}
                modifyUser={modifyUser}
            />
            <ContextMenu vis={showContext} />
        </>
    );
}

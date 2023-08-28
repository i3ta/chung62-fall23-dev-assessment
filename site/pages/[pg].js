import { useState, useEffect } from "react";
import { fetchData } from "../components/api";
import Header from "../components/header";
import Utils from "../components/utils";
import Table from "../components/table";
import Overlay from "../components/overlay";
import ContextMenu from "../components/contextMenu";

function getPreset(id) {
    console.log(`preset for ID: ${id}`);
    const idString = id.toString();
    console.log(idString);
    return {
        name: "",
        avatar: "",
        hero_project: "",
        notes: "",
        email: "",
        phone: "",
        rating: "",
        status: false,
        id: idString,
    };
}

export default function Page() {
    const [data, setData] = useState([]);                   // Data from database
    const [overlayOpen, setOverlayOpen] = useState(false);  // Visibility of new/edit volunteer menu
    const [currentID, setCurrentID] = useState(0);          // Next unused user ID
    const [showContext, setShowContext] = useState(false);  // Visibility of context menu
    const [user, setUser] = useState({                      // Target user to be edited
        name: "",
        avatar: "",
        hero_project: "",
        notes: "",
        email: "",
        phone: "",
        rating: "",
        status: false,
        id: "-1",
    });
    const [loc, setLoc] = useState({ x: 0, y: 0 });         // Location of context menu
    const [targetID, setTargetID] = useState("-1");         // User ID of target of context menu

    useEffect(() => {
        // Fetching data from API
        async function fetchDataAsync() {
            const fetchedData = await fetchData();
            setData(fetchedData);
            var maxID = 0;
            for (var i = 0; i < fetchedData.length; i++) {
                const user = fetchedData[i];
                maxID = Math.max(maxID, parseInt(user["id"]));
            }
            setCurrentID(maxID + 1);
        }

        fetchDataAsync();
    }, []);

    const closeOverlay = () => {
        // Close new/edit volunteer overlay
        setOverlayOpen(false);
    };

    const beginEditUser = (id) => {
        // Open menu for editing user
        setUser(data.filter((user) => user["id"] === id)[0]);
        setOverlayOpen(true);
    };

    const editUser = () => {
        // Change the user information
        const cmp = (a, b) => {
            const A = parseInt(a['id']);
            const B = parseInt(b['id']);
            if(A < B) return -1;
            if(A > B) return 1;
            return 0;
        }

        var tmpData = data.filter((u) => u["id"] !== user["id"]);
        setData([...tmpData, user].sort(cmp));
        if (parseInt(user["id"]) === currentID) {
            setCurrentID(currentID + 1);
        }
        setUser(getPreset(currentID + 1));
    };

    const deleteUser = (id) => {
        // Delete a user
        console.log(`Delete ${id}`);
        setData(data.filter((user) => user["id"] !== id));
    };

    const newUser = () => {
        // Create new user
        setUser(getPreset(currentID));
        setOverlayOpen(true);
    };

    const onRightClick = (id, e) => {
        // Action to be performed on right click
        setLoc({ x: e.pageX, y: e.pageY });
        setShowContext(true);
        setTargetID(id);
    };

    useEffect(() => {
        // Handle left click to close context menu
        const handleClick = () => setShowContext(false);
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <>
            <Header />
            <Utils addNew={newUser} />
            <Table
                key={data.id}
                tableData={data}
                rightClickAction={onRightClick}
            />
            <Overlay
                user={user}
                setUser={setUser}
                visibility={overlayOpen}
                closeOverlay={closeOverlay}
                editUser={editUser}
            />
            <ContextMenu
                vis={showContext}
                loc={loc}
                id={targetID}
                onEdit={beginEditUser}
                onDelete={deleteUser}
            />
        </>
    );
}

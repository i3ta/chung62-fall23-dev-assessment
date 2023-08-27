import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
    const [data, setData] = useState([]);
    const [overlayOpen, setOverlayOpen] = useState(false);
    const [currentID, setCurrentID] = useState(0);
    const [showContext, setShowContext] = useState(false);
    const [user, setUser] = useState({
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
    const [loc, setLoc] = useState({ x: 0, y: 0 });
    const [targetID, setTargetID] = useState("-1");
    const router = useRouter();
    const page = router.query.pg;
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        async function fetchDataAsync() {
            const fetchedData = await fetchData();
            setData(fetchedData);
            var maxID = 0;
            for (var i = 0; i < fetchedData.length; i++) {
                const user = fetchedData[i];
                maxID = Math.max(maxID, parseInt(user["id"]));
            }
            setCurrentID(maxID + 1);
            setPageCount(Math.ceil(fetchedData.length / 10));
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
        setUser(data.filter((user) => user["id"] === id)[0]);
        openOverlay();
    };

    const modifyUser = () => {
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
        console.log(`Delete ${id}`);
        setData(data.filter((user) => user["id"] !== id));
    };

    const newUser = () => {
        setUser(getPreset(currentID));
        openOverlay();
    };

    const onRightClick = (id, e) => {
        console.log(`Recieved click ${id}`);
        console.log(`Position: ${e.pageX} ${e.pageY}`);
        setLoc({ x: e.pageX, y: e.pageY });
        setShowContext(true);
        setTargetID(id);
    };

    useEffect(() => {
        const handleClick = () => setShowContext(false);
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <>
            <Header />
            {
                page && <>
                    <Utils addNew={newUser} pageCount={pageCount} curPage={page} />
                    <Table
                        key={data.id}
                        tableData={data.slice((page - 1) * 10, page * 10)}
                        rightClickAction={onRightClick}
                    />
                    <Overlay
                        user={user}
                        setUser={setUser}
                        visibility={overlayOpen}
                        closeOverlay={closeOverlay}
                        modifyUser={modifyUser}
                    />
                </>
            }
            <ContextMenu
                vis={showContext}
                loc={loc}
                id={targetID}
                onEdit={changeUser}
                onDelete={deleteUser}
            />
        </>
    );
}

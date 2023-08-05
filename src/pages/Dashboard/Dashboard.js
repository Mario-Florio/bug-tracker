import "./Dashboard.css";
import { useEffect, useState } from "react";
import ResizableGrid from "./ResizableGrid/ResizableGrid";
import bugs from "../../server/bugs/bugs";
import events from "../../utils/pub-sub";

function Dashboard() {

    const [bugsListLength, setBugsListLength] = useState(bugs.getBugs().length);

    useEffect(() => {
        events.emit("Bugs state set", bugs.getBugs());
    }, [])

    return(
        <div>
            <h2 className="page__header">Dashboard</h2>
            <ResizableGrid bugsListLength={bugsListLength}/>
        </div>
    );
}

export default Dashboard;
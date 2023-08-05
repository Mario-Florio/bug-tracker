import "./Dashboard.css";
import { useState } from "react";
import ResizableGrid from "./ResizableGrid/ResizableGrid";
import bugs from "../../server/bugs/bugs";

function Dashboard() {

    const [bugsListLength, setBugsListLength] = useState(bugs.getBugs().length);

    return(
        <div>
            <h2 className="page__header">Dashboard</h2>
            <ResizableGrid bugsListLength={bugsListLength}/>
        </div>
    );
}

export default Dashboard;
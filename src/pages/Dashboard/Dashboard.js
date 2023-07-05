import "./Dashboard.css";
import { useState } from "react";
import ResizableGrid from "./ResizableGrid/ResizableGrid";
import bugs from "../../bugs";

function Dashboard() {

    const [bugsLength, setBugsLength] = useState(bugs.getBugs().length);

    return(
        <div>
            <h2 className="page__header">Dashboard</h2>
            <ResizableGrid bugsLength={bugsLength}/>
        </div>
    );
}

export default Dashboard;
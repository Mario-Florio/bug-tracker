import "./Dashboard.css";
import { useState } from "react";
import ResizableGrid from "./ResizableGrid/ResizableGrid";
import bugs from "../../server/bugs/bugs";

function Dashboard() {

    const [bugsList, setBugsList] = useState(bugs.getBugs());

    return(
        <div>
            <h2 className="page__header">Dashboard</h2>
            <ResizableGrid bugsList={bugsList}/>
        </div>
    );
}

export default Dashboard;
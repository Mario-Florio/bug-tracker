import "./Bugs.css";
import { useState } from "react";
import BugInfo from "./BugInfo/BugInfo";
import BugsList from "./BugsList/BugsList";
import bugs from "../../server/bugs/bugs";

function Bugs() {

    const [bugsList, setBugsList] = useState(bugs.getBugs());
    const [bug, setBug] = useState(bugsList[0]);

    return(
        <div>
            <h2 className="page__header">Bugs</h2>
            <BugInfo bugs={bugs} bug={bug} setBug={setBug}  bugsList={bugsList} setBugsList={setBugsList}/>
            <BugsList bugs={bugs} bugsList={bugsList} setBugsList={setBugsList} setBug={setBug}/>
        </div>
    );
}

export default Bugs;
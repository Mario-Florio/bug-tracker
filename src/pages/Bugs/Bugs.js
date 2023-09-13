import "./Bugs.css";
import { useEffect, useState } from "react";
import BugInfo from "./BugInfo/BugInfo";
import BugsList from "./BugsList/BugsList";
import bugs from "../../server/bugs/bugs";
import events from "../../utils/pub-sub";

function Bugs() {

    const [bugsList, setBugsList] = useState(bugs.getBugs());
    const [bug, setBug] = useState(bugsList[0]);

    useEffect(() => {
        events.emit("Bugs state set", bugsList);
    }, [bugsList]);

    return(
        <div>
            <h2 className="page__header">Bugs</h2>
            <BugInfo bugs={bugs} bug={bug} setBug={setBug}  bugsList={bugsList} setBugsList={setBugsList}/>
            <BugsList bugs={bugs} bugsList={bugsList} setBugsList={setBugsList} setBug={setBug}/>
        </div>
    );
}

export default Bugs;
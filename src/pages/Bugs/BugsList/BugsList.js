import './BugsList.css';
import bugsList from '../../../bugs';
import uniqid from 'uniqid';
import { useState } from 'react';

function BugsList() {

    const [bugs, setBugs] = useState(bugsList);

    const renderBugs = () => {
        let bugsList = []
        for (let bug in bugs) {
            bugsList.push(bugs[bug])
        }
        return bugsList.map(bug =>       
            <div
                key={uniqid()} 
                style={{
                    display: "flex", 
                    justifyContent: "space-around",
                    alignItems: "center",
                    color: "rgb(182, 182, 182)",
                    borderBottom: "solid .5px rgb(182, 182, 182)",
                    cursor: "pointer"
                }}
            >
                <h4>{bug.title}</h4>
                <p>{bug.description}</p>
                <p>{bug.status}</p>
            </div>)
    };

    return(
        <div>
            {renderBugs()}
        </div>
    );
}

export default BugsList;
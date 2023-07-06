import { useState } from "react";
import "./BugInfo.css";

function BugInfo(props) {

    const { bugs, bug, setBug, bugsList, setBugsList } = props;

    const [editable, setEditable] = useState(false);
    const [name, setName] = useState();

    const handleCancel = e => {
        e.preventDefault();
        setEditable(false);
    }

    const handleChange = e => {
        setName(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        bugs.edit(bug.id, { id: bug.id, name: name, description: bug.description, dueDate: bug.dueDate, status: bug.status }); // temp code
        setBugsList(bugs.getBugs());
        setBug({ id: bug.id, name: name, description: bug.description, dueDate: bug.dueDate, status: bug.status }); // temp fix; find solution where data reflects src (bugsList)
        setName("");
        setEditable(false);
    };

    const handleDeletion = e => {
        e.preventDefault();
        bugs.delete(bug.id);
        setBugsList(bugs.getBugs());
        setBug(bugs.getBugs()[0]);
    };

    return(
        <div className="bugInfo">
            {editable ? 
                <form>
                    <input type="text" onChange={handleChange} placeholder={bug.name}/>
                    <button onClick={handleSubmit}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleDeletion}>Delete</button>
                </form>
            :
                bug === undefined ?
                    <>
                        <h3>Select Bug</h3>
                    </> 
                :
                    <>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <h3>{bug.name}</h3>
                            <p 
                                className={bug.status === 1 ? "bugsList__notStarted" : bug.status === 2 ? "bugsList__inProgress" : "bugsList__resolved"}
                            >
                                {convertStatus(bug.status)}
                            </p>
                        </div>
                        <p>{bug.dueDate.toLocaleDateString()}</p>
                        <p>{bug.description}</p>
                        <button onClick={() => setEditable(true)}>Edit</button>
                        <button onClick={handleDeletion}>Delete</button>
                    </>
            }
        </div>
    );
}

export default BugInfo;

function convertStatus(status) {
    let statusStr
    switch(status) {
        case 1:
            statusStr = "Not Started"
            break;
        case 2:
            statusStr = "In Progress"
            break;
        case 3:
            statusStr = "Resolved"
            break;
        default:
            statusStr = null
            break;
    }
    return statusStr;
}
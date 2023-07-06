import { useState } from "react";
import "./BugInfo.css";

function BugInfo(props) {

    const { bugs, bug, setBug, setBugsList } = props;
    const [editable, setEditable] = useState(false);

    const handleDeletion = () => {
        bugs.delete(bug.id);
        setBugsList(bugs.getBugs());
        setBug(bugs.getBugs()[0]);
    };

    return(
        <div className="bugInfo">
            {editable ? 
                <>
                    <Form bugs={bugs} bug={bug} setBug={setBug} setBugsList={setBugsList} setEditable={setEditable}/>
                    <button onClick={handleDeletion}>Delete</button>
                </>
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

function Form(props) {

    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(0);

    const { bugs, bug, setBug, setBugsList, setEditable } = props;

    const handleCancel = e => {
        e.preventDefault();
        setEditable(false);
    };

    const handleNameChange = e => {
        setName(e.target.value);
    };

    const handleDescriptionChange = e => {
        setDescription(e.target.value);
    };

    const handleDueDateChange = e => {
        setDueDate(e.target.value);
    };

    const handleStatusChange = e => {
        setStatus(Number(e.target.value));
    };

    const handleSubmit = e => {
        e.preventDefault();
        bugs.edit(bug.id, { // temp code
            id: bug.id, 
            name: name !== "" ? name : bug.name, 
            dueDate: dueDate !== "" ? new Date(dueDate) : bug.dueDate, 
            description: description !== "" ? description : bug.description, 
            status: status !== 0 ? status : bug.status 
        });
        setBugsList(bugs.getBugs());
        setBug({ // temp code: find solution where data reflects src (bugsList)
            id: bug.id, 
            name: name !== "" ? name : bug.name, 
            dueDate: dueDate !== "" ? new Date(dueDate) : bug.dueDate, 
            description: description !== "" ? description : bug.description, 
            status: status !== 0 ? status : bug.status 
        });
        setName("");
        setDueDate("");
        setDescription("");
        setStatus(0);
        setEditable(false);
    };

    return(
        <form style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
            <label>Name</label>
            <input type="text" onChange={handleNameChange} placeholder={bug.name}/>
            <label>Due Date</label>
            <input type="date" onChange={handleDueDateChange}/>
            <label>Description</label>
            <textarea onChange={handleDescriptionChange}/>
            <label>Status:</label>
            <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                <label>Not Started</label>
                <input type="radio" name="status" value={1} onChange={handleStatusChange}/>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                <label>In Progress</label>
                <input type="radio" name="status" value={2} onChange={handleStatusChange}/>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                <label>Resolved</label>
                <input type="radio" name="status" value={3} onChange={handleStatusChange}/>
            </div>
            <div>
                <button onClick={handleSubmit}>Confirm</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}
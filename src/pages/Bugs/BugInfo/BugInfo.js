import { useEffect, useState } from "react";
import "./BugInfo.css";

function BugInfo(props) {

    const { bugs, bug, setBug, bugsList, setBugsList } = props;
    const [editable, setEditable] = useState(false);
    const [index, setIndex] = useState(bugsList.indexOf(bug));

    useEffect(() => {
        setBug(bugsList[index]);
    }, [bugsList]);

    useEffect(() => {
        setIndex(bugsList.indexOf(bug));
    }, [bug]);

    const handleDeletion = () => {
        bugs.delete(bug.id);
        setBugsList(bugs.getBugs());
    };

    return(
        <div className="bugInfo">
            {bug === undefined ?
                <>
                    <h3>Select Bug</h3>
                </> 
                :
                <>
                    {editable ? 
                        <Form bugs={bugs} bug={bug} setBugsList={setBugsList} setEditable={setEditable}/>
                    :
                        <Display bug={bug} setEditable={setEditable}/>    
                    }
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

function Display(props) {

    const { bug, setEditable } = props;

    return(
        <>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h3>{bug.name}</h3>
                <p 
                    className={bug.status === 1 ? "bugsList__notStarted" : bug.status === 2 ? "bugsList__inProgress" : "bugsList__resolved"}
                >
                    {convertStatus(bug.status)}
                </p>
            </div>
            <p>{new Date(bug.dueDate).toLocaleDateString()}</p>
            <p style={{whiteSpace: "pre-wrap"}}>{bug.description}</p>
            <button onClick={() => setEditable(true)}>Edit</button>
        </>
    );
}

function Form(props) {

    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(0);

    const { bugs, bug, setBugsList, setEditable } = props;

    function resetForm() {
        setName("");
        setDueDate("");
        setDescription("");
        setStatus(0);
        setEditable(false);
    };

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
        setDueDate(new Date(e.target.value));
        // Date currently refers to day before:

        // "You can force the time zone to be interpreted by 
        // tacking on T00:00-0800 to the date string. 
        // It might be more robust for you to parse the date yourself 
        // and construct your Date instance with numeric year, month, and date parameters."
    };

    const handleStatusChange = e => {
        setStatus(Number(e.target.value));
    };

    const handleSubmit = e => {
        e.preventDefault();
        let editedBug = {
            id: bug.id, 
            name: name !== "" ? name : bug.name, 
            dueDate: dueDate !== "" ? dueDate : bug.dueDate, 
            description: description !== "" ? description : bug.description, 
            status: status !== 0 ? status : bug.status 
        };
        bugs.edit(bug.id, editedBug);
        setBugsList(bugs.getBugs());
        resetForm();
    };

    return(
        <form style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
            <label>Name</label>
            <input type="text" onChange={handleNameChange} maxLength={25} placeholder={bug.name}/>
            <label>Due Date</label>
            <input type="date" onChange={handleDueDateChange}/>
            <label>Description</label>
            <textarea onChange={handleDescriptionChange} placeholder={bug.description}/>
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

import './BugsList.css';
import { useState } from 'react';
import uniqid from 'uniqid';

function BugsList(props) {

    const [formIsActive, setFormIsActive] = useState(false);

    const { bugs, bugsList, setBugsList, setBug } = props;

    return(
        <div className="bugsList">
            <table className="bugsList__table">
                <thead>
                    <tr className="bugsList__tableRow">
                        <th style={{textAlign: "left", width: "146px"}}>Name</th>
                        <th>Due Date</th>
                        <th style={{textAlign: "right", width: "97px"}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bugsList.map(bug => <BugTicket key={uniqid()} bug={bug} setBug={setBug} bugsList={bugsList}/>)}
                </tbody>
            </table>
            {formIsActive ?
                <Form bugs={bugs} setBugsList={setBugsList} setFormIsActive={setFormIsActive}/>
            :
                <button onClick={() => setFormIsActive(true)}>
                    Add Bug
                </button>}
        </div>
    );
}

export default BugsList;

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

function BugTicket(props) {

    const { bug, setBug, bugsList } = props;

    return(
        <tr onClick={() => setBug(bugsList[bugsList.indexOf(bug)])} className="bugsList__tableDataRow">
            <td style={{textAlign: "left", width: "146px"}}>{bug.name}</td>
            <td>{new Date(bug.dueDate).toLocaleDateString()}</td>
            <td 
                className={bug.status === 1 ? "bugsList__notStarted" : bug.status === 2 ? "bugsList__inProgress" : "bugsList__resolved"}
            >
                {convertStatus(bug.status)}
            </td>
        </tr>
    );
}

function Form(props) {

    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1);

    const { bugs, setBugsList, setFormIsActive } = props;

    function resetForm() {
        setName("");
        setDueDate(new Date());
        setDescription("");
        setStatus(1);
        setFormIsActive(false);
    };

    const handleCancel = e => {
        e.preventDefault();
        setFormIsActive(false);
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
        let newBug = { 
            id: uniqid(), 
            name: name, 
            dueDate: dueDate, 
            description: description, 
            status: status 
        };
        bugs.add(newBug);
        setBugsList(bugs.getBugs());
        resetForm();
    };

    return(
        <form style={{display: "flex", flexDirection: "column", alignItems: "start", color: "rgb(182, 182, 182)"}}>
            <label>Name</label>
            <input type="text" onChange={handleNameChange} maxLength={25} placeholder={"Name"}/>
            <label>Due Date</label>
            <input type="date" onChange={handleDueDateChange}/>
            <label>Description</label>
            <textarea onChange={handleDescriptionChange} placeholder='Description'/>
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

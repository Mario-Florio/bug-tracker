import './BugsList.css';
import { useState } from 'react';
import uniqid from 'uniqid';

function BugsList(props) {

    const [formIsActive, setFormIsActive] = useState(false);
    const [name, setName] = useState("");

    const { bugs, bugsList, setBugsList, setBug } = props;

    const handleChange = e => {
        setName(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        bugs.add({ id: uniqid(), name: name, description: "Lorem Ipsum.", dueDate: new Date(), status: 1, priority: 1 });
        setBugsList(bugs.getBugs());
        setName("");
        setFormIsActive(false);
    }

    return(
        <div className="bugsList">
            <table className="bugsList__table">
                <thead>
                    <tr className="bugsList__tableRow">
                        <th>Name</th>
                        <th>Due Date</th>
                        <th style={{width: "97px"}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bugsList.map(bug => <BugTicket key={uniqid()} bug={bug} setBug={setBug} bugsList={bugsList}/>)}
                </tbody>
            </table>
            {formIsActive ?
                <>
                    <form>
                        <input type="text" onChange={handleChange} placeholder="Name"/>
                        <button onClick={handleSubmit}>Submit</button>
                    </form>
                    <button onClick={() => setFormIsActive(false)}>Cancel</button>
                </>
            :
                <button onClick={() => setFormIsActive(true)}>
                    Add Bug
                </button>}
        </div>
    );
}

export default BugsList;

function BugTicket(props) {

    const { bug, setBug, bugsList } = props;

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

    return(
        <tr onClick={() => setBug(bugsList[bugsList.indexOf(bug)])} className="bugsList__tableDataRow">
            <td>{bug.name}</td>
            <td>{bug.dueDate.toLocaleDateString()}</td>
            <td 
                className={bug.status === 1 ? "bugsList__notStarted" : bug.status === 2 ? "bugsList__inProgress" : "bugsList__resolved"}
            >
                {convertStatus(bug.status)}
            </td>
        </tr>
    );
}

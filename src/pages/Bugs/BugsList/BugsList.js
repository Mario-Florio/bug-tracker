import './BugsList.css';
import bugsList from '../../../bugs';
import uniqid from 'uniqid';
import { useState } from 'react';

function BugsList() {

    const [bugs, setBugs] = useState(bugsList);
    const [formIsActive, setFormIsActive] = useState(false);
    const [title, setTitle] = useState("");

    const handleChange = e => {
        setTitle(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setBugs([...bugs, { id: uniqid(), title: title }]);
        setTitle("");
        setFormIsActive(false);
        console.log(bugs)
    }

    return(
        <div>
            {bugs.map(bug => <BugTicket key={uniqid()} bugs={bugs} dis={bug} setBugs={setBugs}/>)}
            {formIsActive ?
                <form style={{marginLeft: "2rem"}}>
                    <input type="text" onChange={handleChange} placeholder="Title"/>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            :
            <button 
                style={{marginLeft: "2rem"}} 
                onClick={() => formIsActive ? setFormIsActive(false) : setFormIsActive(true)}
            >
                Add Bug
            </button>}
        </div>
    );
}

export default BugsList;

function BugTicket(props) {

    const [editable, setEditable] = useState(false);
    const [title, setTitle] = useState("");

    const { dis, bugs, setBugs } = props;

    const handleChange = e => {
        setTitle(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setBugs([...bugs.map(bug => {
            if (bug.id === dis.id) {
                bug.title = title;
                return bug;
            } else return bug;
        })])
        setTitle("");
        setEditable(false);
    };

    const handleDeletion = () => {
        setBugs([...bugs.filter(bug => bug.id !== dis.id)]);
    };

    return(
        <div
            style={{
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "center",
                color: "rgb(182, 182, 182)",
                margin: "0 2rem",
                height: "62.05px",
                borderBottom: "solid .5px rgb(182, 182, 182)",
            }}
        >
            {editable ?
            <form>
                <input type="text" onChange={handleChange} placeholder={dis.title}/>
                <button onClick={handleSubmit}>Confirm</button>
            </form>
            :
            <>
                <h4>{dis.title}</h4>
                <button onClick={() => setEditable(true)}>Edit</button>
            </>}
            <button onClick={handleDeletion}>Delete</button>
        </div>
    );
}

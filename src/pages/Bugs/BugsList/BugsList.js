import './BugsList.css';
import bugs from '../../../bugs';
import uniqid from 'uniqid';
import { useState } from 'react';

function BugsList() {

    const [bugsList, setBugsList] = useState(bugs.getBugs());
    const [formIsActive, setFormIsActive] = useState(false);
    const [title, setTitle] = useState("");

    const handleChange = e => {
        setTitle(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        bugs.add({ id: uniqid(), title: title });
        setBugsList(bugs.getBugs());
        setTitle("");
        setFormIsActive(false);
    }

    return(
        <div className="bugsList">
            {bugsList.map(bug => <BugTicket key={uniqid()} bug={bug} setBugsList={setBugsList}/>)}
            {formIsActive ?
                <form>
                    <input type="text" onChange={handleChange} placeholder="Title"/>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
            :
            <button 
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

    const { bug, setBugsList } = props;

    const handleChange = e => {
        setTitle(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        bugs.edit(bug.id, { id: bug.id, title: title });
        setBugsList(bugs.getBugs());
        setTitle("");
        setEditable(false);
    };

    const handleDeletion = () => {
        bugs.delete(bug.id);
        setBugsList(bugs.getBugs());
    };

    return(
        <div className="bugsList__ticket">
            {editable ?
            <form>
                <input type="text" onChange={handleChange} placeholder={bug.title}/>
                <button onClick={handleSubmit}>Confirm</button>
            </form>
            :
            <>
                <h4>{bug.title}</h4>
                <button onClick={() => setEditable(true)}>Edit</button>
            </>}
            <button onClick={handleDeletion}>Delete</button>
        </div>
    );
}

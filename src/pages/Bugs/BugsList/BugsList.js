import './BugsList.css';
import { useState } from 'react';
import uniqid from 'uniqid';

function BugsList(props) {

    const [formIsActive, setFormIsActive] = useState(false);
    const [title, setTitle] = useState("");

    const { bugs, bugsList, setBugsList, setBug } = props;

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
            {bugsList.map(bug => <BugTicket key={uniqid()} bug={bug} setBug={setBug} bugsList={bugsList}/>)}
            {formIsActive ?
            <>
                <form>
                    <input type="text" onChange={handleChange} placeholder="Title"/>
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

    return(
        <div className="bugsList__ticket">
            <h4 onClick={() => setBug(bugsList[bugsList.indexOf(bug)])}>{bug.title}</h4>
        </div>
    );
}

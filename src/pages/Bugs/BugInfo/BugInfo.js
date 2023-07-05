import { useState } from "react";
import "./BugInfo.css";

function BugInfo(props) {

    const [editable, setEditable] = useState(false);
    const [title, setTitle] = useState();

    const { bugs, bug, setBug, bugsList, setBugsList } = props;
    const index = bugsList.indexOf(bug);

    const handleChange = e => {
        setTitle(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        bugs.edit(bug.id, { id: bug.id, title: title });
        setBugsList(bugs.getBugs());
        setBug({ id: bug.id, title: title }); // temp fix; find solution where data reflects src (bugsList)
        setTitle("");
        setEditable(false);
    };

    const handleDeletion = e => {
        e.preventDefault();
        bugs.delete(bug.id);
        setBugsList(bugs.getBugs());
        setBug(bugsList[1]); // temp fix; find solution where data reflects current src
    };

    return(
        <div className="bugInfo">
            {editable ? 
                <form>
                    <input type="text" onChange={handleChange} placeholder={bug.title}/>
                    <button onClick={handleSubmit}>Confirm</button>
                    <button onClick={handleDeletion}>Delete</button>
                </form>
            :
            <>
                <h3>{bug.title}</h3>
                <button onClick={() => setEditable(true)}>Edit</button>
                <button onClick={handleDeletion}>Delete</button>
            </>
            }
        </div>
    );
}

export default BugInfo;
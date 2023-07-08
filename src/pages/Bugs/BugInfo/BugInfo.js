import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
                        <ReactHookForm bugs={bugs} bug={bug} setBugsList={setBugsList} setEditable={setEditable}/>
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
                    className={bug.status === 1 ? "bugs__notStarted" : bug.status === 2 ? "bugs__inProgress" : "bugs__resolved"}
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

function ReactHookForm(props) {

    const { bugs, bug, setBugsList, setEditable } = props;

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        defaultValues: {
            name: bug.name,
            dueDate: new Date(bug.dueDate).toISOString().split('T')[0],
            description: bug.description,
            status: bug.status,
        }
    });

    const handleCancel = e => {
        e.preventDefault();
        setEditable(false);
    };

    const submit = (data, e) => {
        e.preventDefault();
        let newBug = {
            id: bug.id,
            name: data.name,
            dueDate: new Date(data.dueDate).toISOString().split('T')[0],
            description: data.description,
            status: Number(data.status)
        };
        bugs.edit(bug.id, newBug);
        setBugsList(bugs.getBugs());
        setEditable(false);
    }

    return(
        <form 
            style={{
                display: "flex", 
                flexDirection: "column", 
                alignItems: "start", 
                color: "rgb(182, 182, 182)", 
                margin: "1em 0 1em"
            }}
            onSubmit={handleSubmit((data, e) => submit(data, e))}>
            <label>Name</label>
            <input 
                className={errors.name ? "bugs__input--invalid" : null}
                {...register("name", 
                    { 
                        required: "This is required.", 
                        maxLength: { value: 20, message: "Max length is 20." } 
                    }
                )} 
                placeholder='Name'
            />
            {errors.name ? <p className="bugs__errorMsg">{errors.name.message}</p> : null}
            <label>Due Date</label>
            <input
                type='date'
                {...register("dueDate")} 
            />
            <label>Description</label>
            <textarea
                className={errors.description ? "bugs__input--invalid" : null}
                {...register("description", 
                    { 
                        required: "This is required.", 
                    }
                )} 
                placeholder='Description'
            />
            {errors.description ? <p className="bugs__errorMsg">{errors.description.message}</p> : null}
            <label>Status</label>
            <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                <label>Not Started</label>
                <input
                    type="radio"
                    value={1}
                    {...register("status")}
                />
            </div>
            <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                <label>In Progress</label>
                <input
                    type="radio"
                    value={2}
                    {...register("status")}
                />
            </div>
            <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                <label>Resolved</label>
                <input
                    type="radio"
                    value={3}
                    {...register("status")}
                />
            </div>
            <div style={{margin: "1em 0"}}>
                <button>Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
}

import './BugsList.css';
import { useState } from 'react';
import { useForm } from "react-hook-form";
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
                <ReactHookForm bugs={bugs} setBugsList={setBugsList} setFormIsActive={setFormIsActive}/>
            :
                <button style={{margin: "1em 0"}} onClick={() => setFormIsActive(true)}>
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

function ReactHookForm(props) {

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        defaultValues: {
            name: "",
            dueDate: new Date().toISOString().split('T')[0],
            description: "",
            status: 1,
        }
    });

    const { setFormIsActive, bugs, setBugsList } = props;

    const handleCancel = e => {
        e.preventDefault();
        setFormIsActive(false);
    };

    const submit = (data, e) => {
        e.preventDefault();
        let newBug = {
            id: uniqid(),
            name: data.name,
            dueDate: new Date(data.dueDate).toISOString().split('T')[0],
            description: data.description,
            status: Number(data.status)
        };
        bugs.add(newBug);
        setBugsList(bugs.getBugs());
        setFormIsActive(false);
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
                className={errors.name ? "bugsList__input--invalid" : null}
                {...register("name", 
                    { 
                        required: "This is required.", 
                        maxLength: { value: 20, message: "Max length is 20." } 
                    }
                )} 
                placeholder='Name'
            />
            {errors.name ? <p className="bugsList__errorMsg">{errors.name.message}</p> : null}
            <label>Due Date</label>
            <input
                type='date'
                {...register("dueDate")} 
            />
            <label>Description</label>
            <textarea
                className={errors.description ? "bugsList__input--invalid" : null}
                {...register("description", 
                    { 
                        required: "This is required.", 
                    }
                )} 
                placeholder='Description'
            />
            {errors.description ? <p className="bugsList__errorMsg">{errors.description.message}</p> : null}
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

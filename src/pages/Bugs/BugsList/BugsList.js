import './BugsList.css';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import uniqid from 'uniqid';

function BugsList(props) {

    const { bugs, bugsList, setBugsList, setBug } = props;

    return(
        <div className="bugsList">
            <table className="bugsList__table">
                <thead style={{position: "sticky", top: "7.7rem", backgroundColor: "rgb(19, 19, 19)"}}>
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
            <ReactHookForm bugs={bugs} setBugsList={setBugsList}/>
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
                className={bug.status === 1 ? "bugs__notStarted" : bug.status === 2 ? "bugs__inProgress" : "bugs__resolved"}
            >
                {convertStatus(bug.status)}
            </td>
        </tr>
    );
}

function ReactHookForm(props) {

    const [isFormActive, setIsFormActive] = useState(false);

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

    const { bugs, setBugsList } = props;

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
        setIsFormActive(false);
    }

    return(
        <div className="bugsList__formWrapper">
            {isFormActive ?         
            <form 
                className="bugsList__form"
                onSubmit={handleSubmit((data, e) => submit(data, e))}
            >
                <label htmlFor='name'>Name</label>
                <input 
                    type='text'
                    name='name'
                    id='name'
                    className={errors.name ? "bugsList__input--invalid" : null}
                    {...register("name", 
                        { 
                            required: "This is required.", 
                            maxLength: { value: 20, message: "Max length is 20." } 
                        }
                    )} 
                    placeholder='Name'
                />
                {errors.name ? <p className="bugs__errorMsg">{errors.name.message}</p> : null}
                <label htmlFor='dueDate'>Due Date</label>
                <input
                    type='date'
                    name='dueDate'
                    id='dueDate'
                    className={errors.dueDate ? "bugsList__input--invalid" : null}
                    {...register("dueDate",
                        {
                            required: "This is required.",
                        }
                    )} 
                />
                {errors.dueDate ? <p className="bugs__errorMsg">{errors.dueDate.message}</p> : null}
                <label htmlFor='description'>Description</label>
                <textarea
                    name='description'
                    id='description'
                    className={errors.description ? "bugsList__input--invalid" : null}
                    {...register("description", 
                        { 
                            required: "This is required.", 
                        }
                    )} 
                    placeholder='Description'
                />
                {errors.description ? <p className="bugs__errorMsg">{errors.description.message}</p> : null}
                <label htmlFor='status'>Status:</label>
                <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                    <label htmlFor='notStarted'>Not Started</label>
                    <input
                        type="radio"
                        name='status'
                        id='notStarted'
                        value={1}
                        {...register("status")}
                    />
                </div>
                <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                    <label htmlFor='inProgress'>In Progress</label>
                    <input
                        type="radio"
                        name='status'
                        id='inProgress'
                        value={2}
                        {...register("status")}
                    />
                </div>
                <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                    <label htmlFor='resolved'>Resolved</label>
                    <input
                        type="radio"
                        name='status'
                        id='resolved'
                        value={3}
                        {...register("status")}
                    />
                </div>
                <div style={{marginTop: ".7em"}}>
                    <button className="bugsList__submitButton">Submit</button>
                    <button 
                        className="bugsList__cancelButton"
                        onClick={e => {
                            e.preventDefault();
                            isFormActive ? setIsFormActive(false) : setIsFormActive(true)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
            :
            <button 
                className="bugsList__addButton" 
                onClick={() => isFormActive ? setIsFormActive(false) : setIsFormActive(true)}
            >
                +
            </button>
            }
        </div>
    );
}

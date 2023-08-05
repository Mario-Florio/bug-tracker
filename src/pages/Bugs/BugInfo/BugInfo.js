import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./BugInfo.css";
import convertStatus from "../../../utils/global";
import uniqid from "uniqid";

import projects from "../../../server/projects/projects";

function BugInfo(props) {

    let projectsList = projects.getProjects();

    const { bugs, bug, setBug, bugsList, setBugsList } = props;
    const [editable, setEditable] = useState(false);
    const [index, setIndex] = useState(bugsList.indexOf(bug));

    useEffect(() => {
        setBug(bugsList[index]);
    }, [bugsList]);

    useEffect(() => {
        setIndex(bugsList.indexOf(bug));
    }, [bug]);

    return(
        <div className="bugInfo">
            {bug === undefined ?
                <>
                    <h3>Select Bug</h3>
                </> 
                :
                <>
                    {editable ? 
                        <Form bugs={bugs} bug={bug} setBugsList={setBugsList} setEditable={setEditable} projectsList={projectsList}/>
                    :
                        <Display bug={bug} projectsList={projectsList}/>    
                    }
                    <button 
                        className={editable ? 'bugs__button2' : 'bugs__button1'}
                        onClick={() => editable ? setEditable(false) : setEditable(true)}
                    >
                        {editable ? "Cancel" : "Edit"}
                    </button>
                </>
            }
        </div>
    );
}

export default BugInfo;

function Display(props) {

    const { bug, projectsList } = props;

    const getProject = () => {
        let projectName;
        for (let i = 0; i < projectsList.length; i++) {
            if (projectsList[i].id === bug.projectId) projectName = projectsList[i].name;
        }
        return projectName;
    }

    return(
        <>
            <div style={{position: "sticky", top: "8.88rem", backgroundColor: "rgb(19, 19, 19)"}}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h3 style={{margin: ".5em 0"}}>{bug.name}</h3>
                    <h4 style={{fontWeight: ""}}>{getProject()}</h4>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <p>{new Date(bug.dueDate).toLocaleDateString()}</p>
                    <p 
                        style={{margin: ".5em 0"}}
                        className={bug.status === 1 ? "bugs__notStarted" : bug.status === 2 ? "bugs__inProgress" : "bugs__resolved"}
                    >
                        {convertStatus(bug.status)}
                    </p>
                </div>
            </div>
            <p style={{whiteSpace: "pre-wrap"}}>{bug.description}</p>
        </>
    );
}

function Form(props) {

    const { bugs, bug, setBugsList, setEditable, projectsList } = props;

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
            projectId: bug.projectId,
        }
    });

    const handleDeletion = () => {
        bugs.delete(bug.id);
        setBugsList(bugs.getBugs());
    };

    const submit = (data, e) => {
        e.preventDefault();
        let newBug = {
            id: bug.id,
            name: data.name,
            dueDate: new Date(data.dueDate).toISOString().split('T')[0],
            description: data.description,
            status: Number(data.status),
            projectId: data.projectId,
        };
        bugs.edit(bug.id, newBug);
        setBugsList(bugs.getBugs());
        setEditable(false);
    };

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
            <fieldset>
                <legend>Status</legend>
                <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                    <label htmlFor="notStarted">Not Started</label>
                    <input
                        type="radio"
                        name="status"
                        id="notStarted"
                        value={1}
                        {...register("status")}
                    />
                </div>
                <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                    <label htmlFor="inProgress">In Progress</label>
                    <input
                        type="radio"
                        name="status"
                        id="inProgress"
                        value={2}
                        {...register("status")}
                    />
                </div>
                <div style={{display: "flex", justifyContent: "space-between", width: "110px"}}>
                    <label htmlFor="status">Resolved</label>
                    <input
                        type="radio"
                        name="status"
                        id="resolved"
                        value={3}
                        {...register("status")}
                    />
                </div>
            </fieldset>
            <label htmlFor="projectId">Project:</label>
            <select 
                name="projectId" 
                id="projectId" 
                {...register("projectId")} 
            >
                <option value={""}>None</option>
                {projectsList.map(project => {
                    return <option key={uniqid()} value={project.id}>
                                {project.name}
                            </option>
                })}
            </select>
            <div style={{margin: "1em 0"}}>
                <button className='bugs__button1'>Submit</button>
                <button className='bugs__button4' onClick={handleDeletion}>Delete</button>
            </div>
        </form>
    );
}

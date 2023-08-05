import "./ProjectsList.css";
import { useState } from "react";
import uniqid from "uniqid";
import { useForm } from "react-hook-form";

function ProjectsList(props) {

    const { projects, projectsList, setProjectsList, setProject } = props;

    return(
        <div className="projectsList">
            <table className="projectsList__table">
                <thead style={{position: "sticky", top: "7.7rem", backgroundColor: "rgb(19, 19, 19)"}}>
                    <tr className="projectsList__tableRow">
                        <th style={{textAlign: "left", width: "100px"}}>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {projectsList.map(project => <ProjectTicket key={uniqid()} project={project} setProject={setProject} projectsList={projectsList}/>)}
                </tbody>
            </table>
            <Form projects={projects} setProjectsList={setProjectsList}/>
        </div>
    )
}

export default ProjectsList;

function ProjectTicket(props) {

    const { project, setProject, projectsList } = props;

    return(
        <tr onClick={() => setProject(projectsList[projectsList.indexOf(project)])} className="projectsList__tableDataRow">
            <td style={{textAlign: "left", width: "100px"}}>{project.name}</td>
        </tr>
    );
}

function Form(props) {

    const [isFormActive, setIsFormActive] = useState(false);

    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
        }
    });

    const { projects, setProjectsList } = props;

    const submit = (data, e) => {
        e.preventDefault();
        let newProject = {
            name: data.name,
            description: data.description,
        };
        projects.add(newProject);
        setProjectsList(projects.getProjects());
        setIsFormActive(false);
        reset();
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
                <div style={{marginTop: ".7em"}}>
                    <button className="bugsList__submitButton">Submit</button>
                    <button 
                        className="bugsList__cancelButton"
                        onClick={e => {
                            e.preventDefault();
                            isFormActive ? setIsFormActive(false) : setIsFormActive(true);
                            reset();
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

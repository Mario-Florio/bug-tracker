import "./ProjectInfo.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import uniqid from "uniqid";

function ProjectInfo(props) {

    const { projects, project, setProject, projectsList, setProjectsList } = props;
    const [editable, setEditable] = useState(false);
    const [index, setIndex] = useState(projectsList.indexOf(project));

    useEffect(() => {
        setProject(projectsList[index]);
    }, [projectsList]);

    useEffect(() => {
        setIndex(projectsList.indexOf(project));
    }, [project]);

    return(
        <div className="projectInfo">
            {project === undefined ?
                <>
                    <h3>Select Project</h3>
                </>
                :
                <>
                    {editable ? 
                        <Form projects={projects} project={project} setProjectsList={setProjectsList} setEditable={setEditable}/>
                        :
                        <Display project={project}/>
                    }
                </>

            }
            <button 
                className={editable ? 'bugs__button2' : 'bugs__button1'}
                onClick={() => editable ? setEditable(false) : setEditable(true)}
            >
                {editable ? "Cancel" : "Edit"}
            </button>
        </div>
    );
}

export default ProjectInfo;

function Display(props) {

    const { project } = props;

    return(
        <>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
        </>
    );
}

function Form(props) {

    const { projects, project, setProjectsList, setEditable } = props;

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        defaultValues: {
            name: project.name,
            description: project.description,
        }
    });

    const handleDeletion = () => {
        projects.delete(project.id);
        setProjectsList(projects.getProjects());
    };

    const submit = (data, e) => {
        e.preventDefault();
        let newProject = {
            id: project.id,
            name: data.name,
            description: data.description,
        };
        projects.edit(project.id, newProject);
        setProjectsList(projects.getProjects());
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
            <div style={{margin: "1em 0"}}>
                <button className='bugs__button1'>Submit</button>
                <button className='bugs__button4' onClick={handleDeletion}>Delete</button>
            </div>
        </form>
    );
}

import "./Projects.css";
import { useEffect, useState } from "react";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import ProjectsList from "./ProjectsList/ProjectsList";
import projects from "../../server/projects/projects";
import events from "../../utils/pub-sub";

function Projects() {

    const [projectsList, setProjectsList] = useState(projects.getProjects());
    const [project, setProject] = useState(projectsList[0]);

    useEffect(() => {
        events.emit("Projects state set", projectsList);
    }, [projectsList]);

    return(
        <div>
            <h2 className="page__header">Projects</h2>
            <ProjectInfo projects={projects} project={project} setProject={setProject} projectsList={projectsList} setProjectsList={setProjectsList}/>
            <ProjectsList projects={projects} projectsList={projectsList} setProjectsList={setProjectsList} setProject={setProject}/>
        </div>
    );
}

export default Projects
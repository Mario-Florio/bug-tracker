import "./Projects.css";
import { useState } from "react";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import ProjectsList from "./ProjectsList/ProjectsList";
import projects from "../../server/projects/projects";

function Projects() {

    const [projectsList, setProjectsList] = useState(projects.getProjects());
    const [project, setProject] = useState(projectsList[0]);

    return(
        <div>
            <h2 className="page__header">Projects</h2>
            <ProjectInfo project={project}/>
            <ProjectsList projectsList={projectsList} setProject={setProject}/>
        </div>
    );
}

export default Projects
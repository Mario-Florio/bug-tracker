import "./ProjectsList.css";
import uniqid from "uniqid";

function ProjectsList(props) {

    const { projectsList, setProject } = props;

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
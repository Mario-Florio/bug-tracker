import "./ProjectInfo.css";

function ProjectInfo(props) {

    const { project } = props;

    return(
        <div className="projectInfo">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
        </div>
    );
}

export default ProjectInfo;

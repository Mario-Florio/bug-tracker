import uniqid from "uniqid";

// Local Storage Data Retrieval
const PROJECTS_KEY = "PROJECTS";

let storedProjects = JSON.parse(localStorage.getItem(PROJECTS_KEY));

let projectsList = storedProjects || [];

// Methods
function getProjects() {
    let restoredProjectsList = [...projectsList].map(project => project = new Project(project.id, project.name, project.description));
    return restoredProjectsList;
}

function add(project) {
    let newProjectId = uniqid();
    let newProject = new Project(newProjectId, project.name, project.description);
    projectsList.push(newProject);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projectsList));
}

function edit(id, change) {
    let editedProject = new Project(id, change.name, change.description);
    projectsList = projectsList.map(project => project.id === id ? editedProject : project);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projectsList));
}

function remove(id) {
    projectsList = projectsList.filter(project => project.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projectsList));
}

const projects = {
    getProjects: getProjects,
    add: add,
    edit: edit,
    delete: remove
}

export default projects;

// Project Prototype
class Project {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
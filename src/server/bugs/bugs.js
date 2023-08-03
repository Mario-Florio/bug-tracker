import uniqid from "uniqid";

// Local Storage Data Retrieval
const BUGS_KEY = "BUGS";

let storedBugs = JSON.parse(localStorage.getItem(BUGS_KEY));

let bugsList = storedBugs || [];

// Methods
function getBugs() {
    return [...bugsList];
}

function add(bug) {
    let newBugId = uniqid();
    let newBug = new Bug(newBugId, bug.name, bug.description, bug.dueDate, bug.status);
    bugsList.push(newBug);
    localStorage.setItem(BUGS_KEY, JSON.stringify(bugsList));
}

function edit(id, change) {
    let editedBug = new Bug(id, change.name, change.description, change.dueDate, change.status);
    bugsList = bugsList.map(bug => bug.id === id ? editedBug : bug);
    localStorage.setItem(BUGS_KEY, JSON.stringify(bugsList));
}

function remove(id) {
    bugsList = bugsList.filter(bug => bug.id !== id);
    localStorage.setItem(BUGS_KEY, JSON.stringify(bugsList));
}

const bugs = {
    getBugs: getBugs,
    add: add,
    edit: edit,
    delete: remove
}

export default bugs;

// Bug Prototype
class Bug {
    constructor(id, name, description, dueDate, status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDate = new Date(dueDate).toISOString().split('T')[0] || new Date().toISOString().split('T')[0];
        this.status = Number(status) || 1;
    }
}
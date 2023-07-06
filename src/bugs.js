import uniqid from 'uniqid';

let storedBugs = JSON.parse(localStorage.getItem('BUGS'));

let bugsList = storedBugs || [];

function getBugs() {
    return [...bugsList];
}

function add(bug) {
    bugsList.push(bug);
    localStorage.setItem('BUGS', JSON.stringify(bugsList))
};

function edit(id, change) {
    bugsList = bugsList.map(bug => bug.id === id ? change : bug);
    localStorage.setItem('BUGS', JSON.stringify(bugsList));
};

function remove(id) {
    bugsList = bugsList.filter(bug => bug.id !== id);
    localStorage.setItem('BUGS', JSON.stringify(bugsList));
};

const bugs = {
    getBugs: getBugs,
    add: add,
    edit: edit,
    delete: remove
}

export default bugs;
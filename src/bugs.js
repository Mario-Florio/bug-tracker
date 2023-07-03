import uniqid from 'uniqid';

let bugsList = [
    { id: uniqid(), title: "Bug 1" },
    { id: uniqid(), title: "Bug 2" },
    { id: uniqid(), title: "Bug 3" }
];

function getBugs() {
    return [...bugsList];
}

function add(bug) {
    bugsList.push(bug);
};

function edit(id, change) {
    return bugsList = bugsList.map(bug => {
        if (bug.id === id) {
            return change;
        } else return bug;
    });
};

function remove(id) {
    return bugsList = bugsList.filter(bug =>
        bug.id !== id);
};

const bugs = {
    getBugs: getBugs,
    add: add,
    edit: edit,
    delete: remove
}

export default bugs;
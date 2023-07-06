import uniqid from 'uniqid';

let bugsList = [
    { id: uniqid(), name: "Bug 1", description: "Lorem Ipsum.", dueDate: new Date(), status: 1, priority: 1 },
    { id: uniqid(), name: "Bug 2", description: "Lorem Ipsum.", dueDate: new Date(), status: 2, priority: 2 },
    { id: uniqid(), name: "Bug 3", description: "Lorem Ipsum.", dueDate: new Date(), status: 3, priority: 3 }
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
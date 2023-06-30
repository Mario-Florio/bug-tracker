import uniqid from 'uniqid';

let bugsList = {}

bugsList[uniqid()] = {
    title: 'Bug 1',
    description: 'Lorum Ipsum.',
    status: 'Not Started',
}

bugsList[uniqid()] = {
    title: 'Bug 2',
    description: 'Lorum Ipsum.',
    status: 'Not Started',
}

bugsList[uniqid()] = {
    title: 'Bug 3',
    description: 'Lorum Ipsum.',
    status: 'Not Started',
}

export default bugsList;
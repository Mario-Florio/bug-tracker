let storedProjects = JSON.parse(localStorage.getItem('PROJECTS'));

let projects = storedProjects || [];

export default projects;

const layout1 = [
    { i: "totalBugs_widget", x: 0, y: 0, w: 10, h: 15 },
    { i: "b", x: 10, y: 0, w: 10, h: 15 },
    { i: "bugsStatus_widget", x: 0, y: 10, w: 10, h: 22 }
]

const layout2 = [
    { i: "totalBugs_widget", x: 0, y: 0, w: 15, h: 15 },
    { i: "b", x: 15, y: 0, w: 15, h: 15 },
    { i: "bugsStatus_widget", x: 0, y: 15, w: 30, h: 15 }
]

const layout3 = [
    { i: "totalBugs_widget", x: 0, y: 0, w: 20, h: 15 },
    { i: "b", x: 20, y: 0, w: 20, h: 15 },
    { i: "bugsStatus_widget", x: 0, y: 15, w: 47, h: 15 }
]

const layout4 = [
    { i: "totalBugs_widget", x: 0, y: 0, w: 33, h: 15 },
    { i: "b", x: 33, y: 0, w: 33, h: 15 },
    { i: "bugsStatus_widget", x: 0, y: 15, w: 67, h: 15 }
]

const layout5 = [
    { i: "totalBugs_widget", x: 0, y: 0, w: 40, h: 15 },
    { i: "b", x: 40, y: 0, w: 40, h: 15 },
    { i: "bugsStatus_widget", x: 0, y: 15, w: 93, h: 15 }
]

const layouts = { lg: layout5, md: layout4, sm: layout3, xs: layout2, xxs: layout1 };

export default layouts;
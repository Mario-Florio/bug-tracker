
export default function convertStatus(status) {
    let statusStr
    switch(status) {
        case 1:
            statusStr = "Not Started"
            break;
        case 2:
            statusStr = "In Progress"
            break;
        case 3:
            statusStr = "Resolved"
            break;
        default:
            statusStr = null
            break;
    }
    return statusStr;
}

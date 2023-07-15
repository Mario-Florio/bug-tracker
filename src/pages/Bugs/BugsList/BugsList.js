import './BugsList.css';
import uniqid from 'uniqid';
import convertStatus from '../../../utils/global';
import Form from "./Form/Form";

function BugsList(props) {

    const { bugs, bugsList, setBugsList, setBug } = props;

    return(
        <div className="bugsList">
            <table className="bugsList__table">
                <thead style={{position: "sticky", top: "7.7rem", backgroundColor: "rgb(19, 19, 19)"}}>
                    <tr className="bugsList__tableRow">
                        <th style={{textAlign: "left", width: "146px"}}>Name</th>
                        <th>Due Date</th>
                        <th style={{textAlign: "right", width: "97px"}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bugsList.map(bug => <BugTicket key={uniqid()} bug={bug} setBug={setBug} bugsList={bugsList}/>)}
                </tbody>
            </table>
            <Form bugs={bugs} setBugsList={setBugsList}/>
        </div>
    );
}

export default BugsList;

function BugTicket(props) {

    const { bug, setBug, bugsList } = props;

    return(
        <tr onClick={() => setBug(bugsList[bugsList.indexOf(bug)])} className="bugsList__tableDataRow">
            <td style={{textAlign: "left", width: "146px"}}>{bug.name}</td>
            <td>{new Date(bug.dueDate).toLocaleDateString()}</td>
            <td 
                className={bug.status === 1 ? "bugs__notStarted" : bug.status === 2 ? "bugs__inProgress" : "bugs__resolved"}
            >
                {convertStatus(bug.status)}
            </td>
        </tr>
    );
}

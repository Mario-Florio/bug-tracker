import uniqid from "uniqid";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import BugsList from './BugsList';
import { act } from "react-dom/test-utils";

class Bugs {
    constructor() {
        this.bugsList = []
    }
    getBugs() {
        return [...this.bugsList];
    }
    add(bug) {
        this.bugsList.push(bug);
    }
    delete(id) {
        this.bugsList = this.bugsList.filter(bug => bug.id !== id); 
    }
    edit(id, editedBug) {
        this.bugsList = this.bugsList.map(bug => bug.id === id ? editedBug : bug);
    }
};

let bugs = new Bugs();

bugs.add({
    id: uniqid(), 
    name: "aksjhkjb",
    dueDate: new Date().toISOString().split('T')[0],
    description: "Lorem Ipsum",
    status: 1
});

describe('BugsList component', () => {

    it('should render bugsList', () => {
        let bugsList = bugs.getBugs();
        let bug = bugsList[0];

        function setBugsList() {
            bugsList = bugs.getBugs();
        }

        function setBug(newBug) {
            bug = newBug;
        };
    
        render(<BugsList bugs={bugs} bugsList={bugs.getBugs()} setBugsList={setBugsList} setBug={setBug}/>);
    
        expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('should render form', async () => {
        let bugsList = bugs.getBugs();
        let bug = bugsList[0];

        function setBugsList() {
            bugsList = bugs.getBugs();
        }

        function setBug(newBug) {
            bug = newBug;
        };

        const user = userEvent.setup();
    
        render(<BugsList bugs={bugs} bugsList={bugs.getBugs()} setBugsList={setBugsList} setBug={setBug}/>);

        const addBugButton = screen.getByRole("button");

        await act( async () => {
            await user.click(addBugButton);
        });
    
        expect(screen.getAllByRole("textbox")[0]).toBeInTheDocument();
    });

    it('should close form', async () => {
        let bugsList = bugs.getBugs();
        let bug = bugsList[0];

        function setBugsList() {
            bugsList = bugs.getBugs();
        }

        function setBug(newBug) {
            bug = newBug;
        };

        const user = userEvent.setup();
    
        render(<BugsList bugs={bugs} bugsList={bugs.getBugs()} setBugsList={setBugsList} setBug={setBug}/>);

        const addBugButton = screen.getByRole("button");

        await act( async () => {
            await user.click(addBugButton);
        });

        const cancelButton = screen.getByRole("button", { name: "Cancel" });

        await act( async () => {
            await user.click(cancelButton);
        });

        expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    });

});

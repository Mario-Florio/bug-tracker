import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Bugs from '../Bugs';
import bugs from '../../../bugs';

describe('BugsList component', () => {
    const bugsList = bugs.getBugs();

    it('bugsList render', () => {    
        render(<Bugs/>);
    
        bugsList.forEach(bug => expect(screen.getByRole("table").textContent).toMatch(bug.name));
    });
    it('Add Bug button renders form', async () => {
        render(<Bugs/>);
        const addBugButton = screen.getByRole("button", { name: "Add Bug" });

    
        userEvent.click(addBugButton);
    
        expect(screen.getByRole("form")).toBeInTheDocument();
    });
});

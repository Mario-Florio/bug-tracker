import uniqid from "uniqid";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Form from "./Form";
import { act } from "react-dom/test-utils";

const bugs = {
    add: () => { 
        // mock funciton:
        // test suite does not test bugs.add; 
        // simply needs a function to call in its place
    }
}

function setBugsList() {
    // mock function: ""
}

describe('bugsList form component', () => {

    it('should throw error if required inputs arent filled out', async () => {
        const user = userEvent.setup();
    
        render(<Form bugs={bugs} setBugsList={setBugsList}/>)

        const addBugButton = screen.getByRole("button");

        await act( async () => {
            await user.click(addBugButton);
        });

        const submitButton = screen.getByRole('button', { name: 'Submit' });

        await act( async () => {
            await user.click(submitButton);
        });

        expect(screen.getAllByText("This is required.")[0]).toBeInTheDocument();
    });
    
})

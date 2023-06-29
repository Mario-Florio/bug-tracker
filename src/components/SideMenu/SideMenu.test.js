import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('Side Menu component', () => {
    it('Dashboard Link Renders Dashboard', async () => {
        render(<App/>);
        const dashboardLink = screen.getByTestId("sideMenu__dashboardLink");
        const bugsLink = screen.getByTestId("sideMenu__bugsLink");
    
        await userEvent.click(bugsLink);
        await userEvent.click(dashboardLink);
    
        expect(screen.getByRole("heading").textContent).toMatch(/Dashboard/i);
    });
    it('Bugs Link Renders Bugs', async () => {
        render(<App/>);
        const bugsLink = screen.getByTestId("sideMenu__bugsLink");
    
        await userEvent.click(bugsLink);
    
        expect(screen.getByRole("heading").textContent).toMatch(/Bugs/i);
    });
})

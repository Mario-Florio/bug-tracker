import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('Navbar component', () => {
    it('Logo Link Renders Dashboard', () => {    
        render(<App/>);

        const logoLink = screen.getByRole("link", { name: "Bug Tracker" });
        const bugsLink = screen.getByTestId("navbar__bugsLink");
    
        userEvent.click(bugsLink);
        userEvent.click(logoLink);
    
        expect(screen.getByRole("heading").textContent).toMatch(/Dashboard/i);
    });
    it('Dashboard Link Renders Dashboard', () => {
        render(<App/>);
        const dashboardLink = screen.getByTestId("navbar__dashboardLink");
        const bugsLink = screen.getByTestId("navbar__bugsLink");
    
        userEvent.click(bugsLink);
        userEvent.click(dashboardLink);
    
        expect(screen.getByRole("heading").textContent).toMatch(/Dashboard/i);
    });
    it('Bugs Link Renders Bugs', async () => {
        render(<App/>);
        const bugsLink = screen.getByTestId("navbar__bugsLink");
    
        await userEvent.click(bugsLink);
    
        expect(screen.getByRole("heading").textContent).toMatch(/Bugs/i);
    });
})

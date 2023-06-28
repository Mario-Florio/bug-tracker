import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../../App';

describe('Navbar component', () => {
    it('Logo NavLink Renders Dashboard', async () => {    
        render(<App/>);

        const logoLink = screen.getByRole("link", { name: "Bug Tracker" });
        const bugsLink = screen.getByRole("link", { name: "Bugs" });
    
        await userEvent.click(bugsLink);
        await userEvent.click(logoLink);
    
        expect(screen.getByRole("heading").textContent).toMatch(/Dashboard/i);
    });
    it('Dashboard NavLink Renders Dashboard', async () => {
        render(<App/>);
        const dashboardLink = screen.getByRole("link", { name: "Dashboard" });
        const bugsLink = screen.getByRole("link", { name: "Bugs" });
    
        await userEvent.click(bugsLink);
        await userEvent.click(dashboardLink);
    
        expect(screen.getByRole("heading").textContent).toMatch(/Dashboard/i);
    });
    it('Bugs NavLink Renders Bugs', async () => {
        render(<App/>);
        const bugsLink = screen.getByRole("link", { name: "Bugs" });
    
        await userEvent.click(bugsLink);
    
        expect(screen.getByRole("heading").textContent).toMatch(/Bugs/i);
    });
})

import "./Navbar.css"
import { NavLink } from "react-router-dom";
import { useState } from "react";
import events from "../../utils/pub-sub";

function Navbar() {

    return(
        <nav className="navbar">
            <div style={{display: "flex", alignItems: "center"}}>
                <HamburgerMenu />
                <NavLink 
                    to="/"
                    className="navbar__logo"
                >
                    <div>Bug Tracker</div>
                </NavLink>
            </div>
            <ul className="navbar__linksWrapper">
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? 'navbar__link--active' : "navbar__link"}
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/bugs" 
                        className={({ isActive }) => isActive ? 'navbar__link--active' : "navbar__link"}
                    >
                        Bugs
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

function HamburgerMenu() {

    const [hamburgerIsActive, setHamburgerIsActive] = useState(false);

    const handleClick = () => {
        setHamburgerIsActive(hamburgerIsActive ? false : true);
        events.emit("Hamburger Menu Toggled", hamburgerIsActive);
    }

    return (
        <div 
            onClick={handleClick}
            className={hamburgerIsActive ? "navbar__hamburgerMenu--active": "navbar__hamburgerMenu"}
        >
            <div className="hamburgerMenu__bar1"></div>
            <div className="hamburgerMenu__bar2"></div>
            <div className="hamburgerMenu__bar3"></div>
        </div>
    );
}

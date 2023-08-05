import { useState, useEffect } from "react";
import "./SideMenu.css";
import { NavLink } from "react-router-dom";
import events from "../../utils/pub-sub";

function SideMenu() {

    const [sideMenuIsActive, setSideMenuIsActive] = useState(false);
    const [bugsListLength, setBugsListLength] = useState(null);

    useEffect(() => {
        events.on("Hamburger Menu Toggled", hamburgerIsActive => {
            setSideMenuIsActive(!hamburgerIsActive);
        });
        events.on("Bugs state set", bugsList => {
            if (bugsList.length === 0) setBugsListLength(null);
            setBugsListLength(bugsList.length);
        })
        events.on("Bugs state changed", bugsList => {
            if (bugsList.length === 0) setBugsListLength(null);
            setBugsListLength(bugsList.length);
        });

        return () => {
            events.off("Hamburger Menu Toggled");
            events.off("Bugs state changed");
            setSideMenuIsActive(false);
        }
    }, []);

    return(
        <div className={sideMenuIsActive ? "sideMenu--active" : "sideMenu"}>
            <ul className="sideMenu__linksWrapper">
                <li style={{width: "100%"}}>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? 'sideMenu__link--active' : "sideMenu__link"}
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li style={{width: "100%"}}>
                    <NavLink 
                        to="/bugs" 
                        className={({ isActive }) => isActive ? 'sideMenu__link--active' : "sideMenu__link"}
                        style={{display: "flex", justifyContent: "space-between"}}
                    >
                        <p style={{margin: "0"}}>Bugs</p>
                        <p style={{color: "grey", margin: "0"}}>{bugsListLength}</p>
                    </NavLink>
                </li>
                <li style={{width: "100%"}}>
                    <NavLink 
                        to="/projects" 
                        className={({ isActive }) => isActive ? 'sideMenu__link--active' : "sideMenu__link"}
                    >
                        Projects
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default SideMenu;
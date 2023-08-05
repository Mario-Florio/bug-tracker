import { useState, useEffect } from "react";
import "./SideMenu.css";
import { NavLink } from "react-router-dom";
import events from "../../utils/pub-sub";

function SideMenu() {

    const [sideMenuIsActive, setSideMenuIsActive] = useState(false);
    const [bugsListLength, setBugsListLength] = useState(null);
    const [projectsListLength, setProjectsListLength] = useState(null);

    useEffect(() => {
        events.on("Hamburger Menu Toggled", hamburgerIsActive => {
            setSideMenuIsActive(!hamburgerIsActive);
        });
        events.on("Bugs state set", bugsList => {
            if (bugsList.length === 0) setBugsListLength(null);
            setBugsListLength(bugsList.length);
        });
        events.on("Projects state set", projectsList => {
            if (projectsList.length === 0) setProjectsListLength(null);
            setProjectsListLength(projectsList.length);
        });

        return () => {
            events.off("Hamburger Menu Toggled");
            events.off("Bugs state changed");
            events.off("Projects state set");
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
                        style={{display: "flex", justifyContent: "space-between"}}
                    >
                        <p style={{margin: "0"}}>Projects</p>
                        <p style={{color: "grey", margin: "0"}}>{projectsListLength}</p>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default SideMenu;
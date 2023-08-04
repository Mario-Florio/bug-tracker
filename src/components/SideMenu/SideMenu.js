import { useState, useEffect } from "react";
import "./SideMenu.css";
import { NavLink } from "react-router-dom";
import events from "../../utils/pub-sub";

function SideMenu() {

    const [sideMenuIsActive, setSideMenuIsActive] = useState(false);

    useEffect(() => {
        events.on("Hamburger Menu Toggled", function(hamburgerIsActive) {
            setSideMenuIsActive(!hamburgerIsActive);
        });

        return () => {
            events.off("Hamburger Menu Toggled");
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
                    >
                        Bugs
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default SideMenu;
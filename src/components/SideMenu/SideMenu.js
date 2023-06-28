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
            <div className="sideMenu__linksWrapper">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? 'sideMenu__link--active' : "sideMenu__link"}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink 
                        to="/bugs" 
                        className={({ isActive }) => isActive ? 'sideMenu__link--active' : "sideMenu__link"}
                    >
                        Bugs
                    </NavLink>
            </div>
        </div>
    );
}

export default SideMenu;
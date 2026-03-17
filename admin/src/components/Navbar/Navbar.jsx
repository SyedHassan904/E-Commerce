import "./navbar.css"
import React, { useContext } from "react"
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import assets from "../../assets/assetsFile"
import adminContext from "../../context/adminContext";
export default function Navbar() {
    const { theme, toggleTheme } = useContext(adminContext);
    return (
        <>
            <nav id="adminNavbar">
                <div className="searchAndLogo">
                    <img src={assets.logo} alt="no img" />
                    <div className="searchField">
                        <SearchIcon />
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>

                <div className="navbarProfileSec">
                    <button className="iconCircle themeToggleBtn" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </button>
                    <div className="iconCircle notifyIconDiv">
                        <span className="navCircle">4</span>
                        <EmailIcon />
                    </div>
                    <div className="iconCircle notifyIconDiv">
                        <span className="navCircle">11</span>
                        <NotificationsIcon />
                    </div>
                    <div className="iconCircle notifyIconDiv">
                        <AccountCircleIcon />
                    </div>
                </div>
            </nav>
        </>
    )
}
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import '../styles/PublicNavBar.css';

const PublicNavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    return (
        <nav>
            <ul>
                <li className="dropdown">
                <span className="dropdown-button"><NavLink to="/">Home</NavLink></span>
                <div className="dropdown-content">
                    <NavLink to="/arrays">Visualize Arrays</NavLink>
                    <NavLink to="/graphs">Visualize Graphs</NavLink>
                </div>
                </li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/algorithm-list">Algorithm List</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/logout">Logout</NavLink></li>
            </ul>
        </nav>
    );
}

export default PublicNavBar;

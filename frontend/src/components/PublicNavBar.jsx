import { NavLink } from 'react-router-dom';
import '../styles/PublicNavBar.css';

const PublicNavBar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
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

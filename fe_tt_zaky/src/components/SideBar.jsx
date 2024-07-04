import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authServices';
import '../assets/css/SideBar.css'

const Sidebar = () => {

    let navigate = useNavigate()
    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    return (
        <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
            <li>
            <Link to="/products">Products</Link>
            </li>
            <li>
            <Link to="/categories">Categories</Link>
            </li>
            <li>
            <Link to="/orders">Orders</Link>
            </li>
            <li>
            <button onClick={handleLogout}>Logout</button>
            </li>
        </ul>
        </div>
    );
};

export default Sidebar;
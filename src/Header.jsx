import React, { useState } from "react";
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import ff from "./images/ff2.png"

const Header = ({ username }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('producerNumber');
        navigate('/login');
        window.location.reload(); // Optional: refresh to update UI
    };

    return (
        <header className="header">
          <div className="title">
            <h1><img src={ff} alt="" /></h1>
            
          </div>
            <nav className="navbar">
                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/consumer">Products</Link></li>
                    {!username ? (
                        <>
                            <li><Link to="/register">Signup</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    ) : (
                        <>
                            <li className="user-welcome" style={{ color: 'green', fontWeight: 'bold' }}>
                                {username}
                            </li>
                            <li>
                                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
                <div className="m-view">
                    {!username ? (
                        <div className="login2"><p><Link to="/login">Login</Link></p></div>
                    ) : (
                        <div className="login2">
                            <span style={{ color: 'green', fontWeight: 'bold', marginRight: '10px' }}>{username}</span>
                            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>Logout</button>
                        </div>
                    )}
                    <div className="hamburger" onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
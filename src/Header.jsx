import React, { useState } from "react";
import './Header.css';
import { Link } from "react-router-dom";
import ff from "./images/ff2.png"
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
          <div className="title">  <h1><img src={ff} alt="" /></h1></div>
            <nav className="navbar">
                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/consumer">Products</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/register">Signup</Link></li>
                    <div className="login">
                        <li><Link to="/login">Login</Link></li>
                    </div>
                </ul><div className="m-view">
                <div className="login2"><p><Link to="/login">Login</Link></p></div>
                <div className="hamburger" onClick={toggleMenu}>
                
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div></div>
            </nav>
        </header>
    );
};

export default Header;

import React, { useState } from "react";
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import ff from "./images/ff3.png"
import { IoIosAddCircleOutline } from "react-icons/io";

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
                    <li className="post-pc"><Link to="/producer"> <IoIosAddCircleOutline /> post</Link></li>
                    <li><Link to="/about">About</Link></li>
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
                   
                        <div className="login2"><p><Link to="/producer"><IoIosAddCircleOutline /> Post</Link></p></div>
                 
                          
                
                    
                   
                    
   
  
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
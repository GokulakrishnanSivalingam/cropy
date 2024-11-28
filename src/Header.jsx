import React from "react";
import './Header.css';
import {Link} from "react-router-dom"

const Header=()=>{

return(
    <header className="header">
        <h1>Farm Fresh Products</h1>
        <nav>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/contact">Contact</Link></li> 
                <li><Link to="/register">Signup</Link></li>
              <div className="login">  <li><Link to="/login">login</Link></li></div>
            </ul>
        </nav>
    </header>


);

};

export default Header;

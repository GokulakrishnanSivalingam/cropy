import React, { useState, useEffect } from "react";
import Header from './Header.jsx';
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

function App() {
  // Use state for username!
  const [username, setUsername] = useState(localStorage.getItem('username'));

  useEffect(() => {
    // Listen for changes to localStorage (e.g., login/logout in other tabs)
    const onStorage = () => setUsername(localStorage.getItem('username'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Optional: update username after login/logout in this tab
  useEffect(() => {
    const interval = setInterval(() => {
      const current = localStorage.getItem('username');
      if (current !== username) setUsername(current);
    }, 500);
    return () => clearInterval(interval);
  }, [username]);

  const handlescrolldown = () => {
    window.scrollBy({
      top: 520,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div>
        <Helmet>
          <meta property="og:title" content="AVFarm" />
          <meta property="og:description" content="This is a description of the AVFarm website." />
          <meta property="og:image" content="https://i.pinimg.com/736x/b9/3b/7b/b93b7bb7f7dda76f87391770e636cf7.jpg" />
          <meta property="og:url" content="https://avfarm.vercel.app" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@avfarm" />
        </Helmet>
        <Header username={username} />
        <div>
          <img src="https://i.pinimg.com/736x/b9/3b/7b/b93b7bb7f7dda76f873917f70e636cf7.jpg" className="images" />
        </div>
        <div className="product">
          <div className="contain">
          <h1>Fresh Produce, Straight from the Source to Your Doorstep</h1>
          <p>We aim to bridge the gap between farmers and consumers by providing an easy-to-use platform for direct sales</p>
      <center> <button onClick={handlescrolldown}>see more</button></center> 
      </div>  
        </div>
      </div>
      <div className="card-container">
      <div className="card-grid">
      
      <div className="card">
      <img src="data:image/jpeg;base64,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" alt="" />
        <h3> farming Posts</h3>
        <p> No middlemen, no inflated prices. Buy directly from farmers and support their work.
        </p>
       <Link to="/consumer"> <button>updates</button></Link>
      </div>
      <div className="card">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Q6_a4SY8s-oSZNphgn_Erc-2wfrj8t_Vjw&s" alt="" />
        <h3>Create posts</h3>
        
        <p> We partner with farmers to deliver the freshest fruits, vegetables, and other farm goods.</p> 
        <Link to="/producer"><button>post</button></Link>
      </div>
      <div className="card">
      <img src="https://i.pinimg.com/236x/d6/ed/4d/d6ed4d80b0ea2c7ab9c7ba78d7b7b818.jpg" alt="" />
        <h3>Convenient Online Shopping</h3>
        <p> Browse, select, and buy produce with just a few clicks, all from the comfort of your home.</p>
        <Link to="/instruction"><button>check</button></Link>
      </div></div>
      </div>

      <div className="about-container">
      <div className="aboutit">
       <center><h1>About us</h1></center> 
        <p>
        Welcome to Farm Fresh Products, your trusted platform for connecting farmers and consumers directly. We are committed to providing fresh, high-quality, and locally grown products straight from farms to your doorstep. Our mission is to empower farmers by giving them a platform to showcase their produce while ensuring consumers enjoy the freshness and transparency they deserve. From grains and vegetables to spices and organic products, we bring you a wide range of sustainably sourced items. By supporting Farm Fresh Products, you’re not only choosing healthier options but also contributing to a greener, more sustainable future for all.</p>
          <center><Link to="/about"><button>learn more</button></Link></center>
        </div>
      <div className="about-img"><center><img src="https://i.pinimg.com/originals/8d/8c/ac/8d8cacc7074eaeb9178a03b9cc4c788d.gif" alt="" /></center></div>
      </div>
      <div className="about-container1">
      
      <div className="about-img1"><center><img src="https://i.pinimg.com/originals/83/27/8e/83278ee8facf9002f7852fc645d201c1.gif" alt="" /></center></div><div className="aboutit1">
       <center><h1>Benifits</h1></center> 
        <p>
        <strong> 1.  </strong>  Fresh products sourced directly from farmers.
        <br /><br />
        <strong> 2.  </strong> Transparent pricing with no middlemen.
        <br /><br />
        <strong>3.  </strong>Easy-to-use platform for browsing and purchasing<br /><br />
        <strong> 4.  </strong>Eco-friendly and sustainable practices.<br /><br />
        <strong>5.  </strong>For example, natural oils like coconut oil or argan oil are packed with fatty acids and vitamins that nourish the skin and hair.</p>
          
        </div>
      </div>
      <Footer/>
      </>
    );
  }
  
  export default App;
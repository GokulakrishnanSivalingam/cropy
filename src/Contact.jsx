import React from "react";
import './Contact.css';
import Header from "./Header";
 
const Contact=()=>{
return(<>
<Header/>
<div className="box-contain">
    <div className="box">
        <div className="left">
        <img src="https://i.pinimg.com/736x/46/c6/8b/46c68b81433a5e40c0942b1b06059928.jpg" alt="" />
        </div>
    <div className="right">
        <center><h1>Contact us</h1></center>
        <div className="input">
            Full Name <br></br>
            <input className="input-box" type="text" name="name" id="name"/>
        </div>
        <div className="input">
            Email <br></br>
            <input className="input-box"  type="email" name="email" id="email"/>
        </div>
        <div className="input">
            Commend or Message <br></br>
           <textarea className="area" rows={5} cols={35}></textarea>
        </div>
        <div>
          <center> <input type="submit" value="Submit" className="submit" /></center> 
        </div>
    </div>
    </div>
    </div>
</>);
};

export default Contact;
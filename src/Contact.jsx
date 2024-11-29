import React, {useState} from "react";
import './Contact.css';
import Header from "./Header";
import emailjs from 'emailjs-com';
 
const Contact=()=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comments, setComments] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const templateParams = {
        name: name,
        email: email,
        comments: comments, // Add comments to the template params
      };
  
      emailjs
        .send(
          'service_xtgaszj', // Your EmailJS service ID
          'template_6g6uldb', // Your EmailJS template ID
          templateParams,
          'j3QhwtoRixTPgDidY' // Your EmailJS user ID or public key
        )
        .then(
          (response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Email sent successfully!');
            setName('');
            setEmail(''); // Reset email input
            setComments(''); // Reset comments input
          },
          (error) => {
            console.log('FAILED...', error);
            alert('Failed to send email. Please try again.');
          }
        );
    };
return(<>
<Header/>
<div className="box-contain">
    <form onSubmit={handleSubmit}>
    <div className="box">
        <div className="left">
        <img src="https://i.pinimg.com/736x/46/c6/8b/46c68b81433a5e40c0942b1b06059928.jpg" alt="" />
        </div>
    <div className="right">
        <center><h1>Contact us</h1></center>
        <div className="input">
            Full Name <br></br>
            <input className="input-box" type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" id="name"/>
        </div>
        <div className="input">
            Email <br></br>
            <input className="input-box"value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email"/>
        </div>
        <div className="input">
            Commend or Message <br></br>
           <textarea className="area" value={comments} onChange={(e)=>setComments(e.target.value)} rows={5} cols={35}></textarea>
        </div>
        <div>
          <center> <button type="submit"  className="submit" >Submit</button></center> 
        </div>
    </div>
    </div>
    </form>
    </div>
</>);
};

export default Contact;
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
        comments: comments, 
      };
  
      emailjs
        .send(
          'service_xtgaszj', 
          'template_6g6uldb',
          templateParams,
          'j3QhwtoRixTPgDidY'
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
<div className="box-contain">
    <form onSubmit={handleSubmit}>
    <div className="box">
       
    <div className="right">
        <center><h1>Contact us</h1></center>
        <div className="input">
            Full Name <br></br>
            <input className="input-box" type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name" id="name" required/>
        </div>
        <div className="input">
            Email <br></br>
            <input className="input-box"value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" required/>
        </div>
        <div className="input">
            Commend or Message <br></br>
           <textarea className="area" value={comments} onChange={(e)=>setComments(e.target.value)} rows={7} cols={35} required></textarea>
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
import { useState } from 'react'
import './auth.css'
import { useNavigate ,Link} from 'react-router-dom';
import { BiSolidUserRectangle } from "react-icons/bi";

function Register() {
  const [name, setName] = useState(""); // Add this line
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  const navigate = useNavigate();
  const [nameError, setNameError] = useState(''); // Add this line
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmpasswordError, setConfirmPasswordError] = useState('');
  const [message,setMessage]=useState('')
  
  async function Log(e) {
    e.preventDefault();

    let isValid = true;

    setNameError(''); // Add this line
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name) { // Add this block
      setNameError('Name is required');
      isValid = false;
    }
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }
    else if(!emailRegex.test(email))
    {
      setEmailError(`enter correct email "@gmail.com"`);
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }
    else if(password.length < 8)
    {
      setPasswordError('Password is very weak');
      isValid = false;
    }
    if (!confirmpassword) {
      setConfirmPasswordError('confirm Password is required');
      isValid = false;
    }
    if (password!=confirmpassword) {
      setConfirmPasswordError('Password is incorrect');
      isValid = false;
    }
    
    if (!isValid) {
      return; 
    }
    const resp = await fetch("http://localhost:5172/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, // Add this line
        email,
        password,
        confirmpassword
      }),
    })
    const data=await resp.json();
    if (resp.ok) {
      navigate('/login'); 
    } else {
      setMessage(data.message);
      console.log("Login failed");
    }
  }

  return (
    <>
      <div>
   <div className="cont-auth">   <fieldset className='field'>
    <center><div className="icon-auth"> <h1>< BiSolidUserRectangle /></h1></div> </center>  <br />
        <form >
          <label htmlFor="name">Name</label><br /> {/* Add this block */}
          <input 
            type="text" 
            name="name" 
            onChange={(e) => setName(e.target.value)} 
            required
          /><br />{nameError && <p className="error-text">{nameError}</p>}
          <label htmlFor="email">Email</label><br />
          <input 
            type="email" 
            name="email" 
            onChange={(e) => setEmail(e.target.value)} 
            required
          /><br />{emailError && <p className="error-text">{emailError}</p>}
          
          <label htmlFor="password">Password</label><br />
          <input 
            type="password" 
            name="password" 
            onChange={(e) => setPassword(e.target.value)} 
            required
          /><br />
               {passwordError && <p className="error-text">{passwordError}</p>} 
           <label htmlFor="password">confirm-Password</label><br />
          <input 
            type="password" 
            name="confirmpassword" 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            
          />   
           {confirmpasswordError && <p className="error-text">{confirmpasswordError}</p>} <br /><br />
     <center><div className="auth"><button type="submit" onClick={Log}>register</button></div></center>   
     <div className="servererror"><p>{message}</p>
     </div>
        </form>
        <p>I have account? <Link to="/login">login</Link></p>
        </fieldset></div>  <br />
      </div>
    </>
  )
}

export default Register
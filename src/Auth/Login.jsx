import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './auth.css';

import { FaUser } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message,setMessage]=useState('');
  const navigate = useNavigate();
  

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  async function Log(e) {
    e.preventDefault();

    let isValid = true;

  
    setEmailError('');
    setPasswordError('');

    
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!isValid) {
      return; 
    }

  
    const resp = await fetch('http://localhost:5172/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      
    });
    const data = await resp.json();

    if (resp.ok) {
      localStorage.setItem('username', data.name); // <-- Save username
      navigate('/'); 
      window.location.reload(); // Optional: force header to update
    } else {
      console.log('Login failed');
      setMessage(data.message);
    }
  }
  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    const userInfo = response.credential; 
    console.log(userInfo);
    localStorage.setItem('username', response.name); // or response.data.name
    navigate('/');
    
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <>
      <div>
       
        <div className="cont-auth">
        <fieldset className='field'>
     <center>  <div className="icon-auth"><h1><FaUser/></h1></div> </center>  <br />
          <form>
            <label htmlFor="email">Email</label><br />
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              
            /><br />
         
            {emailError && <p className="error-text">{emailError}</p>}
            
            <label htmlFor="password">Password</label><br />
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)} 
            /><br />
          
            {passwordError && <p className="error-text">{passwordError}</p>}

            <div className="check">
              <input type="checkbox" />
              <span>remember me</span>
            </div>
            <br />
            <center>
             <div className="auth"> <button type="submit" onClick={Log}>Login</button></div>
             <GoogleOAuthProvider clientId="848508527235-cbrsoqi49lr88rfiivj0nuc2fhrgugmm.apps.googleusercontent.com">
      <div>
        <p>or</p>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          isSigedIn={true}
          cookiePolicy={'single_host_origin '}
        />
      </div>
    </GoogleOAuthProvider>
            </center>
        <div className="servererror"> <p>{message}</p></div>   
          </form>
          <br />
          <p>do not have any account? <Link to="/register">register</Link></p>
        </fieldset></div>
        <br />
      </div>
    </>
  );
}

export default Login;

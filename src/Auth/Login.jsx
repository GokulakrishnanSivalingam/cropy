import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';
import { FaUser } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For button loading
  const navigate = useNavigate();

  async function Log(e) {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setMessage('');
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true); // Start loading

    try {
      const resp = await fetch('https://cropy.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();

      if (resp.ok) {
        localStorage.setItem('username', data.name);
        navigate('/');
        window.location.reload();
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setMessage("Server is down. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  }

  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    const userInfo = response.credential;
    localStorage.setItem('username', response.name);
    navigate('/');
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <div className="cont-auth">
      <div className="field">
        <center><div className="icon-auth"><h1><FaUser /></h1></div></center><br />
        <form>
          <label htmlFor="email">Email</label><br />
          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} /><br />
          {emailError && <p className="error-text">{emailError}</p>}

          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} /><br />
          {passwordError && <p className="error-text">{passwordError}</p>}

          <div className="check">
            <input type="checkbox" />
            <span>remember me</span>
          </div><br />

          <center>
            <div className="auth">
              <button type="submit" onClick={Log} disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </center>

          <div className="servererror"><p>{message}</p></div>
        </form>
        <br />
        <p>Do not have any account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;

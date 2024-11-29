
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from "../App.jsx";
import Login from "../Auth/Login.jsx";
import Register from "../Auth/Register.jsx";
import Contact from "../Contact.jsx"
import Producer from '../Producer.jsx';
import Consumer from '../Consumer.jsx';
import About from '../About.jsx';
function Routing() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/producer" element={<Producer/>} />
        <Route path="/consumer" element={<Consumer/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  );
}
export default Routing;
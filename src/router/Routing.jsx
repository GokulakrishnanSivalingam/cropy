
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from "../App.jsx";
import Login from "../Auth/Login.jsx";
import Register from "../Auth/Register.jsx";
import Contact from "../Contact.jsx"
import Producer from '../Producer.jsx';
import Consumer from '../Consumer.jsx';
import About from '../About.jsx';
import Instruction from '../Intruction.jsx';
function Routing() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Consumer/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/producer" element={<Producer/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/instruction" element={<Instruction/>} />

      </Routes>
    </Router>
  );
}
export default Routing;
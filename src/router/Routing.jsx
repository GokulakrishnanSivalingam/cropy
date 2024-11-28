
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from "../App.jsx";
import Login from "../Auth/Login.jsx";
import Register from "../Auth/Register.jsx";
function Routing() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
}
export default Routing;
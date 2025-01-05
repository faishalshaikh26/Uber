import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from './pages/home'; 
import UserSignup from './pages/userSignup'; // Update this line
import UserLogin from './pages/userLogin'; // Update this line
import CaptainSignup from './pages/captainSignup'; // Update this line
import CaptainLogin from './pages/captainLogin'; // Update this line

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} /> {/* Update this line */}
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/CaptainLogin" element={<CaptainLogin />} /> {/* Update this line */}
        <Route path="/CaptainSignup" element={<CaptainSignup />} /> {/* Update this line */}
      </Routes>
    </div>
  );
}

export default App;

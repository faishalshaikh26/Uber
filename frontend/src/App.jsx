import React from "react";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div >
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<login />} />
        <Route path="/signup" element={<userSignup />} />
        <Route path="/captain-Signup" element={<captainSignup />} />
        <Route path="/captain-Login" element={<captainLogin />} />

      </Route>

    </div>
  );
}

export default App;
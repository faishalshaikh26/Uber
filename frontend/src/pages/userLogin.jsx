import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserSignup from "./userSignup";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submithandler = (e) => {
    e.preventDefault();
    setUserData({ 
      email: email, 
      password:password 
    });
    
    console.log(userData);
    setEmail("");
    setPassword("");
  };


  return (
    <div className="p-7 flex flex-col justify-between h-screen ">
       <div>
        <img className="w-16 mb-10" 
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
       
        <form onSubmit={(e)=>{
          submithandler(e);
        }} >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input 
          value={email}
          onChange={(e) => 
            setEmail(e.target.value)
          }
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          required type="email" 
          placeholder="email@example.com"/>

          <h3 className="text-lg font-medium mb-2">Password</h3>

          <input 
          value={password}
          onChange={(e) => 
            setPassword(e.target.value)
          }
          className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          required type="password" placeholder="password"/>

          <button 
          className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
          type="submit">Login</button>

      </form>
      <p className="text-center text-sm">Don't have an account? <Link to='/signup' className="text-blue-600">Create new Account</Link></p>

       </div>
      
        <div>
          <Link to="/captainLogin" 
          className="bg-green-600 flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Sign in as Captain
          </Link>
        </div>
    </div>
  );
};  

export default UserLogin;
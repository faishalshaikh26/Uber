import React from "react";

const userLogin = () => {
  return (
    <div className="">
      <form action="">
        <h3>What's your email</h3>
        <input required type="email" placeholder="email@example.com"/>
        <h3>Password</h3>
        <input required type="password" placeholder="password"/>
        <button type="submit">Login</button>
      </form>
      
    </div>
  );
};  

export default userLogin;
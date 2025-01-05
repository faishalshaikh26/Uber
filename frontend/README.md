# Uber Clone Frontend

This project is a frontend for an Uber clone application. It includes user and captain signup and login forms. Below are the steps to create these forms and explanations for the code.

## Prerequisites

- Node.js
- npm 
- React

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

## Project Structure

- `src/pages/UserSignup.jsx`: User signup form
- `src/pages/UserLogin.jsx`: User login form
- `src/pages/CaptainSignup.jsx`: Captain signup form
- `src/pages/CaptainLogin.jsx`: Captain login form
- `src/pages/Home.jsx`: Home page
- `src/context/UserContext.jsx`: User context for managing user state
- `src/App.jsx`: Main application component

## User Signup

The `UserSignup.jsx` file contains the form for user registration. It includes fields for the user's name, email, and password. The form uses React state to manage input values and handle form submission.

```jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserLogin from "./userLogin";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");

  const validatePassword = () => {
    if (password === confirmPassword) {
      setError("");
      return true;
    } else {
      setError("Passwords do not match.");
      return false;
    }
  };

  const submithandler = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      setUserData({
        fullName: {
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password,
        confirmPassword: confirmPassword
      });

      console.log(userData);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen ">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        <form
          onSubmit={(e) => {
            submithandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
          <div className="flex gap-3">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Mohammad"
            />

            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Faishal"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Password</h3>

          <div className="flex gap-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              type="password"
              placeholder="password"
            />

            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="submit"
          >
            Sign Up
          </button>

        </form>
        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] leading-tight">
          By proceeding, you consent to get calls, Whatsapp or SMS messages,
          including by automated means from Uber and its affiliates to the
          number provided
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
```

## User Login

The `UserLogin.jsx` file contains the form for user login. It includes fields for the user's email and password. The form uses React state to manage input values and handle form submission.

```jsx
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
```

## Captain Signup

The `CaptainSignup.jsx` file contains the form for captain registration. It includes fields for the captain's first name, last name, email, and password. The form uses React state to manage input values and handle form submission.

```jsx
// ...existing code...
const submithandler = (e) => {
    e.preventDefault();
    if (validatePassword()) {
        setUserData({
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }
};
// ...existing code...
```

## Captain Login

The `CaptainLogin.jsx` file contains the form for captain login. It includes fields for the captain's email and password. The form uses React state to manage input values and handle form submission.

```jsx
// ...existing code...
const submithandler = (e) => {
    e.preventDefault();
    setCaptainData({ 
        email: email, 
        password: password 
    });

    setEmail("");
    setPassword("");
};
// ...existing code...
```


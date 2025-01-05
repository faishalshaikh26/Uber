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
import React from "react";
import { Link } from "react-router-dom";

const home = () => {
  return (
    <div>
      <div className='bg-cover bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8  w-full flex justify-between flex-col bg-red-400'>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white py-5 px-5'>
            <h2 className='text-3xl font-bold'>Get started with Uber</h2>
            <link to='/login' className='flex item-center justify-center w-full bg-black text-white py-3 rounded mt-4'>continue</link>
        </div>

      </div>
    </div>
  );
};  

export default home;
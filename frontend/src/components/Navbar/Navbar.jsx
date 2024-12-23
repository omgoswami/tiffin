// src/components/Navbar/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkSession } from "../../utils/session";


const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const verifySession = async () => {
      const {loggedIn, username} = await checkSession();
      setLoggedIn(loggedIn);
      setUsername(username);
    };
    verifySession();
  }, []);
  
  return (
    <div className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Food Marketplace</h1>
      <nav className="flex space-x-4">
        <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
        <Link to="/explore" className="text-gray-600 hover:text-gray-800">Explore</Link>
        {loggedIn && (
          <>
            <Link to="/messages" className="text-gray-600 hover:text-gray-800">Messages</Link>
            <Link to="/orders" className="text-gray-600 hover:text-gray-800">Orders</Link>
            <Link to={`/profile/${username}`} className="text-gray-600 hover:text-gray-800">Profile</Link>
          </>
        )}
        <div className="relative">
          <button className="text-gray-600 hover:text-gray-800">
            🔔
          </button>
          {/* Notification badge */}
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

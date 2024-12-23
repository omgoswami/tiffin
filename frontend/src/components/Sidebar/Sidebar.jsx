import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../../utils/session";

const Sidebar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const verifySession = async () => {
      const {loggedIn, username} = await checkSession();
      setLoggedIn(loggedIn);
    };
    verifySession();
  }, []);

  /*useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/users/check_session");
        const data = await response.json();
        setLoggedIn(data.loggedIn);
      } catch (error) {
        console.error("Error checking session:", error);
        setLoggedIn(false);
      }
    };
    checkSession();
  }, []);*/


  const handleLogout = async () => {
    try {
      const response = await fetch("/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        setLoggedIn(false);
        navigate(result.redirect);
      }
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  
  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-bold">Menu</div>
      <nav className="flex flex-col space-y-2 p-4">
        <a href="/" className="hover:bg-gray-700 p-2 rounded">Home</a>
        <a href="/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</a>
        {loggedIn ? (<button onClick={handleLogout} className="hover:bg-gray-700 p-2 rounded text-left">Logout</button>) 
                  : (<button> <a href="/login" className="hover:bg-gray-700 p-2 rounded">Login</a></button>)}
      </nav>
    </div>
  );
};

export default Sidebar;

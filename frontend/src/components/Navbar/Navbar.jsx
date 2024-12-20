import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Food Marketplace</h1>
      <nav className="flex space-x-4">
        <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
        <a href="/dashboard" className="text-gray-600 hover:text-gray-800">Dashboard</a>
        <a href="/login" className="text-gray-600 hover:text-gray-800">Login</a>
      </nav>
    </div>
  );
};

export default Navbar;

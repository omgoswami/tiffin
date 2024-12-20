import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-bold">Menu</div>
      <nav className="flex flex-col space-y-2 p-4">
        <a href="/" className="hover:bg-gray-700 p-2 rounded">Home</a>
        <a href="/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</a>
        <a href="/login" className="hover:bg-gray-700 p-2 rounded">Login</a>
      </nav>
    </div>
  );
};

export default Sidebar;

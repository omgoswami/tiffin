// src/pages/Home/HomePage.jsx
import React from "react";

const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Food Marketplace</h1>
      <p className="text-lg text-gray-600 mt-2">Find and share amazing meals nearby!</p>
      <div className="mt-6 flex justify-center space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Explore Cooks
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Browse Food
        </button>
      </div>
    </div>
  );
};

export default HomePage;

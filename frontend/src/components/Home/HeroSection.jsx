// src/components/Home/HeroSection.jsx
import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-gray-100 p-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Discover Delicious Homemade Food</h1>
      <p className="text-lg text-gray-600 mt-2">Find cooks near you or become a cook today!</p>
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search by Cuisine, Location, Price..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
        <div className="mt-4 flex justify-center gap-4">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Explore Cooks
          </button>
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Become a Cook
          </button>
          <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            Browse Food
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

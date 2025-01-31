// src/components/Explore/ExploreFilters.jsx
import React from "react";

const ExploreFilters = () => {
  return (
    <div className="flex gap-4 my-4 justify-center">
      <input
        type="text"
        placeholder="Location"
        className="border rounded px-4 py-2"
      />
      <input
        type="text"
        placeholder="Cuisine"
        className="border rounded px-4 py-2"
      />
      <input
        type="text"
        placeholder="Price Range"
        className="border rounded px-4 py-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Search
      </button>
    </div>
  );
};

export default ExploreFilters;

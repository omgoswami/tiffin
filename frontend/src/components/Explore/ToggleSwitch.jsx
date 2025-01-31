// src/components/Explore/ToggleSwitch.jsx
import React, { useState } from "react";

const ToggleSwitch = ({ onChange }) => {
  const [activeTab, setActiveTab] = useState("Food");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onChange(tab);
  };

  return (
    <div className="flex justify-center gap-4 my-4">
      <button
        className={`px-6 py-2 rounded-lg ${
          activeTab === "Food" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => handleTabChange("Food")}
      >
        Explore Food
      </button>
      <button
        className={`px-6 py-2 rounded-lg ${
          activeTab === "Cooks" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => handleTabChange("Cooks")}
      >
        Explore Cooks
      </button>
    </div>
  );
};

export default ToggleSwitch;

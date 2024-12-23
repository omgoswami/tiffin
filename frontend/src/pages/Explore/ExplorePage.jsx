// src/pages/Explore/ExplorePage.jsx
import React, { useState } from "react";
import ToggleSwitch from "../../components/Explore/ToggleSwitch";
import ExploreFilters from "../../components/Explore/ExploreFilters";
import FeaturedGrid from "../../components/Home/FeaturedGrid";

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState("Food");

  const foodItems = [
    { image: "/assets/dish1.jpg", name: "Spaghetti Carbonara", description: "Delicious homemade Italian food." },
    { image: "/assets/dish2.jpg", name: "Tacos Al Pastor", description: "Authentic Mexican tacos with fresh salsa." },
  ];

  const cookItems = [
    { image: "/assets/cook1.jpg", name: "Chef Mario", description: "Specializes in Italian cuisine." },
    { image: "/assets/cook2.jpg", name: "Chef Rosa", description: "Expert in authentic Mexican dishes." },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center">Explore</h1>
      <ToggleSwitch onChange={setActiveTab} />
      <ExploreFilters />
      <FeaturedGrid items={activeTab === "Food" ? foodItems : cookItems} />
    </div>
  );
};

export default ExplorePage;

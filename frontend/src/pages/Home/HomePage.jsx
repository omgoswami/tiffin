// src/pages/Home/HomePage.jsx
import React from "react";
import HeroSection from "../../components/Home/HeroSection";
import FeaturedGrid from "../../components/Home/FeaturedGrid";

const HomePage = () => {
  const featuredItems = [
    { image: "/assets/dish1.jpg", name: "Spaghetti Carbonara", description: "Delicious homemade Italian food." },
    { image: "/assets/dish2.jpg", name: "Tacos Al Pastor", description: "Authentic Mexican tacos with fresh salsa." },
    { image: "/assets/dish3.jpg", name: "Sushi Platter", description: "Fresh and tasty sushi rolls." },
  ];

  return (
    <div>
      <HeroSection />
      <h2 className="text-2xl font-bold text-gray-800 p-8">Featured Cooks & Foods</h2>
      <FeaturedGrid items={featuredItems} />
    </div>
  );
};

export default HomePage;

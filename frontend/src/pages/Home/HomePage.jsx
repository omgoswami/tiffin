// src/pages/Home/HomePage.jsx
import React, { useState, useEffect } from "react";
import HeroSection from "../../components/Home/HeroSection";
import FeaturedGrid from "../../components/Home/FeaturedGrid";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const fetchSessionStatus = async () => {
      try {
        const { loggedIn } = await checkUserSession();
        setIsLoggedIn(loggedIn);
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLoggedIn(false);
      }
    };

    fetchSessionStatus();
  }, []);

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
      {!isLoggedIn && (
        <div className="text-center mt-8">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => (window.location.href = "/signup")}
          >
            Create User
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;

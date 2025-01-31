import React, { useState } from "react";
import FeaturedGrid from "../../components/Home/FeaturedGrid";

const MyListingsPage = () => {
  const [listings, setListings] = useState([
    {
      image: "/assets/dish1.jpg",
      name: "Grilled Cheese",
      description: "Homemade with love!",
      startTime: "17:00",
      endTime: "20:00",
    },
    {
      image: "/assets/dish2.jpg",
      name: "Tacos",
      description: "Spicy and fresh!",
      startTime: "18:00",
      endTime: "21:00",
    },
  ]);

  const handleArchive = (index) => {
    const updatedListings = listings.filter((_, i) => i !== index);
    setListings(updatedListings);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold p-8">My Listings</h1>
      <FeaturedGrid items={listings} onArchive={handleArchive} />
    </div>
  );
};

export default MyListingsPage;

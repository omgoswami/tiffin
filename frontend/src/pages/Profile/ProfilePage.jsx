import React, { useState } from "react";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import FeaturedGrid from "../../components/Home/FeaturedGrid";

const ProfilePage = () => {
  const [listings, setListings] = useState([
    { image: "/assets/dish1.jpg", name: "Grilled Cheese", description: "Leftovers from dinner!", endTime: "20:00" },
    { image: "/assets/dish2.jpg", name: "Tacos", description: "Fresh and spicy!", endTime: "21:00" },
  ]);

  const handleArchive = (index) => {
    const updatedListings = listings.filter((_, i) => i !== index);
    setListings(updatedListings);
  };

  return (
    <div className="p-8">
      <div className="flex items-center space-x-4">
        <img src="/assets/cook1.jpg" alt="Profile" className="w-24 h-24 rounded-full object-cover" />
        <div>
          <h1 className="text-2xl font-bold">Chef Mario</h1>
          <p className="text-gray-600">Specializes in Italian and Mediterranean cuisine.</p>
        </div>
      </div>

      <ProfileTabs
        reviews={[
          { reviewer: "Alice", rating: 5, comment: "Amazing pasta!" },
          { reviewer: "Bob", rating: 4, comment: "Loved the tiramisu." },
        ]}
      />

      <h2 className="text-xl font-bold mt-6">My Listings</h2>
      <button
        onClick={() => window.location.href = "/add-listing"}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Post New Listing
      </button>
      <FeaturedGrid items={listings} onArchive={handleArchive} />
    </div>
  );
};

export default ProfilePage;

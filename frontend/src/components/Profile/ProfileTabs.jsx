// src/components/Profile/ProfileTabs.jsx
import React, { useState } from "react";

const ProfileTabs = ({ reviews }) => {
  const [activeTab, setActiveTab] = useState("Reviews");

  return (
    <div>
      <div className="flex space-x-4 mt-6">
        <button
          className={`px-6 py-2 rounded-lg ${activeTab === "Reviews" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setActiveTab("Reviews")}
        >
          Reviews
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${activeTab === "Order History" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setActiveTab("Order History")}
        >
          Order History
        </button>
      </div>

      {activeTab === "Reviews" && (
        <div className="mt-4">
          {reviews.map((review, index) => (
            <div key={index} className="border-b py-2">
              <p className="font-bold">{review.reviewer}</p>
              <p className="text-sm text-gray-600">{review.comment}</p>
              <p>Rating: {review.rating} / 5</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Order History" && (
        <div className="mt-4">
          <p>No orders placed yet.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileTabs;

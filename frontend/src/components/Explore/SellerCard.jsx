import React from "react";

const SellerCard = ({ id, name, specialty, rating, image }) => {
return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md">
        <img
            src={image || "/assets/default-cook.jpg"} // Fallback for missing images
        alt={name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{specialty}</p>
      <p className="text-green-700 font-bold">Rating: {rating}</p>
      <button
        onClick={() => (window.location.href = `/profile/${id}`)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Profile
      </button>
    </div>
  );
};

export default SellerCard;

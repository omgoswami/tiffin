// src/pages/Listings/PostListingPage.jsx
import React, { useState } from "react";

const PostListingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    cuisine: "",
    image: null,
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add backend functionality to post the listing
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Post a Temporary Listing</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Dish Name"
          className="w-full border rounded px-4 py-2"
          value={formData.name}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border rounded px-4 py-2"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          className="w-full border rounded px-4 py-2"
          value={formData.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine (e.g., Italian, Mexican)"
          className="w-full border rounded px-4 py-2"
          value={formData.cuisine}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="image"
          className="w-full border rounded px-4 py-2"
          onChange={handleImageUpload}
        />
        <div className="flex gap-4">
          <input
            type="time"
            name="startTime"
            placeholder="Start Time"
            className="border rounded px-4 py-2"
            value={formData.startTime}
            onChange={handleInputChange}
          />
          <input
            type="time"
            name="endTime"
            placeholder="End Time"
            className="border rounded px-4 py-2"
            value={formData.endTime}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default PostListingPage;

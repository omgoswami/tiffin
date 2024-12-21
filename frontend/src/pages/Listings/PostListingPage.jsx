// src/pages/Listings/PostListingPage.jsx
import React, { useState } from "react";

const PostListingPage = () => {
  // TODO: this is not super cleanly done, so clean it up later
  /*const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    startTime: "",
    endTime: "",
  });*/ 
  
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const formData = new FormData();
  formData.append('dishName', dishName);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('startTime', startTime);
  formData.append('endTime', endTime);

  const [message, setMessage] = useState('');

  /*const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add backend functionality to post the listing
    try {
      const response = await fetch('/sellers/additem', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Successfully added item to database.");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error while item was being added:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Post a Temporary Listing</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          id="dishName"
          type="text"
          placeholder="Dish Name"
          className="w-full border rounded px-4 py-2"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
        />
        <textarea
          id="description"
          type="text"
          placeholder="Description"
          className="w-full border rounded px-4 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          id="price"
          type="text"
          placeholder="Price"
          className="w-full border rounded px-4 py-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="flex gap-4">
          <input
            id="startTime"
            type="time"
            placeholder="Start Time"
            className="border rounded px-4 py-2"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            id="endTime"
            type="time"
            placeholder="End Time"
            className="border rounded px-4 py-2"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Listing
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default PostListingPage;

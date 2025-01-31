import React, { useState } from "react";
import { createUser } from "../../api";
import { useNavigate } from "react-router-dom";


const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    is_buyer: false,
    is_seller: false,
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
    });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await createUser(formData);
        // setMessage("User created successfully!");
        navigate(`/profile/${formData.username}`);
        setFormData({ username: "", email: "", password: "", is_buyer: false, is_seller: false });
    } catch (error) {
        console.error("Error creating user:", error);
        setMessage("An error occurred while creating the user.");
    }
    };

  return (
    <div className="signup-page">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Sign Up</h1>
      <form className="max-w-lg mx-auto p-4 bg-white rounded shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="is_buyer"
              checked={formData.is_buyer}
              onChange={handleChange}
              className="mr-2"
            />
            I am a Buyer
          </label>
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="is_seller"
              checked={formData.is_seller}
              onChange={handleChange}
              className="mr-2"
            />
            I am a Seller
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>

        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default SignupPage;

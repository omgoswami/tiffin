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
      navigate(`/profile/${formData.username}`);
      setFormData({ username: "", email: "", password: "", is_buyer: true, is_seller: true });
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("An error occurred while creating the user.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        <div className="pt-6">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </div>
        {message && <p className="text-red-500 mt-2">{message}</p>}
        <button
          type="button"
          className="mt-4 w-full text-gray-700 rounded hover:underline"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;

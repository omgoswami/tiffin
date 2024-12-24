import React, { useState } from "react";
import { login } from "../../api"; // Assuming this function sends a login request to the backend
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Prepare form data
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("/users/login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/profile/${data.username}`);
      } else {
        setMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred while trying to log in.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-100"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
        <button
          type="button"
          className="mt-4 w-full text-gray-700 rounded hover:underline"
          onClick={() => navigate("/signup")}
        >
          Haven't used Tiffin yet? Create Account
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

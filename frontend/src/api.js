import axios from "axios"

export const getUsers = async () => {
    return await axios.get(`/users/getall`);
};

export const login = async (email, password) => {
    return await axios.get(
        "/users/login", 
        { email, password },
    );
};

export const checkUserSession = async () => {
    try {
      const response = await fetch("/check_session", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent with the request
      });
  
      if (!response.ok) {
        throw new Error("Failed to check session");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error in checkUserSession:", error);
      return { loggedIn: false };
    }
};

export const createUser = async (userData) => {
    try {
      const response = await fetch("/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Unknown error" };
      }
      return response;
    } catch (error) {
      console.error("Error in createUser:", error);
      return { success: false, message: "Network error" };
    }
};
  
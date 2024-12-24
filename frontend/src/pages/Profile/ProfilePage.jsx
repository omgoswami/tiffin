import React, { useState, useEffect } from "react";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import FeaturedGrid from "../../components/Home/FeaturedGrid";
import { useParams, useNavigate } from "react-router-dom";
import { checkSession } from "../../utils/session";

const ProfilePage = () => {
  const user = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchSellerItems = async () => {
      try {
        const response = await fetch(`/sellers/items`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerItems();
  }, []);

  useEffect(() => {
    const verifySession = async () => {
      const { loggedIn } = await checkSession();
      setLoggedIn(loggedIn);
    };
    verifySession();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        setLoggedIn(false);
        navigate(result.redirect);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleArchive = (index) => {
    const updatedListings = listings.filter((_, i) => i !== index);
    setListings(updatedListings);
  };

  return (
    <div className="p-8">
      <div className="flex items-center space-x-4">
        <img src="/assets/cook1.jpg" alt="Profile" className="w-24 h-24 rounded-full object-cover" />
        <div>
          <h1 className="text-2xl font-bold">Chef {user.username}</h1>
          <p className="text-gray-600">Specializes in Italian and Mediterranean cuisine.</p>
        </div>
      </div>

      <ProfileTabs
        reviews={[
          { reviewer: "Alice", rating: 5, comment: "Amazing pasta!" },
          { reviewer: "Bob", rating: 4, comment: "Loved the tiramisu." },
        ]}
      />
      <p></p>
      <button
        onClick={() => window.location.href = "/add-listing"}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Post New Listing
      </button>

      <h2 className="text-xl font-bold mt-6">My Listings</h2>
      
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">{user.username}'s Items</h1>
        {items.length === 0 ? (
          <p>No items found for this seller.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-green-700 font-bold">${item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {loggedIn && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default ProfilePage;

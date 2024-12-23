import React from "react";
import { useParams } from "react-router-dom";

const FoodDetails = () => {
  const { id } = useParams();

  const foodItems = [
    { image: "/assets/dish1.jpg", name: "Spaghetti Carbonara", description: "Delicious homemade Italian food.", price: "$12.00" },
    { image: "/assets/dish2.jpg", name: "Tacos Al Pastor", description: "Authentic Mexican tacos with fresh salsa.", price: "$8.00" },
  ];

  const food = foodItems[id]; // Retrieve the specific food item

  return (
    <div className="p-8">
      <img src={food.image} alt={food.name} className="w-full h-64 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{food.name}</h1>
      <p className="text-gray-600 mt-2">{food.description}</p>
      <p className="mt-4">Price: {food.price}</p>
      <div className="mt-4 flex gap-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Place Order
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Message Cook
        </button>
      </div>
    </div>
  );
};

export default FoodDetails;

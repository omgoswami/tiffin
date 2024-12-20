// src/pages/Orders/OrdersPage.jsx
import React from "react";

const OrdersPage = () => {
  const orders = [
    { id: 1, item: "Grilled Cheese", cook: "Chef Mario", status: "Ready for Pickup" },
    { id: 2, item: "Tacos", cook: "Chef Rosa", status: "Completed" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow rounded-lg p-4 hover:bg-gray-100"
          >
            <h3 className="font-bold text-lg">{order.item}</h3>
            <p className="text-sm text-gray-600">Cook: {order.cook}</p>
            <p className="text-sm text-green-500">Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

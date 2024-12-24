import React, { useState, useEffect } from "react";

const OrdersPage = () => {
  const [placedOrders, setPlacedOrders] = useState([]);
  const [sellingOrders, setSellingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const placedResponse = await fetch("/orders/buyer");
        const sellingResponse = await fetch("/orders/seller");
        console.log(placedResponse);
        console.log(sellingResponse);

        if (!placedResponse.ok || !sellingResponse.ok) {
          throw new Error("Failed to fetch orders");
        }

        const placedData = await placedResponse.json();
        const sellingData = await sellingResponse.json();

        setPlacedOrders(placedData.message ? [] : placedData); // Handle empty orders
        setSellingOrders(sellingData.message ? [] : sellingData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {/* Placed Orders Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Orders You Placed</h2>
        {placedOrders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <div className="space-y-4">
            {placedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow rounded-lg p-4 hover:bg-gray-100"
              >
                <h3 className="font-bold text-lg">Order #{order.id}</h3>
                <p className="text-sm text-gray-600">Seller: {order.seller_id}</p>
                <p className="text-sm text-green-500">
                  Total Price: ${order.total_price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Selling Orders Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Orders On Your Items</h2>
        {sellingOrders.length === 0 ? (
          <p>No orders on your items yet.</p>
        ) : (
          <div className="space-y-4">
            {sellingOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow rounded-lg p-4 hover:bg-gray-100"
              >
                <h3 className="font-bold text-lg">Order #{order.id}</h3>
                <p className="text-sm text-gray-600">Buyer: {order.buyer_id}</p>
                <p className="text-sm text-green-500">
                  Total Price: ${order.total_price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default OrdersPage;

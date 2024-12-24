import React, { useState, useEffect } from "react";
import axios from "axios";

const SellerCard = ({ id, name, specialty, rating, image }) => {
  // getting and displaying items on card
  const [items, setItems] = useState([]);
  const [err, setError] = useState(null);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`sellers/items/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch items: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(data);
        setItems(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching items:", err);
      }
    };
    if (id) {
      fetchItems();
    }
  }, [id])
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleQuantityChange = (itemId, quantity) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      [itemId]: quantity
    }));
  };

  const handleOrderSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const itemarr = Array.from(formData.entries())
                              .filter(([key]) => !key.startsWith("price_"))
                              .map(([itemId, quantity]) => {
                                const price = formData.get(`price_${itemId}`);
                                return {
                                  itemId,
                                  quantity: parseInt(quantity, 10),
                                  price: parseFloat(price),
                                };
                            });
    const order = {
      seller_id: id,
      items: itemarr
    }; 
    console.log(order);
    // TODO: submit order with API call
    axios.post('/orders/submit', order)
      .then(response => {
        alert("Order submitted successfully!");
      })
      .catch(error => {
        console.error("Error submitting order:", error);
      });
    toggleModal();
  }

return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md">
      {items.length === 0 ? (
        <p>No items available for this seller.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li>
              {item.name}
            </li>
          ))}
        </ul>
      )}
      <img src={image || "/assets/default-cook.jpg"} alt={name} className="w-full h-40 object-cover rounded-lg mb-4"/>
      <h2 className="text-xl font-bold">Name is {name}</h2>
      <p className="text-gray-600">{specialty}</p>
      <p className="text-green-700 font-bold">Rating: {rating}</p>
      <button
        onClick={() => (window.location.href = `/profile/${id}`)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Profile
      </button>
      <button
        onClick={toggleModal}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
      >
        Place Order
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Place Your Order</h2>
            <form onSubmit={handleOrderSubmit}>
              {/* Dynamically generated list of items */}
              <div className="mb-4">
                <label className="block mb-2 font-bold">Select Items:</label>
                <div>
                  {/* Replace this array with the seller's items fetched dynamically */}
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center mb-2">
                        <span className="mr-2">{item.name}</span>
                        <input
                          type="number"
                          name={item.id}
                          min="0"
                          placeholder="Qty"
                          className="border rounded p-1 w-16 text-center"
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        />
                        <input
                          type="hidden"
                          name={`price_${item.id}`}
                          value={item.price}
                        />
                      <span className="mr-2">Price: ${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerCard;

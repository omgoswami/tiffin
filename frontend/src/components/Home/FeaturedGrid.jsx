import React from "react";
import { Link } from "react-router-dom";

const FeaturedGrid = ({ items, onArchive }) => {
  const currentTime = new Date();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {items.map((item, index) => {
        const endTime = new Date(`1970-01-01T${item.endTime}:00`);
        const isExpired = currentTime > endTime;

        return (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link to={`/food/${index}`}>
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                {!isExpired && (
                  <p className="text-sm text-green-500">
                    Available until: {item.endTime}
                  </p>
                )}
                {isExpired && (
                  <p className="text-sm text-red-500">Expired</p>
                )}
              </div>
            </Link>
            {!isExpired && (
              <button
                onClick={() => onArchive(index)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Archive
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedGrid;

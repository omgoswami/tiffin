import React, { useState, useEffect } from "react";
import ExploreFilters from "../../components/Explore/ExploreFilters";
import SellerCard from "../../components/Explore/SellerCard";

const ExplorePage = () => {
  const [cooks, setCooks] = useState([]);
  const [filteredCooks, setFilteredCooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ specialty: "", rating: "" });

  useEffect(() => {
    const fetchCooks = async () => {
      try {
        const response = await fetch("/sellers/getall");
        if (!response.ok) {
          throw new Error("Failed to fetch cooks");
        }
        const data = await response.json();
        setCooks(data);
        setFilteredCooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCooks();
  }, []);

  const applyFilters = () => {
    const filtered = cooks.filter((cook) => {
      const matchesSpecialty = filters.specialty
        ? cook.specialty.toLowerCase().includes(filters.specialty.toLowerCase())
        : true;
      const matchesRating = filters.rating
        ? cook.rating >= parseFloat(filters.rating)
        : true;

      return matchesSpecialty && matchesRating;
    });
    setFilteredCooks(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Cooks</h1>

      {/* Filters Section */}
      <ExploreFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Cooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredCooks.length === 0 ? (
          <p>No cooks match your criteria.</p>
        ) : (
          filteredCooks.map((cook) => (
            <SellerCard
              key={cook.id}
              id={cook.id}
              name={cook.name}
              specialty={cook.specialty}
              rating={cook.rating}
              image={cook.image}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExplorePage;

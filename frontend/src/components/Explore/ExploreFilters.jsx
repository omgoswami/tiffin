import React from "react";

const ExploreFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Specialty Filter */}
      <input
        type="text"
        placeholder="Search by Specialty"
        value={filters.specialty}
        onChange={(e) => onFilterChange("specialty", e.target.value)}
        className="border rounded px-4 py-2"
      />

      {/* Rating Filter */}
      <select
        value={filters.rating}
        onChange={(e) => onFilterChange("rating", e.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="">Filter by Rating</option>
        <option value="4.5">4.5 and above</option>
        <option value="4.0">4.0 and above</option>
        <option value="3.5">3.5 and above</option>
      </select>
    </div>
  );
};

export default ExploreFilters;

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the starting point of your app.</p>
      <Link to="/dashboard">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          style={{ marginTop: '20px' }}
        >
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default HomePage;

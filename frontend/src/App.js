import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home/HomePage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ExplorePage from "./pages/Explore/ExplorePage";
import LoginPage from "./pages/Auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import FoodDetails from "./pages/Food/FoodDetails";
import ProfilePage from "./pages/Profile/ProfilePage";
import PostListingPage from "./pages/Listings/PostListingPage";
import MessagesPage from "./pages/Messages/MessagesPage";
import MessageThreadPage from "./pages/Messages/MessageThreadPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import SafeMeetingSpotPage from "./pages/SafeMeetingSpotPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-listing" element={<PostListingPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:id" element={<MessageThreadPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/safe-meeting-spots" element={<SafeMeetingSpotPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

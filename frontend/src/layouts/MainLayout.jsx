import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-grow">
        <Navbar />
        <main className="p-4 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

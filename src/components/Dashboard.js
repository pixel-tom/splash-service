// components/Dashboard.js

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useMediaQuery } from "react-responsive";

const Dashboard = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <div className="flex">
      {isMobile ? (
        <>
          <button
            onClick={toggleDrawer}
            className="fixed top-6 left-4 z-50 bg-gray-200 p-2 rounded-md"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* Sidebar Drawer */}
          <div
            className={`fixed inset-y-0 left-0 transform ${
              drawerVisible ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out bg-gray-100 w-64 z-40`}
          >
            <Sidebar />
          </div>
          {/* Overlay */}
          {drawerVisible && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-30"
              onClick={toggleDrawer}
            ></div>
          )}
        </>
      ) : (
        <Sidebar />
      )}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4 flex-1 bg-[#fefeff] border border-l-[#e5e5e5]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

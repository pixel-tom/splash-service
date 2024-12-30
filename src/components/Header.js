/* eslint-disable @next/next/no-img-element */
import React from "react";

const CustomHeader = ({ toggleDrawer }) => {
  return (
    <header className="bg-[#fefeff] border-b border-[#e5e5e5] relative z-50">
      <div className="px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/splash-logo.png"
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Search bar - desktop only */}
        <div className="flex-1 hidden md:flex ml-64">
          <div className="relative w-full max-w-[500px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 pl-10 bg-[#f5f5f5] text-[#084b73] border border-[#0fa7de] rounded-full"
            />
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleDrawer}
          className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
        >
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
      </div>
    </header>
  );
};

export default CustomHeader;

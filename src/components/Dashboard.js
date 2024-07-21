import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Dashboard = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col mt-3">
        <Header />
        <div className="p-4 flex-1 bg-[#fefeff] border border-l-[#e5e5e5]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

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
    <div className="flex flex-col min-h-screen bg-[#fefeff]">
      <Header toggleDrawer={toggleDrawer} />
      
      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 border-r border-[#e5e5e5]">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        {isMobile && drawerVisible && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-30 transition-opacity"
              onClick={toggleDrawer}
            />
            <aside className="fixed inset-y-0 left-0 w-64 z-40 bg-[#fefeff] border-r border-[#e5e5e5]">
              <Sidebar />
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

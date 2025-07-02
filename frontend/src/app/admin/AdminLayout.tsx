import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideNav from "./AdminSideNav";

const SIDEBAR_WIDTH = 256; // 64 * 4 (tailwind w-64)

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarToggle = () => setSidebarOpen((open) => !open);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div>
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <AdminSideNav />
        </div>
        {/* Mobile sidebar (drawer) */}
        {isMobile && (
          <div
            className={`fixed top-0 left-0 z-40 h-full transition-transform duration-300 bg-white shadow-lg ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } w-64`}
            style={{ width: SIDEBAR_WIDTH }}
          >
            <AdminSideNav />
          </div>
        )}
      </div>
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={handleSidebarToggle}
        />
      )}
      {/* Main Content */}
      <div
        className={`
          flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
          ${isMobile ? "" : "md:ml-64"}
        `}
      >
        {/* Topbar for mobile */}
        {isMobile && (
          <div className="bg-white shadow flex items-center px-4 py-3 sticky top-0 z-20">
            <button
              className="text-yellow-600 text-2xl mr-3"
              onClick={handleSidebarToggle}
              aria-label="Open sidebar"
            >
              <span className="material-icons">menu</span>
            </button>
            <span className="font-bold text-yellow-700 text-lg">Admin Panel</span>
          </div>
        )}
        <main className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            <div className="bg-white rounded-lg shadow-sm border min-h-[calc(100vh-8rem)] p-2 sm:p-4 md:p-6">
              <Outlet />
            </div>
          </div>
        </main>
        <footer className="bg-white border-t px-4 py-3 md:px-6 md:py-4 mt-auto">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} Admin Panel. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
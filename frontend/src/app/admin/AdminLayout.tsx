import React from "react";
import AdminSideNav from "./AdminSideNav";
import { Outlet } from "react-router-dom";

const SIDEBAR_WIDTH = 256; // 64 * 4 (w-64 in px)

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full w-64 bg-white border-r z-20 hidden md:block"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <AdminSideNav />
      </aside>
      {/* Main Content */}
      <main
        className="flex-1 p-4"
        style={{ marginLeft: SIDEBAR_WIDTH }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Panel</h1>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
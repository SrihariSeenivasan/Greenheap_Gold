import React from "react";
import AdminSideNav from "./AdminSideNav";
import { Outlet } from "react-router-dom";

interface UserLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<UserLayoutProps> = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r hidden md:block">
        <AdminSideNav />
      </aside>
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          {/* This is where the admin content will be rendered */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Panel</h1>
          {/* Outlet for nested routes */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
export default AdminLayout;
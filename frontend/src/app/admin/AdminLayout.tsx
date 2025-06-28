import React from "react";
import AdminSideNav from "./AdminSideNav";

export default function AdminLayout( ) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r hidden md:block">
        <AdminSideNav />
      </aside>
      <main className="flex-1 p-4"></main>
    </div>
  );
}

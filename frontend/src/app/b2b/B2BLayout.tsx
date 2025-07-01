import { Outlet } from "react-router-dom";
import B2BSideNav from "./B2BSideNav";
import { B2B_PRIMARY } from "./theme";

export default function B2BLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <B2BSideNav />
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="md:hidden bg-white shadow px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-lg" style={{ color: B2B_PRIMARY }}>B2B Panel</span>
          {/* Add mobile nav toggle if needed */}
        </header>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

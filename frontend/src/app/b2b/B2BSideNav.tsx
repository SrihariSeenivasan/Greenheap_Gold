import {
  FaBell,
  FaBuilding,
  FaBullhorn,
  FaHeadset,
  FaListAlt,
  FaRupeeSign,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
  FaWallet
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { to: "bdashboard", label: "Dashboard", icon: <FaTachometerAlt className="w-5 h-5 mr-2" /> },
  { to: "bgoldpurchase", label: "Gold Purchase", icon: <FaShoppingCart className="w-5 h-5 mr-2" /> },
  { to: "bsellornament", label: "Sell Ornaments", icon: <FaShoppingCart className="w-5 h-5 mr-2" /> },
  { to: "bsipmanagement", label: "SIP Management", icon: <FaUsers className="w-5 h-5 mr-2" /> },
  { to: "bborder-history", label: "Order History", icon: <FaListAlt className="w-5 h-5 mr-2" /> },
  { to: "bcommission", label: "Commission", icon: <FaRupeeSign className="w-5 h-5 mr-2" /> },
  { to: "bwallet", label: "Wallet", icon: <FaWallet className="w-5 h-5 mr-2" /> },
  { to: "bmarketing-resources", label: "Marketing Resources", icon: <FaBullhorn className="w-5 h-5 mr-2" /> },
  { to: "bsupport", label: "Support", icon: <FaHeadset className="w-5 h-5 mr-2" /> },
  { to: "bprofile", label: "Business Profile", icon: <FaBuilding className="w-5 h-5 mr-2" /> },
  { to: "bnotifications", label: "Notifications", icon: <FaBell className="w-5 h-5 mr-2" /> },
];

const logoutItem = { to: "/", label: "Logout", icon: <FaSignOutAlt className="w-5 h-5 mr-2" /> };

const B2BSideNav = () => {
  const location = useLocation();
  const current = location.pathname;

  return (
    <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col h-screen fixed top-0 left-0 z-30">
      <div className="h-16 flex items-center justify-center font-bold text-xl text-[#7a1335]">
        B2B Panel
      </div>
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = current === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center px-4 py-2 rounded transition font-medium ${
                isActive
                  ? "bg-[#7a1335] text-white font-bold shadow scale-105"
                  : "hover:bg-[#7a1335]/10 text-[#7a1335]"
              }`}
              style={isActive ? { fontWeight: 700 } : {}}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4 mt-auto">
        <Link
          to={logoutItem.to}
          className="flex items-center px-4 py-2 rounded transition font-medium text-[#7a1335] hover:bg-[#7a1335]/10 hover:text-white"
        >
          {logoutItem.icon}
          {logoutItem.label}
        </Link>
      </div>
      <div className="mb-4 text-[10px] text-[#7a1335] text-center opacity-60">
        &copy; {new Date().getFullYear()} B2B Panel
      </div>
    </aside>
  );
};

export default B2BSideNav;

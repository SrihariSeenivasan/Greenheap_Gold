import { FaBell, FaIdCard, FaLeaf, FaPiggyBank, FaSignOutAlt, FaTachometerAlt, FaUniversity, FaUser, FaUsers, FaWallet } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { to: "/user", label: "My Dashboard", icon: <FaTachometerAlt className="w-5 h-5 mr-2" /> },
  { to: "/userprofile", label: "My Profile", icon: <FaUser className="w-5 h-5 mr-2" /> },
  { to: "/userkyc", label: "KYC", icon: <FaIdCard className="w-5 h-5 mr-2" /> },
  { to: "/userbeneficiaries", label: "Beneficiaries", icon: <FaUsers className="w-5 h-5 mr-2" /> },
  { to: "/usersavingplan", label: "Chit Jewels Saving Plan", icon: <FaPiggyBank className="w-5 h-5 mr-2" /> },
  { to: "/userspiplan", label: "Digital Gold SIP Plan", icon: <FaWallet className="w-5 h-5 mr-2" /> },
  { to: "/userplantscheme", label: "Gold Plant Scheme", icon: <FaLeaf className="w-5 h-5 mr-2" /> },
  { to: "/usernotification", label: "Notification", icon: <FaBell className="w-5 h-5 mr-2" /> },
  { to: "/usermybankaccounts", label: "My Bank Accounts", icon: <FaUniversity className="w-5 h-5 mr-2" /> },
];

const logoutItem = { to: "/", label: "Logout", icon: <FaSignOutAlt className="w-5 h-5 mr-2" /> };

export default function LogUserSideNav() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col h-screen fixed top-0 left-0 z-30 pt-32">
      <div className="h-16 flex items-center justify-center font-bold text-xl text-[#7a1335]">
        User Dashboard
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
        &copy; {new Date().getFullYear()} Admin Panel
      </div>
    </aside>
  );
}
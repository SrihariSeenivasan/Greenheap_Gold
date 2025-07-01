import { useState } from "react";
import {
  FaBell,
  FaBoxes,
  FaIdCard,
  FaLeaf,
  FaMoneyCheckAlt,
  FaPercent,
  FaPiggyBank,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUniversity,
  FaUser,
  FaWallet
} from "react-icons/fa";

const menuItems = [
  { name: "My Dashboard", link: "/admin", icon: <FaTachometerAlt /> },
  { name: "My Profile", link: "/adminprofile", icon: <FaUser /> },
  { name: "Manage Ornaments", link: "/manageornaments", icon: <FaBoxes /> },
  { name: "Commission", link: "/commission", icon: <FaPercent /> },
  { name: "Payout Request", link: "/payoutrequest", icon: <FaMoneyCheckAlt /> },
  { name: "KYC", link: "/kyc", icon: <FaIdCard /> },
  // { name: "Beneficiaries", link: "/beneficiaries", icon: <FaUsers /> },
  { name: "Chit Jewels Saving Plan", link: "/savingplan", icon: <FaPiggyBank /> },
  { name: "Digital Gold SPI Plan", link: "/spiplan", icon: <FaWallet /> },
  { name: "Gold Plant Scheme", link: "/plantscheme", icon: <FaLeaf /> },
  { name: "Notification", link: "/notification", icon: <FaBell /> },
  { name: "My Bank Accounts", link: "/mybankaccounts", icon: <FaUniversity /> },
];

const logoutItem = { name: "Logout", link: "/", icon: <FaSignOutAlt /> };

const AdminSideNav = ({ isOpen, onToggle }: { isOpen?: boolean; onToggle?: () => void }) => {
  const [active, setActive] = useState<string>(window.location.pathname);

  const handleClick = (link: string) => {
    setActive(link);
    if (onToggle) onToggle();
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 h-screen z-40 bg-white shadow-lg
        w-16 sm:w-56
        flex flex-col
        overflow-y-auto
        transition-transform transition-opacity duration-500 ease-in-out
        ${isOpen === false ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}
        sm:translate-x-0 sm:opacity-100
      `}
      style={{ minWidth: "4rem" }}
    >
      <div className="flex items-center gap-2 px-4 py-6 mb-4">
        <FaTachometerAlt className="text-[#7a1335] text-2xl" />
        <span className="text-lg font-bold text-[#7a1335] tracking-wide hidden sm:inline">Admin Panel</span>
      </div>
      <ul className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.link}
              onClick={() => handleClick(item.link)}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                ${active === item.link
                  ? "bg-[#7a1335] text-white font-bold shadow scale-105"
                  : "text-[#7a1335] hover:bg-[#fbeaf0] hover:text-[#7a1335]"
                }
                group text-xs sm:text-sm
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="truncate hidden sm:inline">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
      {/* Logout at the bottom, red color */}
      <div className="mb-4 mt-2">
        <a
          href={logoutItem.link}
          onClick={() => handleClick(logoutItem.link)}
          className={`
            flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
            justify-center sm:justify-start
            ${active === logoutItem.link
              ? "bg-red-600 text-white font-bold shadow scale-105"
              : "text-red-600 hover:bg-red-100 hover:text-red-700"
            }
            group text-xs sm:text-sm font-semibold
          `}
        >
          <span className="text-lg">{logoutItem.icon}</span>
          <span className="truncate hidden sm:inline">{logoutItem.name}</span>
        </a>
      </div>
      <div className="mb-4 text-[10px] text-[#7a1335] text-center opacity-60 hidden sm:block">
        &copy; {new Date().getFullYear()} Admin Panel
      </div>
    </nav>
  );
};

export default AdminSideNav;
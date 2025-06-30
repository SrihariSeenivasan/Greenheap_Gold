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
  FaUsers,
  FaWallet,
} from "react-icons/fa";

const menuItems = [
  { name: "My Dashboard", link: "/admin", icon: <FaTachometerAlt /> },
  { name: "My Profile", link: "/adminprofile", icon: <FaUser /> },
  { name: "Manage Ornaments", link: "/manageornaments", icon: <FaBoxes /> },
  { name: "Commission", link: "/commission", icon: <FaPercent /> },
  { name: "Payout Request", link: "/payoutrequest", icon: <FaMoneyCheckAlt /> },
  { name: "KYC", link: "/kyc", icon: <FaIdCard /> },
  { name: "Beneficiaries", link: "/beneficiaries", icon: <FaUsers /> },
  { name: "Chit Jewels Saving Plan", link: "/savingplan", icon: <FaPiggyBank /> },
  { name: "Digital Gold SPI Plan", link: "/spiplan", icon: <FaWallet /> },
  { name: "Gold Plant Scheme", link: "/plantscheme", icon: <FaLeaf /> },
  { name: "Notification", link: "/notification", icon: <FaBell /> },
  { name: "My Bank Accounts", link: "/mybankaccounts", icon: <FaUniversity /> },
  { name: "Logout", link: "/", icon: <FaSignOutAlt /> },
];

export default function AdminSideNav() {
  const [active, setActive] = useState<string>(window.location.pathname);

  const handleClick = (link: string) => {
    setActive(link);
  };

  return (
    <nav className="py-8 px-4 h-screen overflow-y-auto bg-white">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.link}
              onClick={() => handleClick(item.link)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:text-yellow-500 hover:bg-yellow-50 hover:translate-x-1
                ${active === item.link ? "bg-yellow-100 text-yellow-700 font-semibold translate-x-1 shadow" : "text-gray-700"}
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
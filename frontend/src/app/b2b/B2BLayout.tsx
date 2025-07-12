import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Notifications from "./notifications/Notifications";

const menuItems = [
  { label: "Dashboard", icon: "📊", path: "/bdashboard" },
  { label: "Profile", icon: "👤", path: "/bprofile" },
  { label: "Gold Purchase", icon: "🪙", path: "/bgoldpurchase" },
  { label: "Sell Ornament", icon: "💎", path: "/bsellornament" },
  { label: "SIP Management", icon: "📈", path: "/bsipmanagement" },
  { label: "Order History", icon: "📜", path: "/bborder-history" },
  // { label: "Commission", icon: "%", path: "/bcommission" },
  { label: "Wallet", icon: "👛", path: "/bwallet" },
  { label: "Marketing Resources", icon: "📢", path: "/bmarketing-resources" },
  { label: "Support", icon: "🛠️", path: "/bsupport" }, 
  { label: "Logout", icon: "🚪", path: "/" },
];

const SIDEBAR_BG = "#7a1335";
const SIDEBAR_ITEM_ACTIVE = "rgba(255,255,255,0.18)";
const SIDEBAR_ITEM_HOVER = "rgba(255,255,255,0.10)";

const B2BLayout: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [showNotificationPage, setShowNotificationPage] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const notificationRef = useRef<HTMLDivElement | null>(null);
  const notificationBtnRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        notificationBtnRef.current &&
        !notificationBtnRef.current.contains(event.target as Node)
      ) {
        setNotificationVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarVisible(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = (index: number, path: string) => {
    setActiveItem(index);
    setSidebarVisible(false);
    navigate(path);
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      {/* Overlay for mobile */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.5)",
          display: sidebarVisible ? "block" : "none",
        }}
        onClick={() => setSidebarVisible(false)}
      ></div>
      {/* Sidebar */}
      <nav
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100%",
          zIndex: 50,
          width: '16rem',
          background: SIDEBAR_BG,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "transform 0.4s cubic-bezier(.4,2,.6,1), box-shadow 0.2s",
          transform:
            sidebarVisible || window.innerWidth >= 768
              ? "translateX(0)"
              : "translateX(-100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          overflow: "hidden",
        }}
        className={`fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out z-50
          md:static md:transform-none md:translate-x-0 md:shadow-none md:border-r md:border-gray-200
          ${sidebarVisible ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div style={{
          padding: "1.2rem 1rem 0.8rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.04)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: 1, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              display: "inline-block",
              width: 22,
              height: 22,
              background: "rgba(255,255,255,0.13)",
              borderRadius: 8,
              marginRight: 6,
              textAlign: "center",
              lineHeight: "22px",
              fontSize: 14,
              fontWeight: 900,
              color: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              transition: "background 0.2s"
            }}>B</span>
            B2B
          </span>
          <button
            onClick={() => setSidebarVisible(false)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: "50%",
              width: 24,
              height: 24,
              color: "#fff",
              fontSize: 14,
              display: "block",
              cursor: "pointer",
              transition: "background 0.18s"
            }}
            className="md:hidden"
          >
            ✕
          </button>
        </div>
        {/* Sidebar Menu */}
        <ul style={{ flex: 1, overflowY: "auto", padding: "0.8rem 0" }}>
          {menuItems.map(({ label, icon, path }, idx) => {
            const isActive = window.location.pathname === path;
            return (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => {
                    setSidebarVisible(false);
                    navigate(path);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "90%",
                    margin: "0 auto",
                    padding: "0.5rem 1rem",
                    background: isActive ? SIDEBAR_ITEM_ACTIVE : "none",
                    border: "none",
                    color: "#fff",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 13,
                    borderRadius: 8,
                    marginBottom: 3,
                    marginTop: 3,
                    cursor: "pointer",
                    boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                    transition: "background 0.18s, box-shadow 0.18s, transform 0.18s",
                    transform: isActive ? "scale(1.03)" : "scale(1)",
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = SIDEBAR_ITEM_HOVER)}
                  onMouseOut={e => (e.currentTarget.style.background = isActive ? SIDEBAR_ITEM_ACTIVE : "none")}
                >
                  <span style={{
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    background: isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
                    borderRadius: 6,
                    transition: "background 0.18s"
                  }}>{icon}</span>
                  <span style={{
                    letterSpacing: 0.1,
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 13,
                    transition: "font-weight 0.18s"
                  }}>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div style={{ padding: "1rem", fontSize: 10, color: "#fff", opacity: 0.5, textAlign: "center" }}>
          &copy; {new Date().getFullYear()} B2B Panel
        </div>
      </nav>
      {/* Main Section */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-72">
        {/* Header */}
         <header className="fixed top-0 w-full md:w-[calc(100%-16rem)] md:left-64 z-30 bg-gradient-to-r from-[#8B1538] to-[#A91B47] text-white shadow-md h-16 flex justify-between items-center px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button
              className="text-white text-xl md:hidden hover:bg-white/10 p-2 rounded-lg transition-all duration-200 transform hover:scale-110"
              onClick={() => setSidebarVisible(!sidebarVisible)}
            >
              <span className="inline-block transform transition-transform duration-300 hover:rotate-90">☰</span>
            </button>
            <h1 className="text-xl font-semibold tracking-wide">B2B Panel</h1>
          </div>
          <div className="relative">
            <button
              ref={notificationBtnRef}
              onClick={() => setShowNotificationPage(true)}
              className="relative bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-200 transform hover:scale-110 backdrop-blur-sm"
            >
              <span className="text-lg">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                5
              </span>
            </button>
            {/* Notification Dropdown */}
            <div
              ref={notificationRef}
              className={`absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] max-h-[500px] overflow-hidden rounded-lg bg-white shadow-2xl transform transition-all origin-top z-50 ${
                notificationVisible ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'
              }`}
            >
              <div className="bg-[#7a1335] text-white p-4 flex justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <button 
                  onClick={() => setNotificationVisible(false)}
                  className="hover:bg-white/10 p-1 rounded transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="flex gap-2 p-4 border-b text-sm text-gray-600 flex-wrap">
                <button className="border px-3 py-1 rounded border-gray-300 bg-white text-gray-600 hover:bg-gray-50">All</button>
                <button className="border px-3 py-1 rounded border-gray-300 bg-white text-gray-600 hover:bg-gray-50">Partners</button>
                <button className="border px-3 py-1 rounded border-gray-300 bg-white text-gray-600 hover:bg-gray-50">Users</button>
                <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">Sort: Date Recent</span>
              </div>
              <div className="p-4 border-b">
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-[#7a1335]"
                  placeholder="Type notification message..."
                />
                <div className="flex justify-between items-center text-sm gap-2">
                  <select className="border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#7a1335]">
                    <option>All</option>
                    <option>Partners</option>
                    <option>Users</option>
                  </select>
                  <button className="bg-[#7a1335] text-white px-4 py-1 rounded hover:bg-[#6a1130] transition-colors">
                    Send
                  </button>
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {[
                  ['Gold price updated.', 'success', '2024-06-01'],
                  ['Commission payout processed.', 'info', '2024-05-30'],
                  ['Welcome to GreenHeap!', 'info', '2024-05-29'],
                  ['Partner payout released.', 'warning', '2024-05-28'],
                  ['Your KYC is approved.', 'info', '2024-05-27'],
                  ['System maintenance scheduled.', 'success', '2024-05-26'],
                  ['New offer for partners.', 'warning', '2024-05-25'],
                  ['Gold price dropped.', 'success', '2024-05-24']
                ].map(([message, type, date], idx) => (
                  <div key={idx} className="flex gap-3 items-start p-4 border-b text-sm hover:bg-gray-50 transition-colors">
                    <div
                      className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                        type === 'success'
                          ? 'bg-green-500'
                          : type === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div>{message}</div>
                      <button className="text-[#7a1335] text-xs underline hover:no-underline">
                        Reply
                      </button>
                    </div>
                    <div className="text-xs text-gray-400 ml-auto whitespace-nowrap">{date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mt-16 flex-1 min-w-0 w-full">
          <div className="w-full h-full">
            {showNotificationPage ? (
              <div className="p-4 md:p-6">
                <button
                  className="mb-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                  onClick={() => setShowNotificationPage(false)}
                >
                  ← Back
                </button>
                <Notifications />
              </div>
            ) : (
              <div className="w-full h-full">
                <Outlet />
              </div>
            )}
          </div>
        </main>
      </div>

      <style >{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default B2BLayout;
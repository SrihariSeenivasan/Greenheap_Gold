import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Notification from './Notification/notification';

const menuItems = [
  { label: 'My Dashboard', icon: '📊', path: '/admin' },
  { label: 'My Profile', icon: '👤', path: '/adminprofile' },
  { label: 'Manage Ornaments', icon: '💎', path: '/manageornaments' },
  { label: "Manage User's", icon: '👥', path: '/manageusers' },
  { label: 'Commission', icon: '%', path: '/commission' },
  { label: 'Payout Request', icon: '💰', path: '/payoutrequest' },
  { label: 'KYC', icon: '📋', path: '/kyc' },
  { label: 'Chit Jewels Saving Plan', icon: '💍', path: '/savingplan' },
  { label: 'Digital Gold SIP Plan', icon: '🥇', path: '/spiplan' },
  { label: 'Gold Plant Scheme', icon: '🌱', path: '/plantscheme' },
  { label: 'My Bank Accounts', icon: '🏦', path: '/mybankaccounts' },
  { label: 'Logout', icon: '🚪', path: '/logout' }
];

const AdminPanel: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [showNotificationPage, setShowNotificationPage] = useState(false);



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

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarVisible(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${
          sidebarVisible ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarVisible(false)}
      ></div>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          md:static md:transform-none md:translate-x-0 md:shadow-none md:border-r md:border-gray-200
          ${sidebarVisible ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{
          // On desktop, sidebar is static and does not overlay content
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100%',
          zIndex: 50,
          width: '16rem',
        }}
      >
        {/* Sidebar Header - only visible on mobile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
          <button
            onClick={() => setSidebarVisible(false)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto h-full pb-4 md:pt-4">
          <ul className="p-4 space-y-1">
            {menuItems.map(({ label, icon, path }, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => {
                    setSidebarVisible(false);
                    navigate(path);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 w-full text-left transition-colors duration-200 group"
                >
                  <span className="w-5 text-center text-lg group-hover:scale-110 transition-transform">
                    {icon}
                  </span>
                  <span className="font-medium">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Header */}
        <header className="fixed top-0 w-full md:w-[calc(100%-16rem)] md:left-64 z-30 bg-gradient-to-r from-[#8B1538] to-[#A91B47] text-white shadow-md h-16 flex justify-between items-center px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button 
              className="text-white text-xl md:hidden hover:bg-white/10 p-2 rounded-lg transition-colors" 
              onClick={() => setSidebarVisible(!sidebarVisible)}
            >
              ☰
            </button>
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </div>
          <div className="relative">
            <button
               ref={notificationBtnRef}
              onClick={() => setShowNotificationPage(true)}
              className="relative bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >

              🔔
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                8
              </span>
            </button>
            {/* Notification Dropdown */}
            <div
              ref={notificationRef}
              className={`absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] max-h-[500px] overflow-hidden rounded-lg bg-white shadow-lg transform transition-all origin-top z-50 ${
                notificationVisible ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'
              }`}
            >
              <div className="bg-[#8B1538] text-white p-4 flex justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <button 
                  onClick={() => setNotificationVisible(false)}
                  className="hover:bg-white/10 p-1 rounded"
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
                  className="w-full border rounded px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-[#8B1538]"
                  placeholder="Type notification message..."
                />
                <div className="flex justify-between items-center text-sm gap-2">
                  <select className="border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-[#8B1538]">
                    <option>All</option>
                    <option>Partners</option>
                    <option>Users</option>
                  </select>
                  <button className="bg-[#8B1538] text-white px-4 py-1 rounded hover:bg-[#7A1230] transition-colors">
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
                      <button className="text-[#8B1538] text-xs underline hover:no-underline">
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
        <main className="mt-16 p-2 sm:p-4 md:p-6 flex-1 min-w-0">
          <div className="w-full max-w-full mx-auto">
            {showNotificationPage ? (
              <div>
                <button
                  className="mb-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                  onClick={() => setShowNotificationPage(false)}
                >
                  ← Back
                </button>
                <Notification />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
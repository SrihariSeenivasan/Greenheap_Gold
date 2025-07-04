import React, { useState } from "react";

// Mock data for demonstration
const partnerUsers = [
  { id: 1, name: "S. Kumar", email: "skumar@example.com", status: "pending", joined: "2024-05-01" },
  { id: 2, name: "Priya Singh", email: "priya.singh@example.com", status: "approved", joined: "2024-04-15" },
  { id: 3, name: "Amit Patel", email: "amit.patel@example.com", status: "rejected", joined: "2024-03-20" },
  { id: 4, name: "Rajesh Sharma", email: "rajesh.sharma@example.com", status: "rejected", joined: "2024-03-20" },
  { id: 5, name: "Neha Gupta", email: "neha.gupta@example.com", status: "pending", joined: "2024-03-20" },
  { id: 6, name: "Vikram Singh", email: "vikram.singh@example.com", status: "approved", joined: "2024-03-20" },
];

const b2bUsers = [
  { id: 1, name: "GoldMart Pvt Ltd", email: "contact@goldmart.com", status: "pending", joined: "2024-05-03" },
  { id: 2, name: "SilverHub LLP", email: "info@silverhub.com", status: "approved", joined: "2024-04-10" },
  { id: 3, name: "DiamondTech Solutions", email: "hello@diamondtech.com", status: "rejected", joined: "2024-03-20" },
  { id: 4, name: "PlatinumCorp", email: "business@platinumcorp.com", status: "pending", joined: "2024-03-20" },
  { id: 5, name: "BronzeWorks Ltd", email: "info@bronzeworks.com", status: "approved", joined: "2024-03-20" },
  { id: 6, name: "CopperMines Inc", email: "contact@coppermines.com", status: "rejected", joined: "2024-03-20" },
];

const normalUsers = [
  { id: 1, name: "John Doe", email: "john.doe@gmail.com", joined: "2024-05-05" },
  { id: 2, name: "Priya Sharma", email: "priya.sharma@gmail.com", joined: "2024-04-22" },
  { id: 3, name: "Rahul Jain", email: "rahul.jain@gmail.com", joined: "2024-03-30" }, 
  { id: 4, name: "Sarah Wilson", email: "sarah.wilson@gmail.com", joined: "2024-03-20" },
  { id: 5, name: "Michael Chen", email: "michael.chen@gmail.com", joined: "2024-03-20" },
  { id: 6, name: "Lisa Anderson", email: "lisa.anderson@gmail.com", joined: "2024-03-20" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const statusOptions = [
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "pending", label: "Pending" },
];

const PAGE_SIZE = 3;

const ManageUsers: React.FC = () => {
  const [partnerList, setPartnerList] = useState(partnerUsers);
  const [b2bList, setB2bList] = useState(b2bUsers);
  const [partnerPage, setPartnerPage] = useState(1);
  const [b2bPage, setB2bPage] = useState(1);
  const [normalPage, setNormalPage] = useState(1);

  const handleStatusChange = (
    type: "partner" | "b2b",
    id: number,
    status: "approved" | "rejected"
  ) => {
    if (type === "partner") {
      setPartnerList((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status } : u))
      );
    } else {
      setB2bList((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status } : u))
      );
    }
  };

  // Pagination helpers
  const getPaged = (arr: any[], page: number) =>
    arr.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const partnerTotalPages = Math.ceil(partnerList.length / PAGE_SIZE);
  const b2bTotalPages = Math.ceil(b2bList.length / PAGE_SIZE);
  const normalTotalPages = Math.ceil(normalUsers.length / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white p-2 sm:p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#7a1335] mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
          Manage Users
        </h1>
        {/* Partner and B2B Users Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10">
          {/* Partner Users Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 border border-[#7a1335]/10">
            <h2 className="text-lg sm:text-xl font-bold text-[#7a1335] mb-3 sm:mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-[#7a1335] rounded-full"></span>
              Partner Users
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {getPaged(partnerList, partnerPage).map((user) => (
                <div key={user.id} className="rounded-lg sm:rounded-xl border border-[#7a1335]/10 p-3 sm:p-4 bg-[#fbeaf0]/40 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#7a1335] text-sm sm:text-base truncate">{user.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">{user.email}</div>
                      <div className="text-xs text-gray-400">Joined: {user.joined}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center lg:items-center">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status]} whitespace-nowrap`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                      <div>
                        <select
                          value={user.status}
                          onChange={e => handleStatusChange("partner", user.id, e.target.value as "approved" | "rejected")}
                          className="px-2 py-1 rounded-full border text-xs font-semibold bg-white text-gray-700"
                        >
                          <option value="pending" disabled>Set Status</option>
                          <option value="approved">Approve</option>
                          <option value="rejected">Reject</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {partnerList.length === 0 && (
                <div className="text-gray-400 text-center py-8 text-sm sm:text-base">No partner users found.</div>
              )}
            </div>
            {/* Pagination */}
            {partnerTotalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
                <button
                  className="px-2 sm:px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs sm:text-sm disabled:opacity-50"
                  disabled={partnerPage === 1}
                  onClick={() => setPartnerPage(partnerPage - 1)}
                >
                  Prev
                </button>
                <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                  Page {partnerPage} of {partnerTotalPages}
                </span>
                <button
                  className="px-2 sm:px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs sm:text-sm disabled:opacity-50"
                  disabled={partnerPage === partnerTotalPages}
                  onClick={() => setPartnerPage(partnerPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
          {/* B2B Users Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 border border-[#7a1335]/10">
            <h2 className="text-lg sm:text-xl font-bold text-[#7a1335] mb-3 sm:mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-[#7a1335] rounded-full"></span>
              B2B Users
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {getPaged(b2bList, b2bPage).map((user) => (
                <div key={user.id} className="rounded-lg sm:rounded-xl border border-[#7a1335]/10 p-3 sm:p-4 bg-[#fbeaf0]/40 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#7a1335] text-sm sm:text-base truncate">{user.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">{user.email}</div>
                      <div className="text-xs text-gray-400">Joined: {user.joined}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center lg:items-center">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status]} whitespace-nowrap`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                      <div>
                        <select
                          value={user.status}
                          onChange={e => handleStatusChange("b2b", user.id, e.target.value as "approved" | "rejected")}
                          className="px-2 py-1 rounded-full border text-xs font-semibold bg-white text-gray-700"
                        >
                          <option value="pending" disabled>Set Status</option>
                          <option value="approved">Approve</option>
                          <option value="rejected">Reject</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {b2bList.length === 0 && (
                <div className="text-gray-400 text-center py-8 text-sm sm:text-base">No B2B users found.</div>
              )}
            </div>
            {/* Pagination */}
            {b2bTotalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
                <button
                  className="px-2 sm:px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs sm:text-sm disabled:opacity-50"
                  disabled={b2bPage === 1}
                  onClick={() => setB2bPage(b2bPage - 1)}
                >
                  Prev
                </button>
                <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                  Page {b2bPage} of {b2bTotalPages}
                </span>
                <button
                  className="px-2 sm:px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs sm:text-sm disabled:opacity-50"
                  disabled={b2bPage === b2bTotalPages}
                  onClick={() => setB2bPage(b2bPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Normal Users Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 border border-[#7a1335]/10">
          <h2 className="text-lg sm:text-xl font-bold text-[#7a1335] mb-3 sm:mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-[#7a1335] rounded-full"></span>
            Normal Users
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {getPaged(normalUsers, normalPage).map((user) => (
              <div key={user.id} className="rounded-lg sm:rounded-xl border border-[#7a1335]/10 p-3 sm:p-4 bg-[#fbeaf0]/40 shadow-sm">
                <div className="font-semibold text-[#7a1335] text-sm sm:text-base truncate">{user.name}</div>
                <div className="text-xs sm:text-sm text-gray-500 truncate">{user.email}</div>
                <div className="text-xs text-gray-400">Joined: {user.joined}</div>
              </div>
            ))}
          </div>
          {normalUsers.length === 0 && (
            <div className="text-gray-400 text-center py-8 text-sm sm:text-base">No normal users found.</div>
          )}
          {/* Pagination */}
          {normalTotalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
              <button
                className="px-2 sm:px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs sm:text-sm disabled:opacity-50"
                disabled={normalPage === 1}
                onClick={() => setNormalPage(normalPage - 1)}
              >
                Prev
              </button>
              <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                Page {normalPage} of {normalTotalPages}
              </span>
              <button
                className="px-2 sm:px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs sm:text-sm disabled:opacity-50"
                disabled={normalPage === normalTotalPages}
                onClick={() => setNormalPage(normalPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
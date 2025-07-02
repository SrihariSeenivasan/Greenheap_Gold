import React, { useState } from "react";

// Mock data for demonstration
const partnerUsers = [
  { id: 1, name: "S. Kumar", email: "skumar@example.com", status: "pending", joined: "2024-05-01" },
  { id: 2, name: "Priya Singh", email: "priya.singh@example.com", status: "approved", joined: "2024-04-15" },
  { id: 3, name: "Amit Patel", email: "amit.patel@example.com", status: "rejected", joined: "2024-03-20" },
  { id: 4, name: "Amit Patel", email: "amit.patel@example.com", status: "rejected", joined: "2024-03-20" },
  { id: 5, name: "Amit Patel", email: "amit.patel@example.com", status: "rejected", joined: "2024-03-20" },
  { id: 6, name: "Amit Patel", email: "amit.patel@example.com", status: "rejected", joined: "2024-03-20" },
];

const b2bUsers = [
  { id: 1, name: "GoldMart Pvt Ltd", email: "contact@goldmart.com", status: "pending", joined: "2024-05-03" },
  { id: 2, name: "SilverHub LLP", email: "info@silverhub.com", status: "approved", joined: "2024-04-10" },
    { id: 3, name: "Amit Patel", email: "amit.patel@example.com", status: "rejected", joined: "2024-03-20" },
  { id: 4, name: "Amit Patel", email: "amit.patel@example.com", status: "rejected", joined: "2024-03-20" },
  { id: 5, name: "Amit Patel", email: "amit.patel@example.com", status: "rejected", joined: "2024-03-20" },
  { id: 6, name: "Amit Patel", email: "amit.patel@example.com", status: "rejected", joined: "2024-03-20" },
];

const normalUsers = [
  { id: 1, name: "John Doe", email: "john.doe@gmail.com", joined: "2024-05-05" },
  { id: 2, name: "Priya Sharma", email: "priya.sharma@gmail.com", joined: "2024-04-22" },
  { id: 3, name: "Rahul Jain", email: "rahul.jain@gmail.com", joined: "2024-03-30" }, 
  { id: 4, name: "Amit Patel", email: "amit.patel@example.com", status: "rejected", joined: "2024-03-20" },
  { id: 5, name: "Amit Patel", email: "amit.patel@example.com", status: "rejected", joined: "2024-03-20" },
  { id: 6, name: "Amit Patel", email: "amit.patel@example.com", status: "rejected", joined: "2024-03-20" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

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
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white p-4 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#7a1335] mb-8">Manage Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Partner Users Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#7a1335]/10">
          <h2 className="text-xl font-bold text-[#7a1335] mb-4 flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-[#7a1335] rounded-full"></span>
            Partner Users
          </h2>
          <div className="space-y-4">
            {getPaged(partnerList, partnerPage).map((user) => (
              <div key={user.id} className="rounded-xl border border-[#7a1335]/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fbeaf0]/40 shadow-sm">
                <div>
                  <div className="font-semibold text-[#7a1335]">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                  <div className="text-xs text-gray-400">Joined: {user.joined}</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status]}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                  {user.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition"
                        onClick={() => handleStatusChange("partner", user.id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="px-3 py-1 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
                        onClick={() => handleStatusChange("partner", user.id, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {user.status === "approved" && (
                    <button
                      className="px-3 py-1 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
                      onClick={() => handleStatusChange("partner", user.id, "rejected")}
                    >
                       Rejected
                    </button>
                  )}
                  {user.status === "rejected" && (
                    <button
                      className="px-3 py-1 rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition"
                      onClick={() => handleStatusChange("partner", user.id, "approved")}
                    >
                       Approved
                    </button>
                  )}
                </div>
              </div>
            ))}
            {partnerList.length === 0 && (
              <div className="text-gray-400 text-center py-8">No partner users found.</div>
            )}
          </div>
          {/* Pagination */}
          {partnerTotalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs"
                disabled={partnerPage === 1}
                onClick={() => setPartnerPage(partnerPage - 1)}
              >
                Prev
              </button>
              <span className="text-xs text-gray-700">
                Page {partnerPage} of {partnerTotalPages}
              </span>
              <button
                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs"
                disabled={partnerPage === partnerTotalPages}
                onClick={() => setPartnerPage(partnerPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
        {/* B2B Users Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#7a1335]/10">
          <h2 className="text-xl font-bold text-[#7a1335] mb-4 flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-[#7a1335] rounded-full"></span>
            B2B Users
          </h2>
          <div className="space-y-4">
            {getPaged(b2bList, b2bPage).map((user) => (
              <div key={user.id} className="rounded-xl border border-[#7a1335]/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fbeaf0]/40 shadow-sm">
                <div>
                  <div className="font-semibold text-[#7a1335]">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                  <div className="text-xs text-gray-400">Joined: {user.joined}</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status]}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                  {user.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition"
                        onClick={() => handleStatusChange("b2b", user.id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="px-3 py-1 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
                        onClick={() => handleStatusChange("b2b", user.id, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {user.status === "approved" && (
                    <button
                      className="px-3 py-1 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
                      onClick={() => handleStatusChange("b2b", user.id, "rejected")}
                    >
                     Rejected
                    </button>
                  )}
                  {user.status === "rejected" && (
                    <button
                      className="px-3 py-1 rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition"
                      onClick={() => handleStatusChange("b2b", user.id, "approved")}
                    >
                     Approved
                    </button>
                  )}
                </div>
              </div>
            ))}
            {b2bList.length === 0 && (
              <div className="text-gray-400 text-center py-8">No B2B users found.</div>
            )}
          </div>
          {/* Pagination */}
          {b2bTotalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs"
                disabled={b2bPage === 1}
                onClick={() => setB2bPage(b2bPage - 1)}
              >
                Prev
              </button>
              <span className="text-xs text-gray-700">
                Page {b2bPage} of {b2bTotalPages}
              </span>
              <button
                className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs"
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
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#7a1335]/10 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-[#7a1335] mb-4 flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-[#7a1335] rounded-full"></span>
          Normal Users
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {getPaged(normalUsers, normalPage).map((user) => (
            <div key={user.id} className="rounded-xl border border-[#7a1335]/10 p-4 bg-[#fbeaf0]/40 shadow-sm">
              <div className="font-semibold text-[#7a1335]">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
              <div className="text-xs text-gray-400">Joined: {user.joined}</div>
            </div>
          ))}
        </div>
        {normalUsers.length === 0 && (
          <div className="text-gray-400 text-center py-8">No normal users found.</div>
        )}
        {/* Pagination */}
        {normalTotalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs"
              disabled={normalPage === 1}
              onClick={() => setNormalPage(normalPage - 1)}
            >
              Prev
            </button>
            <span className="text-xs text-gray-700">
              Page {normalPage} of {normalTotalPages}
            </span>
            <button
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs"
              disabled={normalPage === normalTotalPages}
              onClick={() => setNormalPage(normalPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;

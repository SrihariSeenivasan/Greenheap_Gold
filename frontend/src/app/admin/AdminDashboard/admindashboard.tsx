const stats = [
  { label: "Total Users", value: 1240, color: "bg-[#fbeaf0]", icon: "👥" },
  { label: "Gold Sold (g)", value: 3200, color: "bg-[#fbeaf0]", icon: "🥇" },
  { label: "Commission Earned", value: "₹1,20,000", color: "bg-[#fbeaf0]", icon: "💰" },
  { label: "Partners", value: 42, color: "bg-[#fbeaf0]", icon: "🤝" },
];

const activityData = [
  { time: "10:30 AM", desc: "User John Doe purchased 10g gold.", type: "user" },
  { time: "09:15 AM", desc: "Partner request approved for S. Kumar.", type: "partner" },
  { time: "Yesterday", desc: "Commission payout processed.", type: "partner" },
  { time: "Yesterday", desc: "User Priya Sharma updated profile.", type: "user" },
  { time: "2 days ago", desc: "Gold price updated.", type: "all" },
  { time: "2 days ago", desc: "Partner payout released.", type: "partner" },
  { time: "3 days ago", desc: "User feedback received.", type: "user" },
  { time: "3 days ago", desc: "New offer for partners.", type: "partner" },
  { time: "4 days ago", desc: "System maintenance scheduled.", type: "all" },
  { time: "4 days ago", desc: "User KYC approved.", type: "user" },
  { time: "5 days ago", desc: "Partner commission updated.", type: "partner" },
  { time: "5 days ago", desc: "User profile updated.", type: "user" },
  // ...add more if needed
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "From User", value: "user" },
  { label: "From Partner", value: "partner" },
  { label: "Time", value: "time" },
];

import { useState } from "react";

const AdminDashboard = () => {
  const [activityPage, setActivityPage] = useState(1);
  const [activityFilter, setActivityFilter] = useState("all");
  const pageSize = 5;

  // Filtering logic
  let filteredActivities = activityData;
  if (activityFilter === "user") {
    filteredActivities = activityData.filter(a => a.type === "user");
  } else if (activityFilter === "partner") {
    filteredActivities = activityData.filter(a => a.type === "partner");
  } else if (activityFilter === "time") {
    filteredActivities = [...activityData].sort((a, b) => a.time.localeCompare(b.time));
  }
  // "all" shows all, default order

  const totalPages = Math.ceil(filteredActivities.length / pageSize);
  const pagedActivities = filteredActivities.slice((activityPage - 1) * pageSize, activityPage * pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbeaf0] to-white p-2 sm:p-4 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#7a1335] mb-4 sm:mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-xl shadow p-4 sm:p-6 flex flex-col items-center ${stat.color} w-full`}
          >
            <div className="text-2xl sm:text-4xl mb-2">{stat.icon}</div>
            <div className="text-lg sm:text-2xl font-bold text-[#7a1335]">{stat.value}</div>
            <div className="text-[#7a1335] text-xs sm:text-base">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow p-3 sm:p-6 max-w-full sm:max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <h2 className="text-lg sm:text-xl font-semibold text-[#7a1335]">Recent Activities</h2>
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f.value}
                className={`px-2 sm:px-3 py-1 rounded text-xs font-semibold transition ${
                  activityFilter === f.value
                    ? "bg-[#7a1335] text-white"
                    : "bg-[#fbeaf0] text-[#7a1335] hover:bg-[#fbeaf0]"
                }`}
                onClick={() => {
                  setActivityFilter(f.value);
                  setActivityPage(1);
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <ul className="space-y-2 sm:space-y-3">
          {pagedActivities.map((activity, idx) => (
            <li key={idx} className="flex flex-col sm:flex-row items-start">
              <span className="text-[#7a1335] font-bold mr-0 sm:mr-3">{activity.time}</span>
              <span className="text-gray-700">{activity.desc}</span>
            </li>
          ))}
        </ul>
        {/* Pagination for activities */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-4 sm:mt-6">
          <button
            className="px-2 sm:px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs"
            disabled={activityPage === 1}
            onClick={() => setActivityPage(activityPage - 1)}
          >
            Prev
          </button>
          <span className="text-xs text-gray-700">
            Page {activityPage} of {totalPages}
          </span>
          <button
            className="px-2 sm:px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs"
            disabled={activityPage === totalPages}
            onClick={() => setActivityPage(activityPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
